using AutoMapper;
using LordOfTheHoney.Application.Responses.Identity;
using Microsoft.AspNetCore.Identity;

namespace LordOfTheHoney.Infrastructure.Mappings
{
    public class RoleProfile : Profile
    {
        public RoleProfile()
        {
            CreateMap<RoleResponse, IdentityRole>().ReverseMap();
        }
    }
}
