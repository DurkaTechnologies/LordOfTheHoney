using System.ComponentModel.DataAnnotations;
using LordOfTheHoney.Shared.Wrapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces.Services.Shop;
using FluentValidation;
using LordOfTheHoney.Application.Requests;
using Microsoft.AspNetCore.Http;

namespace LordOfTheHoney.Application.Features.ShopItemTypes.Commands.Patch
{
    public partial class PatchShopItemTypeCommand : IRequest<IResult<bool>>
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public string PicturePath { get; set; }

        public UploadRequest UploadRequest { get; set; }
    }

    public class PatchShopItemTypeCommandValidator : AbstractValidator<PatchShopItemTypeCommand>
    {
        public PatchShopItemTypeCommandValidator()
        {
            RuleFor(v => v.Id).NotNull();
        }
    }

    internal class PatchShopItemCommandHandler : IRequestHandler<PatchShopItemTypeCommand, IResult<bool>>
    {
        private readonly IShopItemTypeService shopItemTypeService;

        public PatchShopItemCommandHandler(IShopItemTypeService shopItemTypeService)
        {
            this.shopItemTypeService = shopItemTypeService;
        }

        public async Task<IResult<bool>> Handle(PatchShopItemTypeCommand command, CancellationToken cancellationToken)
        {
            var result = await shopItemTypeService.PatchShopItemTypeAsync(command, cancellationToken);
            return await Result<bool>.SuccessAsync(result);
        }
    }
}
