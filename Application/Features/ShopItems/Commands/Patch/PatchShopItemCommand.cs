using System.ComponentModel.DataAnnotations;
using LordOfTheHoney.Shared.Wrapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces.Services.Shop;
using FluentValidation;
using LordOfTheHoney.Application.Requests;
using Microsoft.AspNetCore.Http;

namespace LordOfTheHoney.Application.Features.ShopItems.Commands.Patch
{
    public partial class PatchShopItemCommand : IRequest<IResult<bool>>
    {
        public int Id { get; set; }

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

    public class PatchShopItemCommandValidator : AbstractValidator<PatchShopItemCommand>
    {
        public PatchShopItemCommandValidator()
        {
            RuleFor(v => v.Id).NotNull().WithMessage("Required");
            RuleFor(v => v.Cost).Must(BeOverZero).WithMessage("Shop item cost must be over zero"); ;
        }

        protected bool BeOverZero(decimal cost) => cost > 0;
    }

    internal class PatchShopItemCommandHandler : IRequestHandler<PatchShopItemCommand, IResult<bool>>
    {
        private readonly IShopItemService shopItemService;

        public PatchShopItemCommandHandler(IShopItemService shopItemService)
        {
            this.shopItemService = shopItemService;
        }

        public async Task<IResult<bool>> Handle(PatchShopItemCommand command, CancellationToken cancellationToken)
        {
            var result = await shopItemService.PatchShopItemAsync(command, cancellationToken);
            return await Result<bool>.SuccessAsync(result);
        }
    }
}
