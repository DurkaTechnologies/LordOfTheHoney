using System.ComponentModel.DataAnnotations;

namespace LordOfTheHoney.Application.Requests.Identity
{
    public class GetDeleteItemFromStorage
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public int ShopItemId { get; set; }
        
        [Required]
        public int Quantity { get; set; }
    }
}
