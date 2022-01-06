using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace LordOfTheHoney.Shared.Constants.Permission
{
    public static class Permissions
    {
        public static class Swagger
        {
            public const string View = "Permissions.Swagger.View";
        }

        public static class Messages
        {
            public const string View = "Permissions.Messages.View";
            public const string Create = "Permissions.Messages.Create";
            public const string Edit = "Permissions.Messages.Edit";
            public const string Delete = "Permissions.Messages.Delete";
        }

        public static class ShopItems
        {
            public const string View = "Permissions.ShopItems.View";
            public const string Create = "Permissions.ShopItems.Create";
            public const string Edit = "Permissions.ShopItems.Edit";
            public const string Delete = "Permissions.ShopItems.Delete";
            public const string Search = "Permissions.ShopItems.Search";
        }

        public static class ShopItemTypes
        {
            public const string View = "Permissions.ShopItemTypes.View";
            public const string Create = "Permissions.ShopItemTypes.Create";
            public const string Edit = "Permissions.ShopItemTypes.Edit";
            public const string Delete = "Permissions.ShopItemTypes.Delete";
            public const string Search = "Permissions.ShopItemTypes.Search";
        }

        public static class Documents
        {
            public const string View = "Permissions.Documents.View";
            public const string Create = "Permissions.Documents.Create";
            public const string Edit = "Permissions.Documents.Edit";
            public const string Delete = "Permissions.Documents.Delete";
            public const string Search = "Permissions.Documents.Search";
        }

        public static class DocumentTypes
        {
            public const string View = "Permissions.DocumentTypes.View";
            public const string Create = "Permissions.DocumentTypes.Create";
            public const string Edit = "Permissions.DocumentTypes.Edit";
            public const string Delete = "Permissions.DocumentTypes.Delete";
            public const string Export = "Permissions.DocumentTypes.Export";
            public const string Search = "Permissions.DocumentTypes.Search";
        }

        public static class DocumentExtendedAttributes
        {
            public const string View = "Permissions.DocumentExtendedAttributes.View";
            public const string Create = "Permissions.DocumentExtendedAttributes.Create";
            public const string Edit = "Permissions.DocumentExtendedAttributes.Edit";
            public const string Delete = "Permissions.DocumentExtendedAttributes.Delete";
            public const string Export = "Permissions.DocumentExtendedAttributes.Export";
            public const string Search = "Permissions.DocumentExtendedAttributes.Search";
        }

        public static class Users
        {
            public const string View = "Permissions.Users.View";
            public const string Create = "Permissions.Users.Create";
            public const string Edit = "Permissions.Users.Edit";
            public const string Delete = "Permissions.Users.Delete";
            public const string Export = "Permissions.Users.Export";
            public const string Search = "Permissions.Users.Search";
        }

        public static class Roles
        {
            public const string View = "Permissions.Roles.View";
            public const string Create = "Permissions.Roles.Create";
            public const string Edit = "Permissions.Roles.Edit";
            public const string Delete = "Permissions.Roles.Delete";
            public const string Search = "Permissions.Roles.Search";
        }

        public static class RoleClaims
        {
            public const string View = "Permissions.RoleClaims.View";
            public const string Create = "Permissions.RoleClaims.Create";
            public const string Edit = "Permissions.RoleClaims.Edit";
            public const string Delete = "Permissions.RoleClaims.Delete";
            public const string Search = "Permissions.RoleClaims.Search";
        }

        public static class Communication
        {
            public const string Chat = "Permissions.Communication.Chat";
        }

        public static class AuditTrails
        {
            public const string View = "Permissions.AuditTrails.View";
            public const string Export = "Permissions.AuditTrails.Export";
            public const string Search = "Permissions.AuditTrails.Search";
        }
       /// <summary>
       /// Returns a list of Permissions.
       /// </summary>
       /// <returns></returns>
        public static List<string> GetRegisteredPermissions()
        {
            var permssions = new List<string>();
            foreach (var prop in typeof(Permissions).GetNestedTypes().SelectMany(c => c.GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)))
            {
                var propertyValue = prop.GetValue(null);
                if (propertyValue is not null)
                    permssions.Add(propertyValue.ToString());
            }
            return permssions;
        }
    }
}
