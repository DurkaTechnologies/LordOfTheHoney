using System.Collections.Generic;

namespace LordOfTheHoney.Application.Responses.Identity
{
    public class GetAllUsersResponse
    {
        public IEnumerable<UserResponse> Users { get; set; }
    }
}
