using LordOfTheHoney.Application.Interfaces.Repositories;
using LordOfTheHoney.Domain.Entities.Catalog;

namespace LordOfTheHoney.Infrastructure.Repositories
{
    internal class ItemRepository : IItemRepository
    {
        private readonly IRepositoryAsync<Item, int> repository;

        public ItemRepository(IRepositoryAsync<Item, int> repository)
        {
            this.repository = repository;
        }
    }
}
