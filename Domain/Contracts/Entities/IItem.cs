namespace LordOfTheHoney.Domain.Contracts.Entities
{
    public interface IItem
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Barcode { get; set; }

    }
}
