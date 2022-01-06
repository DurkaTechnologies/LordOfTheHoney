using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using LordOfTheHoney.Application.Interfaces.Repositories;
using LordOfTheHoney.Infrastructure.Repositories;

namespace LordOfTheHoney.Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddInfrastructureMappings(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
        }
    }
}
