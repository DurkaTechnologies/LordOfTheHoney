﻿using LordOfTheHoney.Application.Interfaces.Services;
using LordOfTheHoney.Application.Interfaces.Services.Account;
using LordOfTheHoney.Application.Requests.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace LordOfTheHoney.Server.Controllers.Identity
{
    [Authorize]
    [Route("api/identity/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ICurrentUserService _currentUser;

        public AccountController(IAccountService accountService, ICurrentUserService currentUser)
        {
            _accountService = accountService;
            _currentUser = currentUser;
        }

        /// <summary>
        /// Update Profile
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Status 200 OK</returns>
        /// <returns>Status 400 BadRequest</returns>
        [HttpPut(nameof(UpdateProfile))]
        public async Task<ActionResult> UpdateProfile(UpdateProfileRequest model)
        {
            var response = await _accountService.UpdateProfileAsync(model, _currentUser.UserId);
            if (response.Succeeded)
                return Ok(response);
            else
                return BadRequest(response.Messages);
        }

        /// <summary>
        /// Change Password
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Status 200 OK</returns>
        /// <returns>Status 400 BadRequest</returns>
        [HttpPut(nameof(ChangePassword))]
        public async Task<ActionResult> ChangePassword(ChangePasswordRequest model)
        {
            var response = await _accountService.ChangePasswordAsync(model, _currentUser.UserId);
            if (response.Succeeded)
                return Ok(response);
            else
                return BadRequest(response.Messages);
        }

        /// <summary>
        /// Get Profile picture by Id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>Status 200 OK </returns>
        /// <returns>Status 404 OK </returns>
        [HttpGet("profile-picture/{userId}")]
        [ResponseCache(NoStore = false, Location = ResponseCacheLocation.Client, Duration = 60)]
        public async Task<IActionResult> GetProfilePictureAsync(string userId)
        {
            var response = await _accountService.GetProfilePictureAsync(userId);
            if (response.Succeeded)
                return Ok(response);
            else
                return BadRequest(response.Messages);
        }

        /// <summary>
        /// Update Profile
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Status 200 OK</returns>
        /// <returns>Status 400 BadRequest</returns>
        /// <returns>Status 404 OK </returns>
        [HttpPost(nameof(BuyShopItemsAsync))]
        public async Task<IActionResult> BuyShopItemsAsync(BuyShopItemRequest model)
        {
            var response = await _accountService.BuyShopItemsAsync(model);
            if (response.Succeeded)
            {
                return Ok(response);
            }
            else
                return BadRequest(response);
        }

        [HttpDelete(nameof(GetDeleteItemFromStorageAsync))]
        public async Task<IActionResult> GetDeleteItemFromStorageAsync(GetDeleteItemFromStorage model)
        {
            var response = await _accountService.GetDeleteItemFromStorageAsync(model);
            if (response.Succeeded)
            {
                return Ok(response);
            }
            else
                return BadRequest(response);
        }
        /// <summary>
        /// Get user storage by user id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>Status 200 OK Status; 400 BadRequest; Status 404 NotFound</returns>
        [HttpGet(nameof(GetUserStorage))]
        public async Task<IActionResult> GetUserStorage(string userId)
        {
            var response = await _accountService.GetUserStorageAsync(userId);
            if (response.Succeeded)
                return Ok(response);
            else
                return BadRequest(response);
        }
    }
}
