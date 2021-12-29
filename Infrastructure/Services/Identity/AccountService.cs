using LordOfTheHoney.Application.Interfaces.Services.Account;
using LordOfTheHoney.Infrastructure.Models.Identity;
using LordOfTheHoney.Application.Requests.Identity;
using LordOfTheHoney.Shared.Wrapper;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;
using LordOfTheHoney.Application.Exceptions;

namespace LordOfTheHoney.Infrastructure.Services.Identity
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;

        public AccountService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        public async Task<IResult> ChangePasswordAsync(ChangePasswordRequest model, string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
                throw new NotFoundException(nameof(ApplicationUser), userId);

            var identityResult = await userManager.ChangePasswordAsync(
                user,
                model.Password,
                model.NewPassword);
            var errors = identityResult.Errors.Select(e => e.Description.ToString()).ToList();

            return identityResult.Succeeded ? await Result.SuccessAsync() : await Result.FailAsync(errors);
        }

        public async Task<IResult> UpdateProfileAsync(UpdateProfileRequest request, string userId)
        {
            var userWithSameEmail = await userManager.FindByEmailAsync(request.Email);

            if (userWithSameEmail == null || userWithSameEmail.Id == userId)
            {
                var user = await userManager.FindByIdAsync(userId);
                if (user == null)
                    throw new NotFoundException(nameof(ApplicationUser), userId);

                var phoneNumber = await userManager.GetPhoneNumberAsync(user);

                var identityResult = await userManager.UpdateAsync(user);
                var errors = identityResult.Errors.Select(e => e.Description.ToString()).ToList();
                await signInManager.RefreshSignInAsync(user);

                return identityResult.Succeeded ? await Result.SuccessAsync() : await Result.FailAsync(errors);
            }
            else
            {
                return await Result.FailAsync(string.Format("Email {0} is already used.", request.Email));
            }
        }

        public async Task<IResult<string>> GetProfilePictureAsync(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
                throw new NotFoundException(nameof(ApplicationUser), userId);

            return await Result<string>.SuccessAsync(data: user.ProfilePictureDataUrl);
        }
    }
}
