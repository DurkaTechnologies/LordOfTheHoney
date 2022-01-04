using LordOfTheHoney.Application.Exceptions;
using LordOfTheHoney.Shared.Wrapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using System.Linq.Expressions;
using FluentValidation.Results;
using System;

namespace LordOfTheHoney.Application.Extensions
{
    public static class QueryableExtensions
    {
        public static async Task<PaginatedResult<T>> ToPaginatedListAsync<T>(this IQueryable<T> source, int pageNumber, int pageSize, CancellationToken cancellationToken = default(CancellationToken)) where T : class
        {
            if (source == null)
                throw new ApiException();

            pageNumber = pageNumber == 0 ? 1 : pageNumber;
            pageSize = pageSize == 0 ? 10 : pageSize;
            int count = await source.CountAsync(cancellationToken);
            pageNumber = pageNumber <= 0 ? 1 : pageNumber;

            List<T> items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync(cancellationToken);

            return PaginatedResult<T>.Success(items, count, pageNumber, pageSize);
        }

        public static IQueryable<T> OrderBy<T>(this IQueryable<T> source, string? sortModels)
        {
            if (sortModels == null) return source;

            return source.OrderBy(sortModels.Split(","));
        }

        public static IQueryable<T> OrderBy<T>(this IQueryable<T> source, IEnumerable<string> sortModels)
        {
            if (sortModels == null) return source;
            var expression = source.Expression;
            int count = 0;

            List<ValidationFailure>? validationFailures = null;

            foreach (var item in sortModels)
            {
                if (!string.IsNullOrEmpty(item))
                {
                    try
                    {
                        var isDescending = item.StartsWith("-");
                        var name = isDescending ? item.Substring(1, item.Length - 1) : item;

                        var parameter = Expression.Parameter(typeof(T), "x");
                        MemberExpression selector;

                        if (name.Contains("."))
                        {
                            var parts = name.Split('.');
                            var selector0 = Expression.PropertyOrField(parameter, parts[0]);
                            selector = Expression.PropertyOrField(selector0, parts[1]);
                        }
                        else
                        {
                            selector = Expression.PropertyOrField(parameter, name);
                        }

                        var method = isDescending
                            ? (count == 0 ? "OrderByDescending" : "ThenByDescending")
                            : (count == 0 ? "OrderBy" : "ThenBy");

                        expression = Expression.Call(typeof(Queryable), method,
                            new[] { source.ElementType, selector.Type },
                            expression,
                            Expression.Quote(Expression.Lambda(selector, parameter)));

                        count++;
                    }
                    catch (Exception)
                    {
                        validationFailures ??= new List<ValidationFailure>();
                        validationFailures.Add(new ValidationFailure(item, "Invalid Sorting Field"));
                    }
                }
            }

            if (validationFailures != null)
                throw new Interfaces.Exceptions.ValidationException(validationFailures);

            return count > 0 ? source.Provider.CreateQuery<T>(expression) : source;
        }

    }
}
