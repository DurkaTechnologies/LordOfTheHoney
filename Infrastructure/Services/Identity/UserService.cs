using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using AutoMapper;
using LordOfTheHoney.Application.Exceptions;
using LordOfTheHoney.Application.Interfaces.Services;
using LordOfTheHoney.Application.Interfaces.Services.Identity;
using LordOfTheHoney.Application.Requests.Identity;
using LordOfTheHoney.Application.Responses.Identity;
using LordOfTheHoney.Infrastructure.Models.Identity;
using LordOfTheHoney.Shared.Constants.Role;
using LordOfTheHoney.Shared.Wrapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace LordOfTheHoney.Infrastructure.Services.Identity
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public UserService(
            UserManager<ApplicationUser> userManager,
            IMapper mapper,
            RoleManager<ApplicationRole> roleManager,
            ICurrentUserService currentUserService)
        {
            _userManager = userManager;
            _mapper = mapper;
            _roleManager = roleManager;
            _currentUserService = currentUserService;
        }

        public async Task<Result<List<UserResponse>>> GetAllAsync()
        {
            var users = await _userManager.Users.ToListAsync();
            var result = _mapper.Map<List<UserResponse>>(users);
            return await Result<List<UserResponse>>.SuccessAsync(result);
        }

        public async Task<IResult> RegisterAsync(RegisterRequest request, string origin)
        {
            if (await _userManager.FindByNameAsync(request.UserName) != null)
                return await Result.FailAsync($"Username {request.UserName} is already taken.");

            var user = new ApplicationUser
            {
                Email = request.Email,
                UserName = request.UserName,
                IsActive = request.ActivateUser,
                EmailConfirmed = request.AutoConfirmEmail
            };

            if (await _userManager.FindByEmailAsync(request.Email) == null)
            {
                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, RoleConstants.BasicRole);
                    if (!request.AutoConfirmEmail)
                        return await Result<string>.SuccessAsync(user.Id, $"User {user.UserName} Registered. Please check your Mailbox to verify!");

                    return await Result<string>.SuccessAsync(user.Id, $"User {user.UserName} Registered.");
                }
                return await Result.FailAsync(result.Errors.Select(a => a.Description.ToString()).ToList());
            }
            return await Result.FailAsync($"Email {request.Email} is already registered.");
        }

        public async Task<IResult<UserResponse>> GetAsync(string userId)
        {
            var user = await _userManager.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            if (user != null)
                return await Result<UserResponse>.SuccessAsync(_mapper.Map<UserResponse>(user));

            throw new NotFoundException(nameof(ApplicationUser), userId);
        }

        public async Task<IResult> ToggleUserStatusAsync(ToggleUserStatusRequest request)
        {
            var user = await _userManager.Users.Where(u => u.Id == request.UserId).FirstOrDefaultAsync();
            var isAdmin = await _userManager.IsInRoleAsync(user, RoleConstants.AdministratorRole);

            if (isAdmin)
                return await Result.FailAsync("Administrators Profile's Status cannot be toggled");

            if (user != null)
            {
                user.IsActive = request.ActivateUser;
                var identityResult = await _userManager.UpdateAsync(user);
                return await Result.SuccessAsync();
            }

            throw new NotFoundException(nameof(ApplicationUser), request.UserId);
        }

        public async Task<IResult<UserRolesResponse>> GetRolesAsync(string userId)
        {
            var viewModel = new List<UserRoleModel>();
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                throw new NotFoundException(nameof(ApplicationUser), userId);

            var roles = await _roleManager.Roles.ToListAsync();

            foreach (var role in roles)
            {
                var userRolesViewModel = new UserRoleModel
                {
                    RoleName = role.Name,
                    RoleDescription = role.Description
                };

                userRolesViewModel.Selected = await _userManager.IsInRoleAsync(user, role.Name);

                viewModel.Add(userRolesViewModel);
            }
            var result = new UserRolesResponse { UserRoles = viewModel };
            return await Result<UserRolesResponse>.SuccessAsync(result);
        }

        public async Task<IResult> UpdateRolesAsync(UpdateUserRolesRequest request)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);
            if (user == null)
                throw new NotFoundException(nameof(ApplicationUser), request.UserId);

            if (user.Email == "amongusbee@amongusbee.com")
                throw new ForbiddenAccessException();

            var roles = await _userManager.GetRolesAsync(user);
            var selectedRoles = request.UserRoles.Where(x => x.Selected).ToList();
            var currentUser = await _userManager.FindByIdAsync(_currentUserService.UserId);

            if (!await _userManager.IsInRoleAsync(currentUser, RoleConstants.AdministratorRole))
            {
                var tryToAddAdministratorRole = selectedRoles.Any(x => x.RoleName == RoleConstants.AdministratorRole);
                var userHasAdministratorRole = roles.Any(x => x == RoleConstants.AdministratorRole);

                if (tryToAddAdministratorRole && !userHasAdministratorRole || !tryToAddAdministratorRole && userHasAdministratorRole)
                    return await Result.FailAsync("Not Allowed to add or delete Administrator Role if you have not this role.");
            }

            var result = await _userManager.RemoveFromRolesAsync(user, roles);
            result = await _userManager.AddToRolesAsync(user, selectedRoles.Select(y => y.RoleName));
            return await Result.SuccessAsync("Roles Updated");
        }

        public async Task<IResult> ForgotPasswordAsync(ForgotPasswordRequest request, string origin)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null /*|| !(await _userManager.IsEmailConfirmedAsync(user))*/)
                throw new NotFoundException(nameof(ApplicationUser), request.Email);

            var code = await _userManager.GeneratePasswordResetTokenAsync(user);
            return await Result.SuccessAsync("Password Reset Mail has been sent to your authorized Email.");
        }

        public async Task<IResult> ResetPasswordAsync(ResetPasswordRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
                throw new NotFoundException(nameof(ApplicationUser), request.Email);

            var result = await _userManager.ResetPasswordAsync(user, request.Token, request.Password);
            if (result.Succeeded)
            {
                return await Result.SuccessAsync("Password Reset Successful!");
            }
            else
            {
                return await Result.FailAsync("An Error has occured!");
            }
        }

        public async Task<int> GetCountAsync()
        {
            var count = await _userManager.Users.CountAsync();
            return count;
        }
    }
}
