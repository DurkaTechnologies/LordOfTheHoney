using System.ComponentModel.DataAnnotations;
using LordOfTheHoney.Shared.Wrapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces.Services.Shop;
using LordOfTheHoney.Application.Requests;
using Microsoft.AspNetCore.Http;

namespace LordOfTheHoney.Application.Features.ShopItems.Commands.Create
{
    public partial class CreateShopItemCommand : IRequest<IResult<bool>>
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Barcode { get; set; }

        public string Description { get; set; }

        public string PicturePath { get; set; }

        [Required]
        public decimal Cost { get; set; }

        [Required]
        public int ShopItemTypeId { get; set; }

        public UploadRequest UploadRequest { get; set; }
    }

    internal class CreateShopItemCommandHandler : IRequestHandler<CreateShopItemCommand, IResult<bool>>
    {
        private readonly IShopItemService shopItemService;

        public CreateShopItemCommandHandler(IShopItemService shopItemService)
        {
            this.shopItemService = shopItemService;
        }

        public async Task<IResult<bool>> Handle(CreateShopItemCommand command, CancellationToken cancellationToken)
        {
            var shopItem = await shopItemService.CreateShopItemAsync(command, cancellationToken);
            return await Result<bool>.SuccessAsync(shopItem);
        }
    }
}
