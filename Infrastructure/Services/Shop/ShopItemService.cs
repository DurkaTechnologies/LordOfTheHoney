using Application.Interfaces.Services.Shop;
using AutoMapper;
using LordOfTheHoney.Application.Features.ShopItem.Commands.Create;
using LordOfTheHoney.Application.Features.ShopItem.Commands.Patch;
using LordOfTheHoney.Application.Features.ShopItem.Queries.GetAllPaged;
using LordOfTheHoney.Application.Interfaces.Repositories;
using LordOfTheHoney.Domain.Entities.Shop;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using LordOfTheHoney.Application.Exceptions;
using LordOfTheHoney.Shared.Wrapper;
using Domain.Enums;
using AutoMapper.QueryableExtensions;
using LordOfTheHoney.Application.Extensions;
using LordOfTheHoney.Application.Specifications;

namespace Infrastructure.Services.Shop
{
    public class ShopItemService : IShopItemService
    {
        private readonly IUnitOfWork<int> unitOfWork;
        private readonly IMediator mediator;
        private readonly IMapper mapper;

        public ShopItemService(IUnitOfWork<int> unitOfWork, IMapper mapper, IMediator mediator)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.mediator = mediator;
        }

        public async Task<bool> CreateShopItemAsync(CreateShopItemCommand command, CancellationToken cancellationToken)
        {
            if (await unitOfWork.Repository<ShopItem>().Entities
                    .AnyAsync(p => p.Barcode == command.Barcode, cancellationToken))
            {
                throw new Exception("Barcode already exists!");
            }

            var shopItem = mapper.Map<ShopItem>(command);

            await unitOfWork.Repository<ShopItem>().AddAsync(shopItem);

            int resultEntitySave = await unitOfWork.Commit(cancellationToken);
            return true;
        }

        public async Task<bool> PatchShopItemAsync(PatchShopItemCommand command, CancellationToken cancellationToken)
        {
            if (await unitOfWork.Repository<ShopItem>().Entities.Where(p => p.Id != command.Id)
                .AnyAsync(p => p.Barcode == command.Barcode, cancellationToken))
            {
                throw new Exception("Barcode already exists!");
            }

            var shopItem = await unitOfWork.Repository<ShopItem>().GetByIdAsync(command.Id);
            if (shopItem != null)
            {
                shopItem.Name = command.Name ?? shopItem.Name;
                shopItem.Description = command.Description ?? shopItem.Description;
                shopItem.Cost = command.Cost;

                shopItem.ShopItemTypeId = (command.ShopItemTypeId == 0) ? shopItem.ShopItemTypeId : command.ShopItemTypeId;
                await unitOfWork.Repository<ShopItem>().UpdateAsync(shopItem);
                await unitOfWork.Commit(cancellationToken);
                return true;
            }
            else
            {
                throw new NotFoundException(nameof(ShopItem), command.Id);
            }
        }

        public async Task<bool> DeleteShopItemByIdAsync(int id, CancellationToken cancellationToken)
        {
            var shopItem = await unitOfWork.Repository<ShopItem>().GetByIdAsync(id);
            if (shopItem == null)
            {
                throw new NotFoundException(nameof(ShopItem), id);
            }
            await unitOfWork.Repository<ShopItem>().DeleteAsync(shopItem);
            return await unitOfWork.Commit(cancellationToken) != 0;
        }

        public async Task<PaginatedResult<GetAllPagedShopItemsResponse>> GetAllPagedShopItems(GetAllPagedShopItemsQuery request, CancellationToken cancellationToken)
        {
            bool? isSortDescending = null;

            if (request.SortDirection == SortDirection.Ascending)
                isSortDescending = true;
            else if (request.SortDirection == SortDirection.Descending)
                isSortDescending = false;

            ShopItemFilterSpecification specification = new ShopItemFilterSpecification(request.SearchString);
            var data = unitOfWork
                .Repository<ShopItem>()
                .Entities
                .Include(element => element.ShopItemType)
                .Specify(specification)
                .ProjectTo<GetAllPagedShopItemsResponse>(mapper.ConfigurationProvider);

            data = isSortDescending.Value ? data.OrderByDescending(element => element.Name)
                  : data.OrderBy(element => element.Name);

            return await data.ToPaginatedListAsync(request.PageNumber, request.PageSize, cancellationToken);
        }

        public async Task<ShopItem> GetShopItemById(int id, CancellationToken cancellationToken)
        {
            var shopItem = await unitOfWork.Repository<ShopItem>().GetByIdAsync(id);
            if (shopItem == null)
            {
                throw new NotFoundException(nameof(ShopItem), id);
            }
            return shopItem;
        }
    }
}
