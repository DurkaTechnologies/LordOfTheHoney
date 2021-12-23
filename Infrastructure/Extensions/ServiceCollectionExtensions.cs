using System;
using System.Linq;
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

        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            return services
                .AddTransient(typeof(IRepositoryAsync<,>), typeof(RepositoryAsync<,>))
                .AddTransient(typeof(IUnitOfWork<>), typeof(UnitOfWork<>));
        }
    }
}