using Application.Interfaces.Services.Shop;
using AutoMapper;
using LordOfTheHoney.Application.Features.ShopItem.Commands.Create;
using LordOfTheHoney.Application.Features.ShopItem.Commands.Patch;
using LordOfTheHoney.Application.Features.ShopItem.Queries.GetAllPaged;
using LordOfTheHoney.Application.Interfaces.Repositories;
using LordOfTheHoney.Domain.Entities.Catalog;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using LordOfTheHoney.Application.Exceptions;

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
            var product = await unitOfWork.Repository<ShopItem>().GetByIdAsync(id);
            if (product == null)
            {
                throw new NotFoundException(nameof(ShopItem), id);
            }
            await unitOfWork.Repository<ShopItem>().DeleteAsync(product);
            return await unitOfWork.Commit(cancellationToken) != 0;
        }

        public Task<GetAllPagedShopItemsResponse> GetAllPagedShopItems(GetAllPagedShopItemsQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }


    }
}
