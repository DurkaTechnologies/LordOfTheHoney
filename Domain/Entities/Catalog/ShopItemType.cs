using LordOfTheHoney.Domain.Contracts;
using System.Collections.Generic;

namespace LordOfTheHoney.Domain.Entities.Catalog
{
    public class ShopItemType : AuditableEntity<int>
    {
        public ShopItemType()
        {
            Items =  new HashSet<ShopItem>();
        }

        public string Name { get; set; }

        public ICollection<ShopItem> Items { get; set; }
    }
}
