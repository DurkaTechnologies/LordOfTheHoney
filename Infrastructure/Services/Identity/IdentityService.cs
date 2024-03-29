﻿using LordOfTheHoney.Application.Configurations;
using LordOfTheHoney.Application.Interfaces.Services.Identity;
using LordOfTheHoney.Infrastructure.Models.Identity;
using LordOfTheHoney.Application.Requests.Identity;
using LordOfTheHoney.Application.Responses.Identity;
using LordOfTheHoney.Shared.Wrapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using LordOfTheHoney.Application.Exceptions;
using LordOfTheHoney.Application.Enums;
using Microsoft.EntityFrameworkCore;

namespace LordOfTheHoney.Infrastructure.Services.Identity
{
    public class IdentityService : ITokenService
    {
        private const string InvalidErrorMessage = "Invalid email or password.";

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly AppConfiguration _appConfig;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public IdentityService(
            UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager,
            IOptions<AppConfiguration> appConfig, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _appConfig = appConfig.Value;
            _signInManager = signInManager;
        }

        public async Task<Result<TokenResponse>> LoginAsync(TokenRequest model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                throw new NotFoundException(nameof(ApplicationUser), model.Email);
            }
            if (!user.IsActive)
            {
                return await Result<TokenResponse>.FailAsync("User Not Active. Please contact the administrator.");
            }
            if (!user.EmailConfirmed)
            {
                return await Result<TokenResponse>.FailAsync("E-Mail not confirmed.");
            }
            var passwordValid = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!passwordValid)
            {
                return await Result<TokenResponse>.FailAsync("Invalid Credentials.");
            }

            user.RefreshToken = GenerateRefreshToken();
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
            await _userManager.UpdateAsync(user);

            var token = await GenerateJwtAsync(user);
            var response = new TokenResponse 
            { 
                Token = token, 
                RefreshToken = user.RefreshToken, 
                UserImageURL = user.ProfilePictureDataUrl 
            };

            return await Result<TokenResponse>.SuccessAsync(response);
        }

        public async Task<Result<TokenResponse>> GetRefreshTokenAsync(RefreshTokenRequest model)
        {
            if (model is null)
            {
                throw new NotFoundException("Invalid Client Token.");
            }

            ClaimsPrincipal userPrincipal;

            try
            {
                userPrincipal = GetPrincipalFromExpiredToken(model.Token);
            }
            catch (Exception)
            {
                throw new Exception("Invalid User Token.");
            }

            var userEmail = userPrincipal.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindByEmailAsync(userEmail);

            if (user == null)
                throw new NotFoundException(nameof(ApplicationUser), userEmail);
            if (user.RefreshToken != model.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                throw new NotFoundException("Invalid Client Token.");

            var token = GenerateEncryptedToken(GetSigningCredentials(), await GetClaimsAsync(user));
            user.RefreshToken = GenerateRefreshToken();
            await _userManager.UpdateAsync(user);

            var response = new TokenResponse 
            { 
                Token = token, 
                RefreshToken = user.RefreshToken, 
                RefreshTokenExpiryTime = user.RefreshTokenExpiryTime 
            };

            return await Result<TokenResponse>.SuccessAsync(response);
        }

        private async Task<string> GenerateJwtAsync(ApplicationUser user)
        {
            var token = GenerateEncryptedToken(GetSigningCredentials(), await GetClaimsAsync(user));
            return token;
        }

        private async Task<IEnumerable<Claim>> GetClaimsAsync(ApplicationUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();
            var permissionClaims = new List<Claim>();
            foreach (var role in roles)
            {
                roleClaims.Add(new Claim(JwtClaimNames.Role, role));
                var thisRole = await _roleManager.FindByNameAsync(role);
                var allPermissionsForThisRoles = await _roleManager.GetClaimsAsync(thisRole);
                permissionClaims.AddRange(allPermissionsForThisRoles);
            }

            var claims = new List<Claim>
            {
                new(JwtClaimNames.Id, user.Id),
                new(JwtClaimNames.Email, user.Email),
                new(JwtClaimNames.Nickname, user.UserName),
                new(JwtClaimNames.BeeCoins, user.BeeCoins.ToString())
            }
            .Union(userClaims)
            .Union(roleClaims)
            .Union(permissionClaims);

            return claims;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private string GenerateEncryptedToken(SigningCredentials signingCredentials, IEnumerable<Claim> claims)
        {
            var token = new JwtSecurityToken(
               claims: claims,
               expires: DateTime.UtcNow.AddDays(2),
               signingCredentials: signingCredentials);
            var tokenHandler = new JwtSecurityTokenHandler();
            var encryptedToken = tokenHandler.WriteToken(token);
            return encryptedToken;
        }

        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appConfig.Secret)),
                ValidateIssuer = false,
                ValidateAudience = false,
                RoleClaimType = ClaimTypes.Role,
                ClockSkew = TimeSpan.Zero
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }

        private SigningCredentials GetSigningCredentials()
        {
            var secret = Encoding.UTF8.GetBytes(_appConfig.Secret);
            return new SigningCredentials(new SymmetricSecurityKey(secret), SecurityAlgorithms.HmacSha256);
        }

        public async Task<string> GetUserNameAsync(string userId)
        {
            var user = await _userManager
                .Users
                .FirstAsync(u => u.Id == userId);

            return user.UserName;
        }
    }
}
