using AutoMapper;
using LordOfTheHoney.Application.Features.ShopItems.Commands.Create;
using LordOfTheHoney.Application.Features.ShopItems.Queries.GetAllPaged;
using LordOfTheHoney.Application.Features.ShopItems.Queries.GetById;
using LordOfTheHoney.Application.Requests.Identity;
using LordOfTheHoney.Domain.Entities.Shop;

namespace LordOfTheHoney.Infrastructure.Mappings
{
    public class ShopItemProfile : Profile
    {
        public ShopItemProfile()
        {
            CreateMap<ShopItem, GetShopItemByIdResponse>()
            .ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dst => dst.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dst => dst.Barcode, opt => opt.MapFrom(src => src.Barcode))
            .ForMember(dst => dst.PicturePath, opt => opt.MapFrom(src => src.PicturePath))
            .ForMember(dst => dst.Cost, opt => opt.MapFrom(src => src.Cost))
            .ForMember(dst => dst.ShopItemTypeId, opt => opt.MapFrom(src => src.ShopItemTypeId));

            CreateMap<ShopItem, GetAllPagedShopItemsResponse>()
            .ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dst => dst.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dst => dst.Barcode, opt => opt.MapFrom(src => src.Barcode))
            .ForMember(dst => dst.PicturePath, opt => opt.MapFrom(src => src.PicturePath))
            .ForMember(dst => dst.Cost, opt => opt.MapFrom(src => src.Cost))
            .ForMember(dst => dst.ShopItemTypeId, opt => opt.MapFrom(src => src.ShopItemTypeId));

            CreateMap<CreateShopItemCommand, ShopItem>()
            .ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dst => dst.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dst => dst.Barcode, opt => opt.MapFrom(src => src.Barcode))
            .ForMember(dst => dst.PicturePath, opt => opt.MapFrom(src => src.PicturePath))
            .ForMember(dst => dst.Cost, opt => opt.MapFrom(src => src.Cost))
            .ForMember(dst => dst.ShopItemTypeId, opt => opt.MapFrom(src => src.ShopItemTypeId)).ReverseMap();
        }
    }
}
