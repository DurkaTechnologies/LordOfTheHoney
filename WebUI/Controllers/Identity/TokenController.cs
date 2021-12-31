using LordOfTheHoney.Application.Interfaces.Services;
using LordOfTheHoney.Application.Interfaces.Services.Identity;
using LordOfTheHoney.Application.Requests.Identity;
using LordOfTheHoney.Shared.Wrapper;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace LordOfTheHoney.Server.Controllers.Identity
{
    [Route("api/identity/token")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly ITokenService _identityService;

        public TokenController(ITokenService identityService, ICurrentUserService currentUserService)
        {
            _identityService = identityService;
        }

        /// <summary>
        /// Get Token (Email, Password)
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Status 200 OK</returns>
        /// <returns>Status 400 BadRequest</returns>
        /// <returns>Status 404 Not Found</returns>
        [HttpPost]
        public async Task<ActionResult> Get(TokenRequest model)
        {
            var response = await _identityService.LoginAsync(model);
            if (response.Succeeded)
                return Ok(response);
            else
                return BadRequest(response.Messages);
        }

        /// <summary>
        /// Refresh Token
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Status 200 OK</returns>
        /// <returns>Status 404 Not Found</returns>
        [HttpPost("refresh")]
        public async Task<ActionResult<Result>> Refresh([FromBody] RefreshTokenRequest model)
        {
            return await _identityService.GetRefreshTokenAsync(model);
        }
    }
}
