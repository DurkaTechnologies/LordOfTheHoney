using System.ComponentModel.DataAnnotations;

namespace LordOfTheHoney.Application.Requests.Identity
{
    public class RegisterRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string UserName { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; }

        public bool ActivateUser { get; set; } = false;

        public bool AutoConfirmEmail { get; set; } = false;
    }
}
