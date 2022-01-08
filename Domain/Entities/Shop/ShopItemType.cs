using LordOfTheHoney.Domain.Contracts;
using System.Collections.Generic;

namespace LordOfTheHoney.Domain.Entities.Shop
{
    public class ShopItemType : AuditableEntity
    {
        public ShopItemType()
        {
            ShopItems =  new HashSet<ShopItem>();
        }

        public string Name { get; set; }

        public string Description { get; set; }

        public string PicturePath { get; set; }

        public ICollection<ShopItem> ShopItems { get; set; }
    }
}
