using Application.Interfaces.Services.Shop;
using AutoMapper;
using LordOfTheHoney.Domain.Entities.Shop;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace LordOfTheHoney.Application.Features.ShopItemTypes.Queries.GetById
{
    public class GetShopItemTypeByIdQuery : IRequest<GetShopItemTypeByIdResponse>
    {
        public GetShopItemTypeByIdQuery(int id)
        {
            Id = id;
        }

        public int Id { get; set; }
    }

    internal class GetShopItemTypeByIdQueryHandler : IRequestHandler<GetShopItemTypeByIdQuery, GetShopItemTypeByIdResponse>
    {
        private readonly IShopItemTypeService shopItemTypeService;
        private readonly IMapper mapper;

        public GetShopItemTypeByIdQueryHandler(IShopItemTypeService shopItemTypeService, IMapper mapper)
        {
            this.shopItemTypeService = shopItemTypeService;
            this.mapper = mapper;
        }

        public async Task<GetShopItemTypeByIdResponse> Handle(GetShopItemTypeByIdQuery request, CancellationToken cancellationToken)
        {
            return mapper.Map<GetShopItemTypeByIdResponse>(await shopItemTypeService.GetShopItemTypeById(request.Id, cancellationToken));
        }
    }
}
