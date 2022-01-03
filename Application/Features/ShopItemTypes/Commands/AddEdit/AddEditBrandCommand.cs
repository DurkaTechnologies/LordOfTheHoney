using System.ComponentModel.DataAnnotations;
using AutoMapper;
using LordOfTheHoney.Application.Interfaces.Repositories;
using LordOfTheHoney.Domain.Entities.Catalog;
using LordOfTheHoney.Shared.Wrapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using LordOfTheHoney.Shared.Constants.Application;

namespace LordOfTheHoney.Application.Features.ShopItemTypes.Commands.AddEdit
{
    public partial class AddEditShopItemTypeCommand : IRequest<Result<int>>
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Tax { get; set; }
    }

    internal class AddEditShopItemTypeCommandHandler : IRequestHandler<AddEditShopItemTypeCommand, Result<int>>
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork<int> _unitOfWork;

        public AddEditShopItemTypeCommandHandler(IUnitOfWork<int> unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Result<int>> Handle(AddEditShopItemTypeCommand command, CancellationToken cancellationToken)
        {
            if (command.Id == 0)
            {
                var brand = _mapper.Map<ShopItemType>(command);
                await _unitOfWork.Repository<ShopItemType>().AddAsync(brand);
                await _unitOfWork.CommitAndRemoveCache(cancellationToken, ApplicationConstants.Cache.GetAllShopItemTypesCacheKey);
                return await Result<int>.SuccessAsync(brand.Id, "ShopItemType Saved");
            }
            else
            {
                var brand = await _unitOfWork.Repository<ShopItemType>().GetByIdAsync(command.Id);
                if (brand != null)
                {
                    brand.Name = command.Name ?? brand.Name;
                    await _unitOfWork.Repository<ShopItemType>().UpdateAsync(brand);
                    await _unitOfWork.CommitAndRemoveCache(cancellationToken, ApplicationConstants.Cache.GetAllShopItemTypesCacheKey);
                    return await Result<int>.SuccessAsync(brand.Id, "ShopItemType Updated");
                }
                else
                {
                    return await Result<int>.FailAsync("ShopItemType Not Found!");
                }
            }
        }
    }
}