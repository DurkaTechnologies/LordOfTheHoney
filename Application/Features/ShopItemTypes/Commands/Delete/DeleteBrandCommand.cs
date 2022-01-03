using LordOfTheHoney.Application.Interfaces.Repositories;
using LordOfTheHoney.Domain.Entities.Catalog;
using LordOfTheHoney.Shared.Wrapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using LordOfTheHoney.Shared.Constants.Application;

namespace LordOfTheHoney.Application.Features.ShopItemTypes.Commands.Delete
{
    public class DeleteShopItemTypeCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
    }

    //internal class DeleteShopItemTypeCommandHandler : IRequestHandler<DeleteShopItemTypeCommand, Result<int>>
    //{
    //    private readonly IShopItemRepository _productRepository;
    //    private readonly IUnitOfWork<int> _unitOfWork;

    //    public DeleteShopItemTypeCommandHandler(IUnitOfWork<int> unitOfWork, IShopItemRepository productRepository)
    //    {
    //        _unitOfWork = unitOfWork;
    //        _productRepository = productRepository;
    //    }

    //    //public async Task<Result<int>> Handle(DeleteShopItemTypeCommand command, CancellationToken cancellationToken)
    //    //{
    //    //    var isShopItemTypeUsed = await _productRepository.IsShopItemTypeUsed(command.Id);
    //    //    if (!isShopItemTypeUsed)
    //    //    {
    //    //        var brand = await _unitOfWork.Repository<ShopItemType>().GetByIdAsync(command.Id);
    //    //        if (brand != null)
    //    //        {
    //    //            await _unitOfWork.Repository<ShopItemType>().DeleteAsync(brand);
    //    //            await _unitOfWork.CommitAndRemoveCache(cancellationToken, ApplicationConstants.Cache.GetAllShopItemTypesCacheKey);
    //    //            return await Result<int>.SuccessAsync(brand.Id, "ShopItemType Deleted");
    //    //        }
    //    //        else
    //    //        {
    //    //            return await Result<int>.FailAsync("ShopItemType Not Found!");
    //    //        }
    //    //    }
    //    //    else
    //    //    {
    //    //        return await Result<int>.FailAsync("Deletion Not Allowed");
    //    //    }
    //    //}
    //}
}