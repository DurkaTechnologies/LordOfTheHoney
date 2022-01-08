using Domain.Contracts;
using LordOfTheHoney.Domain.Contracts;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace LordOfTheHoney.Application.Interfaces.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        IRepositoryAsync<T> Repository<T>() where T : AuditableEntity;
        IRepositoryAsync<T> RepositoryClassic<T>() where T : Entity;

        Task<int> Commit(CancellationToken cancellationToken = default);

        Task<int> CommitAndRemoveCache(CancellationToken cancellationToken, params string[] cacheKeys);

        Task Rollback();
    }
}
