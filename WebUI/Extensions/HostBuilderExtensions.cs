﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace LordOfTheHoney.WebUI.Extensions
{
    internal static class HostBuilderExtensions
    {
        internal static IHostBuilder UseSerilog(this IHostBuilder builder)
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.Development.json")
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables()
                .Build();

            return builder;
        }
    }
}
