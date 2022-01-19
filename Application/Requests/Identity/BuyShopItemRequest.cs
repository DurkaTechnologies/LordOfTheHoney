using LordOfTheHoney.Application.Models.Shop;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LordOfTheHoney.Application.Requests.Identity
{
    public class BuyShopItemRequest
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public IList<CartItem> CartItems { get; set; }
    }
}
