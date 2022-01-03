using AutoMapper;
using LordOfTheHoney.Application.Interfaces.Repositories;
using LordOfTheHoney.Domain.Entities.Catalog;
using LordOfTheHoney.Shared.Wrapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace LordOfTheHoney.Application.Features.ShopItemTypes.Queries.GetById
{
    public class GetShopItemTypeByIdQuery : IRequest<Result<GetShopItemTypeByIdResponse>>
    {
        public int Id { get; set; }
    }

    internal class GetShopItemByIdQueryHandler : IRequestHandler<GetShopItemTypeByIdQuery, Result<GetShopItemTypeByIdResponse>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;

        public GetShopItemByIdQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<GetShopItemTypeByIdResponse>> Handle(GetShopItemTypeByIdQuery query, CancellationToken cancellationToken)
        {
            var ShopItemType = await _unitOfWork.Repository<ShopItemType>().GetByIdAsync(query.Id);
            var mappedShopItemType = _mapper.Map<GetShopItemTypeByIdResponse>(ShopItemType);
            return await Result<GetShopItemTypeByIdResponse>.SuccessAsync(mappedShopItemType);
        }
    }
}