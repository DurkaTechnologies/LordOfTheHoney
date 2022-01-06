using System.Collections.Generic;
using System.Threading.Tasks;
using LordOfTheHoney.Application.Interfaces.Common;
using LordOfTheHoney.Application.Requests.Identity;
using LordOfTheHoney.Application.Responses.Identity;
using LordOfTheHoney.Shared.Wrapper;

namespace LordOfTheHoney.Application.Interfaces.Services.Identity
{
    public interface IRoleClaimService : IService
    {
        Task<Result<List<RoleClaimsResponse>>> GetAllAsync();

        Task<int> GetCountAsync();

        Task<Result<RoleClaimsResponse>> GetByIdAsync(int id);

        Task<Result<List<RoleClaimsResponse>>> GetAllByRoleIdAsync(string roleId);

        Task<Result<string>> SaveAsync(RoleClaimRequest request);

        Task<Result<string>> DeleteAsync(int id);
    }
}
