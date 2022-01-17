using Application.Interfaces.Services.Shop;
using AutoMapper;
using LordOfTheHoney.Application.Features.ShopItems.Commands.Create;
using LordOfTheHoney.Application.Features.ShopItems.Commands.Patch;
using LordOfTheHoney.Application.Features.ShopItems.Queries.GetAllPaged;
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
using LordOfTheHoney.Application.Interfaces.Services;
using LordOfTheHoney.Application.Enums;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;

namespace Infrastructure.Services.Shop
{
    public class ShopItemService : IShopItemService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMediator mediator;
        private readonly IMapper mapper;
        private readonly IUploadService uploadService;

        public ShopItemService(IUnitOfWork unitOfWork, IMapper mapper,
            IMediator mediator, IUploadService uploadService)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.mediator = mediator;
            this.uploadService = uploadService;
        }

        public async Task<bool> CreateShopItemAsync(CreateShopItemCommand command, CancellationToken cancellationToken)
        {
            if (await unitOfWork.Repository<ShopItem>().Entities.AnyAsync(p => p.Barcode == command.Barcode, cancellationToken))
            {
                throw new Exception("Barcode already exists!");
            }

            var shopItem = mapper.Map<ShopItem>(command);
            if (command.Image != null)
            {
                byte[] converted = Convert.FromBase64String(command.Image.Data);
                MemoryStream stream = new MemoryStream(converted);
                IFormFile file = new FormFile(stream, 0, converted.Length, "salo", "png");
                

                string fileName = $"ShopItem-{command.Name}.{Path.GetExtension(file.FileName)}";
                shopItem.PicturePath = await uploadService.UploadByFormFileAsync(file,
                    UploadType.ShopItem, fileName);
            }

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
                if (command.FormFile != null)
                {
                    string fileName = $"ShopItem-{command.Name}.{Path.GetExtension(command.FormFile.FileName)}";
                    shopItem.PicturePath = await uploadService.UploadByFormFileAsync(command.FormFile,
                        UploadType.ShopItem, fileName);
                }

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
