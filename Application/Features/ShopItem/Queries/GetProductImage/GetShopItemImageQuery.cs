using LordOfTheHoney.Application.Interfaces.Repositories;
using LordOfTheHoney.Domain.Entities.Catalog;
using LordOfTheHoney.Shared.Wrapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace LordOfTheHoney.Application.Features.ShopItem.Queries.GetShopItemImage
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
        private readonly IUnitOfWork<int> _unitOfWork;

        public GetShopItemImageQueryHandler(IUnitOfWork<int> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<string>> Handle(GetShopItemImageQuery request, CancellationToken cancellationToken)
        {
            var data = await _unitOfWork.Repository<ShopItem>().Entities.Where(p => p.Id == request.Id).Select(a => a.ImageDataURL).FirstOrDefaultAsync(cancellationToken);
            return await Result<string>.SuccessAsync(data: data);
        }
    }
}