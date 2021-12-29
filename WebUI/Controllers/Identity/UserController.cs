using LordOfTheHoney.Application.Interfaces.Services.Identity;
using LordOfTheHoney.Application.Requests.Identity;
using LordOfTheHoney.Application.Responses.Identity;
using LordOfTheHoney.Shared.Constants.Permission;
using LordOfTheHoney.Shared.Wrapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LordOfTheHoney.Server.Controllers.Identity
{
    [Authorize]
    [Route("api/identity/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Get User Details
        /// </summary>
        /// <returns>Status 200 OK</returns>
        /// <returns>Status 400 BadRequest</returns>
        [Authorize(Policy = Permissions.Users.View)]
        [HttpGet]
        public async Task<ActionResult<List<UserResponse>>> GetAll()
        {
            return (await _userService.GetAllAsync()).Data;
        }

        /// <summary>
        /// Get User By Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Status 200 OK</returns>
        /// <returns>Status 400 BadRequest</returns>
        [Authorize(Policy = Permissions.Users.View)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var response = await _userService.GetAsync(id);
            if (response.Succeeded && response.Data != null)
                return Ok(response.Data);
            return BadRequest(response.Messages);
        }

        /// <summary>
        /// Get User Roles By Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Status 200 OK</returns>
        /// <returns>Status 400 BadRequest</returns>
        /// <returns>Status 404 NotFound</returns>
        [Authorize(Policy = Permissions.Users.View)]
        [HttpGet("roles/{id}")]
        public async Task<IActionResult> GetRolesAsync(string id)
        {
            var response = await _userService.GetRolesAsync(id);
            if (response.Succeeded)
                return Ok(response.Data);
            return BadRequest(response.Messages);
        }

        /// <summary>
        /// Update Roles for User
        /// </summary>
        /// <param name="request"></param>
        /// <returns>Status 200 OK</returns>
        /// <returns>Status 400 BadRequest</returns>
        /// <returns>Status 403 Forbidden</returns>
        /// <returns>Status 404 NotFound</returns>
        [Authorize(Policy = Permissions.Users.Edit)]
        [HttpPut("roles/{id}")]
        public async Task<IActionResult> UpdateRolesAsync(UpdateUserRolesRequest request)
        {
            var response = await _userService.UpdateRolesAsync(request);
            if (response.Succeeded)
                return Ok(response.Messages);
            return BadRequest(response.Messages);
        }

        /// <summary>
        /// Register a User
        /// </summary>
        /// <param name="request"></param>
        /// <returns>Status 200 OK</returns>
        /// <returns>Status 400 BadRequest</returns>
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> RegisterAsync(RegisterRequest request)
        {
            var origin = Request.Headers["origin"];
            var response = await _userService.RegisterAsync(request, origin);
            if (response.Succeeded)
                return Ok(response);
            return BadRequest(response.Messages);
        }

        /// <summary>
        /// Toggle User Status (Activate and Deactivate)
        /// </summary>
        /// <param name="request"></param>
        /// <returns>Status 200 OK</returns>
        /// <returns>Status 400 BadRequest</returns>
        /// <returns>Status 404 NotFound</returns>
        [HttpPost("toggle-status")]
        public async Task<IActionResult> ToggleUserStatusAsync(ToggleUserStatusRequest request)
        {
            var response = await _userService.ToggleUserStatusAsync(request);
            if (response.Succeeded)
                return Ok(response.Messages);
            return BadRequest();
        }

        /// <summary>
        /// Forgot Password
        /// </summary>
        /// <param name="request"></param>
        /// <returns>Status 200 OK</returns>
        /// <returns>Status 400 BadRequest</returns>
        /// <returns>Status 404 NotFound</returns>
        [HttpPost("forgot-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPasswordAsync(ForgotPasswordRequest request)
        {
            var origin = Request.Headers["origin"];
            var response = await _userService.ForgotPasswordAsync(request, origin);

            if (response.Succeeded)
                return Ok(response.Messages);
            return BadRequest(response.Messages);
        }

        /// <summary>
        /// Reset Password
        /// </summary>
        /// <param name="request"></param>
        /// <returns>Status 200 OK</returns>
        /// <returns>Status 400 BadRequest</returns>
        /// <returns>Status 404 NotFound</returns>
        [HttpPost("reset-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPasswordAsync(ResetPasswordRequest request)
        {
            var response = await _userService.ResetPasswordAsync(request);

            if (response.Succeeded)
                return Ok(response.Messages);
            return BadRequest(response.Messages);
        }
    }
}
