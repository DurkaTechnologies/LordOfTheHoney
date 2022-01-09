using System.ComponentModel;

namespace LordOfTheHoney.Application.Enums
{
    public enum UploadType : byte
    {
        [Description(@"Images\ShopItems")]
        ShopItem,

        [Description(@"Images\ShopItemTypes")]
        ShopItemType,

        [Description(@"Images\ProfilePictures")]
        ProfilePicture,

        [Description(@"Documents")]
        Document
    }
}
