namespace LordOfTheHoney.Application.Features.ShopItem.Queries.GetById
{
    public class GetShopItemByIdResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Barcode { get; set; }
        public string Description { get; set; }

        public int ShopItemTypeId { get; set; }
    }
}