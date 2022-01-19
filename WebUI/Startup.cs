using LordOfTheHoney.Application.Configurations;
using LordOfTheHoney.Application.Extensions;
using LordOfTheHoney.Infrastructure.Extensions;
using LordOfTheHoney.WebUI.Extensions;
using LordOfTheHoney.WebUI.Filters;
using LordOfTheHoney.WebUI.Middlewares;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

namespace WebUI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var serviceProviderScope = services!.BuildServiceProvider()!.CreateScope();
            services.AddControllersWithViews(options =>
            {
                options.Filters.Add(new ApiExceptionFilterAttribute());
                options.Filters.Add(new AuthorizeFilter());
            });
            services.AddLazyCache();
            services.AddDatabase(Configuration);
            services.AddIdentity();
            services.AddJwtAuthentication(services.GetApplicationSettings(Configuration));
            services.AddCurrentUserService();
            services.AddApplicationLayer();
            services.AddApplicationServices();
            services.AddSharedInfrastructure(Configuration);
            services.RegisterSwagger();
            services.AddInfrastructureMappings();
            services.AddControllers().AddValidators();
            services.AddApiVersioning(config =>
            {
                config.DefaultApiVersion = new ApiVersion(1, 0);
                config.AssumeDefaultVersionWhenUnspecified = true;
                config.ReportApiVersions = true;
            });
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            //services.AddCors();
            //services.AddForwarding(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env,
            IOptions<AppConfiguration> appConfiguration, IMediator mediator)
        {
            app.UseExceptionHandling(env);
            app.UseHttpsRedirection();
            app.UseMiddleware<ErrorHandlerMiddleware>();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseCors(builder => builder.AllowAnyOrigin());
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints();
            app.ConfigureSwagger(false);

            app.Initialize(Configuration);

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
            //app.UseForwarding(Configuration);
        }
    }
}
