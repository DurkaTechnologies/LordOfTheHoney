using Application.Interfaces.Services.Shop;
using LordOfTheHoney.Shared.Wrapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace LordOfTheHoney.Application.Features.ShopItem.Commands.Delete
{
    public class DeleteShopItemCommand : IRequest<IResult<bool>>
    {
        public DeleteShopItemCommand(int id)
        {
            Id = id;
        }

        public int Id { get; set; }
    }

    internal class DeleteShopItemCommandHandler : IRequestHandler<DeleteShopItemCommand, IResult<bool>>
    {
        private readonly IShopItemService shopItemService;

        public DeleteShopItemCommandHandler(IShopItemService shopItemService)
        {
            this.shopItemService = shopItemService;
        }

        public async Task<IResult<bool>> Handle(DeleteShopItemCommand command, CancellationToken cancellationToken)
        {
            var result = await shopItemService.DeleteShopItemByIdAsync(command.Id, cancellationToken);
            return await Result<bool>.SuccessAsync(result);
        }
    }
}
