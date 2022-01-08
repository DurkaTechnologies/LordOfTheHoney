using Application.Interfaces.Services.Shop;
using Domain.Enums;
using LordOfTheHoney.Shared.Wrapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace LordOfTheHoney.Application.Features.ShopItems.Queries.GetAllPaged
{
    public class GetAllPagedShopItemsQuery : IRequest<PaginatedResult<GetAllPagedShopItemsResponse>>
    {
        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public string SearchString { get; set; }

        public SortDirection SortDirection { get; set; }

        public GetAllPagedShopItemsQuery(int pageNumber, int pageSize, string searchString, SortDirection sortDirection)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            SearchString = searchString;
            SortDirection = sortDirection;
        }
    }

    internal class GetAllPagedShopItemsQueryHandler : IRequestHandler<GetAllPagedShopItemsQuery, PaginatedResult<GetAllPagedShopItemsResponse>>
    {
        private readonly IShopItemService shopItemService;

        public GetAllPagedShopItemsQueryHandler(IShopItemService shopItemService)
        {
            this.shopItemService = shopItemService;
        }

        public async Task<PaginatedResult<GetAllPagedShopItemsResponse>> Handle(GetAllPagedShopItemsQuery request, CancellationToken cancellationToken)
        {
            return await shopItemService.GetAllPagedShopItems(request, cancellationToken);
        }
    }
}
