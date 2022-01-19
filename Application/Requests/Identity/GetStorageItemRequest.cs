namespace LordOfTheHoney.Application.Requests.Identity
{
    public class GetStorageItemRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ShopItemTypeId { get; set; }
        public string PicturePath { get; set; }
        public string Barcode { get; set; }
        public int Qunatity { get; set; }
    }
}
