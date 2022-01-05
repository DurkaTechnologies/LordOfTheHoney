using Application.Interfaces.Services.Shop;
using LordOfTheHoney.Shared.Wrapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace LordOfTheHoney.Application.Features.ShopItemType.Commands.Delete
{
    public class DeleteShopItemTypeCommand : IRequest<IResult<bool>>
    {
        public DeleteShopItemTypeCommand(int id)
        {
            Id = id;
        }

        public int Id { get; set; }
    }

    internal class DeleteShopItemTypeCommandHandler : IRequestHandler<DeleteShopItemTypeCommand, IResult<bool>>
    {
        private readonly IShopItemTypeService shopItemTypeService;

        public DeleteShopItemTypeCommandHandler(IShopItemTypeService shopItemTypeService)
        {
            this.shopItemTypeService = shopItemTypeService;
        }

        public async Task<IResult<bool>> Handle(DeleteShopItemTypeCommand command, CancellationToken cancellationToken)
        {
            var result = await shopItemTypeService.DeleteShopItemTypeByIdAsync(command.Id, cancellationToken);
            return await Result<bool>.SuccessAsync(result);
        }
    }
}
