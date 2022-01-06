using Application.Interfaces.Services.Shop;
using LordOfTheHoney.Shared.Wrapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace LordOfTheHoney.Application.Features.ShopItemType.Queries.GetById
{
    public class GetShopItemTypeByIdQuery : IRequest<Domain.Entities.Catalog.ShopItemType>
    {
        public GetShopItemTypeByIdQuery(int id)
        {
            Id = id;
        }

        public int Id { get; set; }
    }

    internal class GetShopItemTypeByIdQueryHandler : IRequestHandler<GetShopItemTypeByIdQuery, Domain.Entities.Catalog.ShopItemType>
    {
        private readonly IShopItemTypeService shopItemTypeService;

        public GetShopItemTypeByIdQueryHandler(IShopItemTypeService shopItemTypeService)
        {
            this.shopItemTypeService = shopItemTypeService;
        }

        public async Task<Domain.Entities.Catalog.ShopItemType> Handle(GetShopItemTypeByIdQuery request, CancellationToken cancellationToken)
        {
            return await shopItemTypeService.GetShopItemTypeById(request.Id, cancellationToken);
        }
    }
}
