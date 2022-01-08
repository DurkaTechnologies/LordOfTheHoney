using LordOfTheHoney.Application.Interfaces.Common;
using LordOfTheHoney.Application.Requests.Identity;
using LordOfTheHoney.Domain.Entities.Shop;
using LordOfTheHoney.Shared.Wrapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LordOfTheHoney.Application.Interfaces.Services.Account
{
    public interface IAccountService : IService
    {
        Task<IResult> UpdateProfileAsync(UpdateProfileRequest model, string userId);

        Task<IResult> ChangePasswordAsync(ChangePasswordRequest model, string userId);

        Task<IResult<string>> GetProfilePictureAsync(string userId);

        Task<IResult<decimal>> BuyShopItemsAsync(BuyShopItemRequest model);

        Task<IResult<StorageItem>> GetDeleteItemFromStorageAsync(GetDeleteItemFromStorage model);

        Task<IResult<IEnumerable<StorageItem>>> GetUserStorageAsync(string userId);

    }
}
