using LordOfTheHoney.Application.Interfaces.Repositories;
using LordOfTheHoney.Domain.Entities.Shop;
using LordOfTheHoney.Shared.Wrapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace LordOfTheHoney.Application.Features.ShopItems.Queries.GetShopItemImage
{
    public class GetShopItemImageQuery : IRequest<Result<string>>
    {
        public int Id { get; set; }

        public GetShopItemImageQuery(int productId)
        {
            Id = productId;
        }
    }

    internal class GetShopItemImageQueryHandler : IRequestHandler<GetShopItemImageQuery, Result<string>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetShopItemImageQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<string>> Handle(GetShopItemImageQuery request, CancellationToken cancellationToken)
        {
            var data = await _unitOfWork.Repository<ShopItem>().Entities.Where(s => s.Id == request.Id).Select(a => a.PicturePath).FirstOrDefaultAsync(cancellationToken);
            return await Result<string>.SuccessAsync(data: data);
        }
    }
}
