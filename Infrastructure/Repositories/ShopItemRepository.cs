using LordOfTheHoney.Application.Interfaces.Repositories;
using LordOfTheHoney.Domain.Entities.Shop;

namespace LordOfTheHoney.Infrastructure.Repositories
{
    internal class ShopItemRepository : IShopItemRepository
    {
        private readonly IRepositoryAsync<ShopItem, int> repository;

        public ShopItemRepository(IRepositoryAsync<ShopItem, int> repository)
        {
            this.repository = repository;
        }
    }
}
