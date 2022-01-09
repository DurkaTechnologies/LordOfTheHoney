using LordOfTheHoney.Application.Interfaces.Services.Account;
using LordOfTheHoney.Infrastructure.Models.Identity;
using LordOfTheHoney.Application.Requests.Identity;
using LordOfTheHoney.Shared.Wrapper;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;
using LordOfTheHoney.Application.Exceptions;
using LordOfTheHoney.Application.Interfaces.Repositories;
using LordOfTheHoney.Domain.Entities.Shop;
using LordOfTheHoney.Application.Models.Shop;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace LordOfTheHoney.Infrastructure.Services.Identity
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager; 
        private readonly IUnitOfWork unitOfWork;

        public AccountService(UserManager<ApplicationUser> userManager, 
            SignInManager<ApplicationUser> signInManager, IUnitOfWork unitOfWork)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.unitOfWork = unitOfWork;
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
                return await Result.FailAsync($"Email {request.Email} is already used.");
            }
        }

        public async Task<IResult<string>> GetProfilePictureAsync(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
                throw new NotFoundException(nameof(ApplicationUser), userId);

            return await Result<string>.SuccessAsync(data: user.ProfilePictureDataUrl);
        }

        private async Task<IdentityResult> CreateAndAddItemsToStorage(IEnumerable<StorageItem> storageItems, string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user != null)
            {
                try
                {
                    foreach (var item in storageItems)
                        user.StorageItems.Add(item);

                    return await userManager.UpdateAsync(user);
                }
                catch (System.Exception)
                {
                    throw;
                }
            }
            throw new NotFoundException(nameof(ApplicationUser), userId);
        }

        public async Task<IResult<decimal>> BuyShopItemsAsync(BuyShopItemRequest model)
        {
            var user = await userManager.FindByIdAsync(model.UserId);
            if (user != null)
            {
                if (user.BeeCoins == 0)
                    return await Result <decimal>.FailAsync($"User haven't BeeCoins.");

                decimal totalPrice = 0;

                if (model.CartItems.Count != 0)
                {
                    var sortedCart = model.CartItems.OrderBy(e => e.ShopItemId).ToArray();
                    var listOfCartItemId = sortedCart.Select(c => c.ShopItemId);
                    ShopItem[] result = new ShopItem[] { };

                    try
                    {
                        result = unitOfWork.Repository<ShopItem>().Entities
                       .Where(e => listOfCartItemId.Contains(e.Id)).ToArray();
                    }
                    catch (System.Exception ex)
                    {
                        throw new NotFoundException(ex.InnerException.Message);
                    }

                    for (int i = 0; i < listOfCartItemId.Count(); i++)
                    {
                        totalPrice += result[i].Cost * sortedCart[i].Quantity;
                    }

                    if (user.BeeCoins >= totalPrice)
                    {
                        var storageItems = sortedCart.Select(sc => new StorageItem()
                        {
                            ApplicationUserId = user.Id,
                            Quantity = sc.Quantity,
                            ShopItemId = sc.ShopItemId
                        });

                        var addToStorageResult = await CreateAndAddItemsToStorage(storageItems, user.Id);

                        if (addToStorageResult.Succeeded)
                        {
                            user.BeeCoins -= totalPrice;
                            var identityResult = await userManager.UpdateAsync(user);
                            var errors = identityResult.Errors.Select(e => e.Description).ToList();

                            return identityResult.Succeeded ? Result<decimal>.Success(totalPrice) : Result<decimal>.Fail(errors);
                        }
                        else
                            return Result<decimal>.Fail(addToStorageResult.Errors.Select(e => e.Description).ToList());
                    }
                    else
                        return await Result<decimal>.FailAsync($"The user haven't enough BeeCoins.");
                }
                return await Result<decimal>.FailAsync($"Cart is empty!");
            }
            throw new NotFoundException(nameof(ApplicationUser), model.UserId);
        }

        public async Task<IResult<StorageItem>> GetDeleteItemFromStorageAsync(GetDeleteItemFromStorage model)
        {
            var user = await userManager.Users.Include(user => user.StorageItems)
                .Where(user => user.Id == model.UserId).FirstOrDefaultAsync();
            if (user != null || user.StorageItems.Count() == 0)
            {
                var gettedItem = user.StorageItems.Where(si => si.ApplicationUserId == model.UserId)
                    .Where(si => si.ShopItemId == model.ShopItemId).Where(si => si.Quantity == model.Quantity).FirstOrDefault();

                if (gettedItem != null)
                {
                    await unitOfWork.RepositoryClassic<StorageItem>().DeleteAsync(gettedItem);
                    unitOfWork.Commit();

                    return await Result<StorageItem>.SuccessAsync(gettedItem);
                }
                else
                    throw new NotFoundException($"User haven`t item with shopItemId:{model.ShopItemId} in the ItemStorage");
            }
            throw new NotFoundException(nameof(ApplicationUser), model.UserId);
        }
        public async Task<IResult<IEnumerable<StorageItem>>> GetUserStorageAsync(string userId)
        {
            var user = await userManager.Users.Include(user => user.StorageItems)
                .Where(user => user.Id == userId).FirstOrDefaultAsync();
            if (user != null)
            {
                var userStorageIds = user.StorageItems.Select(item => item.ShopItemId).ToList();
                var shopItemsGroups = unitOfWork.Repository<ShopItem>().Entities.Where(item => userStorageIds.Contains(item.Id)).ToDictionary(item => item.Id);

                foreach (var item in user.StorageItems)
                    item.ShopItem = shopItemsGroups[item.ShopItemId];
                
                return await Result<IEnumerable<StorageItem>>.SuccessAsync(user.StorageItems);
            }

            throw new NotFoundException(nameof(ApplicationUser), userId);
        }
    }
}
