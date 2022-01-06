using System.Collections.Generic;

namespace LordOfTheHoney.Shared.Constants.Permission
{
    public static class PermissionModules
    {
        public static List<string> GeneratePermissionsForModule(string module)
        {
            return new List<string>()
            {
                $"Permissions.{module}.Create",
                $"Permissions.{module}.View",
                $"Permissions.{module}.Edit",
                $"Permissions.{module}.Delete",
                $"Permissions.{module}.DowloadFile",
            };
        }
        public static List<string> GetAllPermissionsModules()
        {
            return new List<string>()
            {
                Users,
                Roles,
                Messages,
                Log,
                Swagger,
                Home,
                Options,
                ShopItems,
                ShopItemTypes
            };
        }
        public const string Home = "Home";
        public const string Users = "Users";
        public const string Roles = "Roles";
        public const string Messages = "Messages";
        public const string Log = "Log";
        public const string Swagger = "Swagger";
        public const string Options = "Options";
        public const string ShopItems = "ShopItems";
        public const string ShopItemTypes = "ShopItemTypes";
    }
}