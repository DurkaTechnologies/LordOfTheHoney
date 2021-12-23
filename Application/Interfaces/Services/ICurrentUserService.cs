using LordOfTheHoney.Application.Interfaces.Common;

namespace LordOfTheHoney.Application.Interfaces.Services
{
    public interface ICurrentUserService : IService
    {
        string UserId { get; }
    }
}
