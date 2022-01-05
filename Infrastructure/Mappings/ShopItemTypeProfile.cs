﻿using AutoMapper;
using LordOfTheHoney.Application.Features.ShopItemType.Queries.GetAllPaged;
using LordOfTheHoney.Application.Features.ShopItemType.Queries.GetById;
using LordOfTheHoney.Domain.Entities.Catalog;

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
        }
    }
}