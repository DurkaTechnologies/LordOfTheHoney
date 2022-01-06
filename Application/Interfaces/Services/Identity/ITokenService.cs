using LordOfTheHoney.Application.Interfaces.Common;
using LordOfTheHoney.Application.Requests.Identity;
using LordOfTheHoney.Application.Responses.Identity;
using LordOfTheHoney.Shared.Wrapper;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace LordOfTheHoney.Application.Interfaces.Services.Identity
{
    public interface ITokenService : IService
    {
        Task<Result<TokenResponse>> LoginAsync(TokenRequest model);

        Task<Result<TokenResponse>> GetRefreshTokenAsync(RefreshTokenRequest model);

        Task<string> GetUserNameAsync(string userId);

        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
