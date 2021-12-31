using Domain.Entities.Catalog;
using LordOfTheHoney.Domain.Contracts;
using System.Collections.Generic;

namespace LordOfTheHoney.Domain.Entities.Catalog
{
    public class ItemType : AuditableEntity<int>
    {
        public string Name { get; set; }

        //Naviagtion props 
        public ICollection<Item> Items { get; set; }
    }
}
