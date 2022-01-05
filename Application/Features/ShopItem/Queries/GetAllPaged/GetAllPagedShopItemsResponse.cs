namespace LordOfTheHoney.Application.Features.ShopItem.Queries.GetAllPaged
{
    public class GetAllPagedShopItemsResponse
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Barcode { get; set; }

        public string Description { get; set; }

        public string PicturePath { get; set; }

        public decimal Cost { get; set; }

        public int ShopItemTypeId { get; set; }
    }
}
