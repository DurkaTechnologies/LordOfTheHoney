using LordOfTheHoney.Application.Interfaces.Services;
using System;

namespace LordOfTheHoney.Infrastructure.Shared.Services
{
    public class SystemDateTimeService : IDateTimeService
    {
        public DateTime NowUtc => DateTime.UtcNow;
    }
}