using LordOfTheHoney.Domain.Contracts;
using LordOfTheHoney.Domain.Contracts.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace LordOfTheHoney.Domain.Entities.Catalog
{
    public class ShopItem : AuditableEntity<int>, IItem
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string Barcode { get; set; }

        public string PicturePath { get; set; }

        public decimal Cost { get; set; }

        public int ShopItemTypeId { get; set; }

        public ShopItemType ShopItemType { get; set; }
    }
}
