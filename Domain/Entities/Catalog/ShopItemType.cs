using LordOfTheHoney.Domain.Contracts;
using System.Collections.Generic;

namespace LordOfTheHoney.Domain.Entities.Catalog
{
    public class ShopItemType : AuditableEntity<int>
    {
        public ShopItemType()
        {
            ShopItems =  new HashSet<ShopItem>();
        }

        public string Name { get; set; }

        public ICollection<ShopItem> ShopItems { get; set; }
    }
}
