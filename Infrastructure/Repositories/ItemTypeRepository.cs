using LordOfTheHoney.Application.Interfaces.Repositories;
using LordOfTheHoney.Domain.Entities.Catalog;

namespace Infrastructure.Repositories
{
    internal class ItemTypeRepository
    {
        private readonly IRepositoryAsync<Item, int> repository;

        public ItemTypeRepository(IRepositoryAsync<Item, int> repository)
        {
            this.repository = repository;
        }
    }
}
