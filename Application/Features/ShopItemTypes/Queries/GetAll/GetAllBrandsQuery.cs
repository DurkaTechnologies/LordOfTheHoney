using AutoMapper;
using LordOfTheHoney.Application.Interfaces.Repositories;
using LordOfTheHoney.Domain.Entities.Catalog;
using LordOfTheHoney.Shared.Constants.Application;
using LordOfTheHoney.Shared.Wrapper;
using LazyCache;
using MediatR;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace LordOfTheHoney.Application.Features.ShopItemTypes.Queries.GetAll
{
    public class GetAllShopItemTypesQuery : IRequest<Result<List<GetAllShopItemTypesResponse>>>
    {
        public GetAllShopItemTypesQuery()
        {
        }
    }

    internal class GetAllShopItemTypesCachedQueryHandler : IRequestHandler<GetAllShopItemTypesQuery, Result<List<GetAllShopItemTypesResponse>>>
    {
        private readonly IUnitOfWork<int> _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IAppCache _cache;

        public GetAllShopItemTypesCachedQueryHandler(IUnitOfWork<int> unitOfWork, IMapper mapper, IAppCache cache)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _cache = cache;
        }

        public async Task<Result<List<GetAllShopItemTypesResponse>>> Handle(GetAllShopItemTypesQuery request, CancellationToken cancellationToken)
        {
            Func<Task<List<ShopItemType>>> getAllShopItemTypes = () => _unitOfWork.Repository<ShopItemType>().GetAllAsync();
            var ShopItemTypeList = await _cache.GetOrAddAsync(ApplicationConstants.Cache.GetAllShopItemTypesCacheKey, getAllShopItemTypes);
            var mappedShopItemTypes = _mapper.Map<List<GetAllShopItemTypesResponse>>(ShopItemTypeList);
            return await Result<List<GetAllShopItemTypesResponse>>.SuccessAsync(mappedShopItemTypes);
        }
    }
}