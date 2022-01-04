using Application.Interfaces.Services.Shop;
using LordOfTheHoney.Shared.Wrapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace LordOfTheHoney.Application.Features.ShopItem.Queries.GetById
{
    public class GetShopItemByIdQuery : IRequest<Domain.Entities.Catalog.ShopItem>
    {
        public GetShopItemByIdQuery(int id)
        {
            Id = id;
        }

        public int Id { get; set; }
    }

    internal class GetShopItemByIdQueryHandler : IRequestHandler<GetShopItemByIdQuery, Domain.Entities.Catalog.ShopItem>
    {
        private readonly IShopItemService shopItemService;

        public GetShopItemByIdQueryHandler(IShopItemService shopItemService)
        {
            this.shopItemService = shopItemService;
        }

        public async Task<Domain.Entities.Catalog.ShopItem> Handle(GetShopItemByIdQuery request, CancellationToken cancellationToken)
        {
            return await shopItemService.GetShopItemById(request.Id, cancellationToken);
        }
    }
}
