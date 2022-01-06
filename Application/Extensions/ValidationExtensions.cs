using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace LordOfTheHoney.Application.Extensions
{
    public static class ValidationExtensions
    {
        public static IRuleBuilderOptions<T, TProperty> In<T, TProperty>(this IRuleBuilder<T, TProperty> ruleBuilder, params TProperty[] validOptions)
        {
            string formatted;
            if (validOptions == null || validOptions.Length == 0)
            {
                throw new ArgumentException("At least one valid option is expected", nameof(validOptions));
            }
            else if (validOptions.Length == 1)
            {
                formatted = validOptions[0].ToString();
            }
            else
            {
                // format like: option1, option2 or option3
                formatted = $"{string.Join(", ", validOptions.Select(vo => vo.ToString()).ToArray(), 0, validOptions.Length - 1)} " +
                    $"or {validOptions.Last()}";
            }

            return ruleBuilder
                .Must(validOptions.Contains)
                .WithMessage($"{{PropertyName}} must be one of these values: {formatted}");
        }
        public static object Validate<TModel>(this TModel model, 
            Expression<Func<TModel, object>> propertyExpression = null)
        {
            var type = typeof(TModel).Assembly.GetTypes().FirstOrDefault(t => t.IsClass && !t.IsAbstract && t.IsSubclassOf(typeof(AbstractValidator<TModel>)));

            if (type == null)
            {
                throw new ArgumentException("Unable to locate fluent validator for the given model.", nameof(model));
            }
            var validator = (AbstractValidator<TModel>)Activator.CreateInstance(type);
            return Validate(model, validator, propertyExpression);
        }

        public static object Validate<TModel>(this TModel model, 
            AbstractValidator<TModel> validator, 
            Expression<Func<TModel, object>> propertyExpression = null)
            => new Func<string, IEnumerable<string>>(input =>
            {
                var result = propertyExpression == null
                    ? validator.Validate(model)
                    : validator.Validate(model, options => options.IncludeProperties(propertyExpression));

                return result.IsValid ? new string[0] : result.Errors.Select(e => e.ErrorMessage);
            });
    }
}
