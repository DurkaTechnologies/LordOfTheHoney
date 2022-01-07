using Application.Interfaces.Services.Shop;
using AutoMapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace LordOfTheHoney.Application.Features.ShopItem.Queries.GetById
{
    public class GetShopItemByIdQuery : IRequest<GetShopItemByIdResponse>
    {
        public GetShopItemByIdQuery(int id)
        {
            Id = id;
        }

        public int Id { get; set; }
    }

    internal class GetShopItemByIdQueryHandler : IRequestHandler<GetShopItemByIdQuery, GetShopItemByIdResponse>
    {
        private readonly IShopItemService shopItemService;
        private readonly IMapper mapper;

        public GetShopItemByIdQueryHandler(IShopItemService shopItemService, IMapper mapper)
        {
            this.shopItemService = shopItemService;
            this.mapper = mapper;
        }

        public async Task<GetShopItemByIdResponse> Handle(GetShopItemByIdQuery request, CancellationToken cancellationToken)
        {
            return mapper.Map<GetShopItemByIdResponse>(await shopItemService.GetShopItemById(request.Id, cancellationToken));
        }
    }
}
