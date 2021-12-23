using System.ComponentModel.DataAnnotations;

namespace LordOfTheHoney.Application.Requests.Identity
{
    public class UpdateProfileRequest
    {
        public string Email { get; set; }
    }
}
