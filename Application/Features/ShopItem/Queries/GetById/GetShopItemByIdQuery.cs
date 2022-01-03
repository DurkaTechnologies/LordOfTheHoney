using LordOfTheHoney.Shared.Wrapper;
using MediatR;

namespace LordOfTheHoney.Application.Features.ShopItem.Queries.GetById
{
    public class GetShopItemByIdQuery : IRequest<PaginatedResult<GetShopItemByIdResponse>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SearchString { get; set; }
        public string[] OrderBy { get; set; } // of the form fieldname [ascending|descending],fieldname [ascending|descending]...

        public GetShopItemByIdQuery(int pageNumber, int pageSize, string searchString, string orderBy)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            SearchString = searchString;

            if (!string.IsNullOrWhiteSpace(orderBy))
            {
                OrderBy = orderBy.Split(',');
            }
        }
    }

    //internal class GetAllShopItemsQueryHandler : IRequestHandler<GetAllShopItemsQuery, PaginatedResult<GetAllPagedShopItemsResponse>>
    //{
    //    private readonly IUnitOfWork<int> _unitOfWork;

    //    public GetAllShopItemsQueryHandler(IUnitOfWork<int> unitOfWork)
    //    {
    //        _unitOfWork = unitOfWork;
    //    }

    //    //public async Task<PaginatedResult<GetAllPagedShopItemsResponse>> Handle(GetAllShopItemsQuery request, CancellationToken cancellationToken)
    //    //{
    //    //    Expression<Func<ShopItem, GetAllPagedShopItemsResponse>> expression = e => new GetAllPagedShopItemsResponse
    //    //    {
    //    //        Id = e.Id,
    //    //        Name = e.Name,
    //    //        Description = e.Description,
    //    //        Barcode = e.Barcode,
    //    //        ShopItemTypeId = e.ShopItemTypeId
    //    //    };
    //    //    var productFilterSpec = new ShopItemFilterSpecification(request.SearchString);
    //    //    if (request.OrderBy?.Any() != true)
    //    //    {
    //    //        var data = await _unitOfWork.Repository<ShopItem>().Entities
    //    //           .Specify(productFilterSpec)
    //    //           .Select(expression)
    //    //           .ToPaginatedListAsync(request.PageNumber, request.PageSize);
    //    //        return data;
    //    //    }
    //    //    else
    //    //    {
    //    //        var ordering = string.Join(",", request.OrderBy); // of the form fieldname [ascending|descending], ...
    //    //        var data = await _unitOfWork.Repository<ShopItem>().Entities
    //    //           .Specify(productFilterSpec)
    //    //           .OrderBy(ordering) // require system.linq.dynamic.core
    //    //           .Select(expression)
    //    //           .ToPaginatedListAsync(request.PageNumber, request.PageSize);
    //    //        return data;

    //    //    }
    //    //}
    //}
}