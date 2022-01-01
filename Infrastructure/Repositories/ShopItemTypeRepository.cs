using LordOfTheHoney.Application.Interfaces.Repositories;
using LordOfTheHoney.Domain.Entities.Catalog;

namespace Infrastructure.Repositories
{
    internal class ShopItemTypeRepository
    {
        private readonly IRepositoryAsync<ShopItem, int> repository;

        public ShopItemTypeRepository(IRepositoryAsync<ShopItem, int> repository)
        {
            this.repository = repository;
        }
    }
}
