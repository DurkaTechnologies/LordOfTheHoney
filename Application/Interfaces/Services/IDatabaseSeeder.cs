using System.Threading.Tasks;

namespace LordOfTheHoney.Application.Interfaces.Services
{
    public interface IDatabaseSeeder
    {
        Task InitializeAsync();
    }
}
