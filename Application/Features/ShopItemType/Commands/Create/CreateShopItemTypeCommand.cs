using System.ComponentModel.DataAnnotations;
using LordOfTheHoney.Shared.Wrapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces.Services.Shop;

namespace LordOfTheHoney.Application.Features.ShopItemType.Commands.Create
{
    public partial class CreateShopItemTypeCommand : IRequest<IResult<bool>>
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }
    }

    internal class CreateShopItemTypeCommandHandler : IRequestHandler<CreateShopItemTypeCommand, IResult<bool>>
    {
        private readonly IShopItemTypeService shopItemTypeService;

        public CreateShopItemTypeCommandHandler(IShopItemTypeService shopItemTypeService)
        {
            this.shopItemTypeService = shopItemTypeService;
        }

        public async Task<IResult<bool>> Handle(CreateShopItemTypeCommand command, CancellationToken cancellationToken)
        {
            var shopItem = await shopItemTypeService.CreateShopItemTypeAsync(command, cancellationToken);
            return await Result<bool>.SuccessAsync(shopItem);
        }
    }
}
