using AutoMapper;
using LordOfTheHoney.Application.Responses.Identity;
using LordOfTheHoney.Infrastructure.Models.Identity;

namespace LordOfTheHoney.Infrastructure.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserResponse, ApplicationUser>()
                .ReverseMap();

            CreateMap<ApplicationUser, UserResponse>()
                .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dst => dst.UserName, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dst => dst.BeeCoins, opt => opt.MapFrom(src => src.BeeCoins))
                .ForMember(dst => dst.IsActive, opt => opt.MapFrom(src => src.IsActive))
                .ForMember(dst => dst.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dst => dst.EmailConfirmed, opt => opt.MapFrom(src => src.EmailConfirmed));
        }
    }
}
