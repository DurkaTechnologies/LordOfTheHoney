using Application.Interfaces.Services.Shop;
using Domain.Enums;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace LordOfTheHoney.Application.Features.ShopItemType.Queries.GetAllPaged
{
    public class GetAllShopItemTypesQuery : IRequest<IEnumerable<GetAllShopItemTypesResponse>>
    {
        public GetAllShopItemTypesQuery(SortDirection sortDirection)
        {
            SortDirection = sortDirection;
        }

        public SortDirection SortDirection { get; set; }
    }

    internal class GetAllPagedShopItemsQueryHandler : IRequestHandler<GetAllShopItemTypesQuery, IEnumerable<GetAllShopItemTypesResponse>>
    {
        private readonly IShopItemTypeService shopItemTypeService;

        public GetAllPagedShopItemsQueryHandler(IShopItemTypeService shopItemTypeService)
        {
            this.shopItemTypeService = shopItemTypeService;
        }

        public async Task<IEnumerable<GetAllShopItemTypesResponse>> Handle(GetAllShopItemTypesQuery request, CancellationToken cancellationToken)
        {
            return await shopItemTypeService.GetAllShopItemTypes(request, cancellationToken);
        }
    }
}
