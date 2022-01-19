using AutoMapper;
using LordOfTheHoney.Application.Features.ShopItemTypes.Commands.Create;
using LordOfTheHoney.Application.Features.ShopItemTypes.Queries.GetAllPaged;
using LordOfTheHoney.Application.Features.ShopItemTypes.Queries.GetById;
using LordOfTheHoney.Domain.Entities.Shop;

namespace LordOfTheHoney.Infrastructure.Mappings
{
    public class ShopItemTypeProfile : Profile
    {
        public ShopItemTypeProfile()
        {
            CreateMap<ShopItemType, GetShopItemTypeByIdResponse>()
            .ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dst => dst.Description, opt => opt.MapFrom(src => src.Description));

            CreateMap<ShopItemType, GetAllShopItemTypesResponse>()
            .ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dst => dst.Description, opt => opt.MapFrom(src => src.Description));

            CreateMap<ShopItemType, CreateShopItemTypeCommand>()
            .ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dst => dst.Description, opt => opt.MapFrom(src => src.Description));

            CreateMap<CreateShopItemTypeCommand, ShopItemType>()
            .ForMember(dst => dst.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dst => dst.Description, opt => opt.MapFrom(src => src.Description)).ReverseMap();
        }
    }
}
