using Domain.Contracts;
using LordOfTheHoney.Domain.Entities.Shop;

namespace LordOfTheHoney.Domain.Entities.Shop
{
    public class StorageItem : Entity<int>
    {
        public string ApplicationUserId { get; set; }

        public int Quantity { get; set; }

        public int ShopItemId { get; set; }

        public virtual ShopItem ShopItem { get; set; }
    }
}
