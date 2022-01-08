using LordOfTheHoney.Domain.Contracts;

namespace Domain.Contracts
{
    public abstract class Entity<TId> : IEntity<TId>
    {
        public TId Id { get; set; }
    }

    public abstract class Entity : IEntity
    {
        public int Id { get; set; }
    }
}
