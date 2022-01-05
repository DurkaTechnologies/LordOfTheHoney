using Application.Interfaces.Services.Shop;
using AutoMapper;
using LordOfTheHoney.Application.Features.ShopItemType.Commands.Create;
using LordOfTheHoney.Application.Features.ShopItemType.Commands.Patch;
using LordOfTheHoney.Application.Features.ShopItemType.Queries.GetAllPaged;
using LordOfTheHoney.Application.Interfaces.Repositories;
using LordOfTheHoney.Domain.Entities.Catalog;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using LordOfTheHoney.Application.Exceptions;
using Domain.Enums;
using AutoMapper.QueryableExtensions;
using LordOfTheHoney.Application.Extensions;
using System.Collections.Generic;

namespace Infrastructure.Services.Shop
{
    public class ShopItemTypeService : IShopItemTypeService
    {
        private readonly IUnitOfWork<int> unitOfWork;
        private readonly IMediator mediator;
        private readonly IMapper mapper;

        public ShopItemTypeService(IUnitOfWork<int> unitOfWork, IMapper mapper, IMediator mediator)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.mediator = mediator;
        }

        public async Task<bool> CreateShopItemTypeAsync(CreateShopItemTypeCommand command, CancellationToken cancellationToken)
        {
            if (await unitOfWork.Repository<ShopItemType>().Entities
                    .AnyAsync(p => p.Name == command.Name, cancellationToken))
            {
                throw new ApiException("Name already exists!");
            }

            var shopItemType = mapper.Map<ShopItemType>(command);

            await unitOfWork.Repository<ShopItemType>().AddAsync(shopItemType);

            int resultEntitySave = await unitOfWork.Commit(cancellationToken);
            return true;
        }

        public async Task<bool> PatchShopItemTypeAsync(PatchShopItemTypeCommand command, CancellationToken cancellationToken)
        {
            if (await unitOfWork.Repository<ShopItemType>().Entities.Where(p => p.Id != command.Id)
                .AnyAsync(p => p.Name == command.Name, cancellationToken))
            {
                throw new Exception("Name already exists!");
            }

            var shopItemType = await unitOfWork.Repository<ShopItemType>().GetByIdAsync(command.Id);
            if (shopItemType != null)
            {
                shopItemType.Name = command.Name ?? shopItemType.Name;
                shopItemType.Description = command.Description ?? shopItemType.Description;

                await unitOfWork.Repository<ShopItemType>().UpdateAsync(shopItemType);
                await unitOfWork.Commit(cancellationToken);
                return true;
            }
            else
            {
                throw new NotFoundException(nameof(ShopItemType), command.Id);
            }
        }

        public async Task<bool> DeleteShopItemTypeByIdAsync(int id, CancellationToken cancellationToken)
        {
            var shopItemType = await unitOfWork.Repository<ShopItemType>().GetByIdAsync(id);

            if (shopItemType == null)
                throw new NotFoundException(nameof(ShopItemType), id);

            await unitOfWork.Repository<ShopItemType>().DeleteAsync(shopItemType);
            return await unitOfWork.Commit(cancellationToken) != 0;
        }

        public async Task<IEnumerable<GetAllShopItemTypesResponse>> GetAllShopItemTypes(GetAllShopItemTypesQuery request, CancellationToken cancellationToken)
        {
            bool? isSortDescending = null;

            isSortDescending = request.SortDirection == SortDirection.Ascending;

            var data = unitOfWork
                .Repository<ShopItemType>().Entities
                .ProjectTo<GetAllShopItemTypesResponse>(mapper.ConfigurationProvider);

            data = isSortDescending.Value ? data.OrderByDescending(element => element.Name)
                  : data.OrderBy(element => element.Name);

            return await data.ToArrayAsync();
        }

        public async Task<ShopItemType> GetShopItemTypeById(int id, CancellationToken cancellationToken)
        {
            var shopItemType = await unitOfWork.Repository<ShopItemType>().GetByIdAsync(id);

            if (shopItemType == null)
                throw new NotFoundException(nameof(ShopItemType), id);
            return shopItemType;
        }
    }
}
