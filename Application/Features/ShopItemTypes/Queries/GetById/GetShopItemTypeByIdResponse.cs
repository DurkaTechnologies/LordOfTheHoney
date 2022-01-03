namespace LordOfTheHoney.Application.Features.ShopItemTypes.Queries.GetById
{
    public class GetShopItemTypeByIdResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Tax { get; set; }
        public string Description { get; set; }
    }
}