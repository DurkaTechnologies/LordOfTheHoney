using Microsoft.Extensions.Logging;
using LordOfTheHoney.Application.Specifications.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LordOfTheHoney.Domain.Entities.Shop;

namespace LordOfTheHoney.Application.Specifications
{
    public class ShopItemFilterSpecification : Specification<ShopItem>
    {
        public ShopItemFilterSpecification(string searchString)
        {
            Includes.Add(a => a.ShopItemType);
            if (!string.IsNullOrEmpty(searchString))
            {
                Criteria = p => p.Id != 0 && (string.IsNullOrWhiteSpace(searchString) ||
                p.ShopItemType.Name.Contains(searchString) ||
                p.ShopItemTypeId.ToString().Contains(searchString));
            }
            else
                Criteria = p => p.Id != 0;
        }
    }
}
