using LordOfTheHoney.Application.Features.ShopItemTypes.Commands.Create;
using LordOfTheHoney.Application.Features.ShopItemTypes.Commands.Patch;
using LordOfTheHoney.Application.Features.ShopItemTypes.Queries.GetAllPaged;
using LordOfTheHoney.Domain.Entities.Shop;
using LordOfTheHoney.Shared.Wrapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Interfaces.Services.Shop
{
    public interface IShopItemTypeService
    {
        Task<bool> CreateShopItemTypeAsync(CreateShopItemTypeCommand command, CancellationToken cancellationToken);
        
        Task<bool> DeleteShopItemTypeByIdAsync(int id, CancellationToken cancellationToken);

        Task<bool> PatchShopItemTypeAsync(PatchShopItemTypeCommand command, CancellationToken cancellationToken);

        Task<IEnumerable<GetAllShopItemTypesResponse>> GetAllShopItemTypes(GetAllShopItemTypesQuery request, CancellationToken cancellationToken);
        
        Task<ShopItemType> GetShopItemTypeById(int id, CancellationToken cancellationToken);
    }
}
