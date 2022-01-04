using LordOfTheHoney.Application.Features.ShopItem.Commands.Create;
using LordOfTheHoney.Application.Features.ShopItem.Commands.Patch;
using LordOfTheHoney.Application.Features.ShopItem.Queries.GetAllPaged;
using LordOfTheHoney.Domain.Entities.Catalog;
using LordOfTheHoney.Shared.Wrapper;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Interfaces.Services.Shop
{
    public interface IShopItemService
    {

        Task<bool> CreateShopItemAsync(CreateShopItemCommand command, CancellationToken cancellationToken);

        Task<bool> DeleteShopItemByIdAsync(int id, CancellationToken cancellationToken);

        Task<bool> PatchShopItemAsync(PatchShopItemCommand command, CancellationToken cancellationToken);

        Task<PaginatedResult<GetAllPagedShopItemsResponse>> GetAllPagedShopItems(GetAllPagedShopItemsQuery request, CancellationToken cancellationToken);
        
        Task<ShopItem> GetShopItemById(int id, CancellationToken cancellationToken);
    }
}
