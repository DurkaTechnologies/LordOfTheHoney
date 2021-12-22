using LordOfTheHoney.Application.Interfaces.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace LordOfTheHoney.WebUI.Extensions
{
    internal static class ApplicationBuilderExtensions
    {
        internal static IApplicationBuilder Initialize(this IApplicationBuilder app, Microsoft.Extensions.Configuration.IConfiguration _configuration)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();

            var initializers = serviceScope.ServiceProvider.GetServices<IDatabaseSeeder>();

            foreach (var initializer in initializers)
            {
                initializer.Initialize();
            }

            return app;
        }
    }
}