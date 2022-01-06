using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LordOfTheHoney.Application.Interfaces.Services;
using LordOfTheHoney.Application.Interfaces.Services.Identity;
using LordOfTheHoney.Application.Requests.Identity;
using LordOfTheHoney.Application.Responses.Identity;
using LordOfTheHoney.Infrastructure.Contexts;
using LordOfTheHoney.Infrastructure.Models.Identity;
using LordOfTheHoney.Shared.Wrapper;
using Microsoft.EntityFrameworkCore;

namespace LordOfTheHoney.Infrastructure.Services.Identity
{
    public class RoleClaimService : IRoleClaimService
    {
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;
        private readonly IdentityContext _db;

        public RoleClaimService(
            IMapper mapper,
            ICurrentUserService currentUserService,
            IdentityContext db)
        {
            _mapper = mapper;
            _currentUserService = currentUserService;
            _db = db;
        }

        public async Task<Result<List<RoleClaimsResponse>>> GetAllAsync()
        {
            var roleClaims = await _db.RoleClaims.ToListAsync();
            var roleClaimsResponse = _mapper.Map<List<RoleClaimsResponse>>(roleClaims);
            return await Result<List<RoleClaimsResponse>>.SuccessAsync(roleClaimsResponse);
        }

        public async Task<int> GetCountAsync()
        {
            var count = await _db.RoleClaims.CountAsync();
            return count;
        }

        public async Task<Result<RoleClaimsResponse>> GetByIdAsync(int id)
        {
            var roleClaim = await _db.RoleClaims
                .SingleOrDefaultAsync(x => x.Id == id);
            var RoleClaimsResponse = _mapper.Map<RoleClaimsResponse>(roleClaim);
            return await Result<RoleClaimsResponse>.SuccessAsync(RoleClaimsResponse);
        }

        public async Task<Result<List<RoleClaimsResponse>>> GetAllByRoleIdAsync(string roleId)
        {
            var roleClaims = await _db.RoleClaims
                .Include(x => x.Role)
                .Where(x => x.RoleId == roleId)
                .ToListAsync();
            var roleClaimsResponse = _mapper.Map<List<RoleClaimsResponse>>(roleClaims);
            return await Result<List<RoleClaimsResponse>>.SuccessAsync(roleClaimsResponse);
        }

        public async Task<Result<string>> SaveAsync(RoleClaimRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.RoleId))
            {
                return await Result<string>.FailAsync("Role is required.");
            }

            if (request.Id == 0)
            {
                var existingRoleClaim =
                    await _db.RoleClaims
                        .SingleOrDefaultAsync(x =>
                            x.RoleId == request.RoleId && x.ClaimType == request.Type && x.ClaimValue == request.Value);
                if (existingRoleClaim != null)
                {
                    return await Result<string>.FailAsync("Similar Role Claim already exists.");
                }
                var roleClaim = _mapper.Map<ApplicationRoleClaim>(request);
                await _db.RoleClaims.AddAsync(roleClaim);
                await _db.SaveChangesAsync(_currentUserService.UserId);
                return await Result<string>.SuccessAsync(string.Format("Role Claim {0} created.", request.Value));
            }
            else
            {
                var existingRoleClaim =
                    await _db.RoleClaims
                        .Include(x => x.Role)
                        .SingleOrDefaultAsync(x => x.Id == request.Id);
                if (existingRoleClaim == null)
                {
                    return await Result<string>.SuccessAsync("Role Claim does not exist.");
                }
                else
                {
                    existingRoleClaim.ClaimType = request.Type;
                    existingRoleClaim.ClaimValue = request.Value;
                    existingRoleClaim.Group = request.Group;
                    existingRoleClaim.Description = request.Description;
                    existingRoleClaim.RoleId = request.RoleId;
                    _db.RoleClaims.Update(existingRoleClaim);
                    await _db.SaveChangesAsync(_currentUserService.UserId);
                    return await Result<string>.SuccessAsync(string.Format("Role Claim {0} for Role {1} updated.", request.Value, existingRoleClaim.Role.Name));
                }
            }
        }

        public async Task<Result<string>> DeleteAsync(int id)
        {
            var existingRoleClaim = await _db.RoleClaims
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (existingRoleClaim != null)
            {
                _db.RoleClaims.Remove(existingRoleClaim);
                await _db.SaveChangesAsync(_currentUserService.UserId);
                return await Result<string>.SuccessAsync(string.Format("Role Claim {0} for {1} Role deleted.", existingRoleClaim.ClaimValue, existingRoleClaim.Role.Name));
            }
            else
            {
                return await Result<string>.FailAsync("Role Claim does not exist.");
            }
        }
    }
}
