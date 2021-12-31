using LordOfTheHoney.Domain.Contracts;
using LordOfTheHoney.Domain.Contracts.Entities;
using LordOfTheHoney.Domain.Entities.Catalog;
using System.ComponentModel.DataAnnotations.Schema;

namespace LordOfTheHoney.Domain.Entities.Catalog
{
    public class Item : AuditableEntity<int>, IItem
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Barcode { get; set; }

        [Column(TypeName = "text")]
        public string ImageDataURL { get; set; }

        //Foreign keys
        public int ItemTypeId { get; set; }

        //Virtual props
        public ItemType ItemType { get; set; }

    }
}
