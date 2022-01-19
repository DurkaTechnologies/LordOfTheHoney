using LordOfTheHoney.Application.Interfaces.Services;
using LordOfTheHoney.Infrastructure.Contexts;
using LordOfTheHoney.Infrastructure.Helpers;
using LordOfTheHoney.Infrastructure.Models.Identity;
using LordOfTheHoney.Shared.Constants.Permission;
using LordOfTheHoney.Shared.Constants.Role;
using LordOfTheHoney.Shared.Constants.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace LordOfTheHoney.Infrastructure
{
    public class DatabaseSeeder : IDatabaseSeeder
    {
        private readonly ILogger<DatabaseSeeder> _logger;
        private readonly IdentityContext _db;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public DatabaseSeeder(
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager,
            IdentityContext db,
            ILogger<DatabaseSeeder> logger)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _db = db;
            _logger = logger;
        }

        public async Task InitializeAsync()
        {
            await AddAdministratorAsync();
            await AddBasicUserAsync();
            await _db.SaveChangesAsync();
        }

        private async Task AddAdministratorAsync()
        {
            await Task.Run(async () =>
            {
                //Check if Role Exists
                var adminRole = new ApplicationRole(RoleConstants.AdministratorRole, "Administrator role with full permissions");
                var adminRoleInDb = await _roleManager.FindByNameAsync(RoleConstants.AdministratorRole);
                if (adminRoleInDb == null)
                {
                    await _roleManager.CreateAsync(adminRole);
                    _logger.LogInformation("Seeded Administrator Role.");
                }
                //Check if User Exists
                var superUser = new ApplicationUser
                {
                    Email = "amongusbee@amongusbee.com",
                    UserName = "durkabee",
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    BeeCoins = 79228162514264,
                    CreatedOn = DateTime.Now,
                    IsActive = true
                };
                var superUserInDb = await _userManager.FindByEmailAsync(superUser.Email);
                if (superUserInDb == null)
                {
                    await _userManager.CreateAsync(superUser, UserConstants.DefaultPassword);
                    var result = await _userManager.AddToRoleAsync(superUser, RoleConstants.AdministratorRole);
                    if (result.Succeeded)
                    {
                        _logger.LogInformation("Seeded Default SuperAdmin User.");
                    }
                    else
                    {
                        foreach (var error in result.Errors)
                        {
                            _logger.LogError(error.Description);
                        }
                    }
                }
                foreach (var permission in Permissions.GetRegisteredPermissions())
                {
                    await _roleManager.AddPermissionClaimAsync(adminRoleInDb, permission);
                }
            });
        }

        private async Task AddBasicUserAsync()
        {
            await Task.Run(async () =>
            {
                //Check if Role Exists
                var basicRole = new ApplicationRole(RoleConstants.BasicRole, "Basic role with default permissions");
                var basicRoleInDb = await _roleManager.FindByNameAsync(RoleConstants.BasicRole);
                if (basicRoleInDb == null)
                {
                    await _roleManager.CreateAsync(basicRole);
                    _logger.LogInformation("Seeded Basic Role.");
                }
                //Check if User Exists
                var basicUser = new ApplicationUser
                {
                    Email = "john@amongusbee.com",
                    UserName = "johndoe",
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    CreatedOn = DateTime.Now,
                    BeeCoins = 200,
                    IsActive = true
                };
                var basicUserInDb = await _userManager.FindByEmailAsync(basicUser.Email);
                if (basicUserInDb == null)
                {
                    await _userManager.CreateAsync(basicUser, UserConstants.DefaultPassword);
                    var result = await _userManager.AddToRoleAsync(basicUser, RoleConstants.BasicRole);
                    _logger.LogInformation("Seeded User with Basic Role.");

                    if (result.Succeeded)
                    {
                        await _roleManager.AddPermissionClaimAsync(basicRole, PermissionModules.Messages);
                        await _roleManager.AddPermissionClaimAsync(basicRole, PermissionModules.Swagger);
                        await _roleManager.AddPermissionClaimAsync(basicRole, PermissionModules.ShopItems);
                        await _roleManager.AddPermissionClaimAsync(basicRole, PermissionModules.ShopItemTypes);
                        await _roleManager.AddPermissionClaimAsync(basicRole, PermissionModules.Home);
                        await _roleManager.AddPermissionClaimAsync(basicRole, PermissionModules.Options);
                    }
                }
            });
        }
    }
}
