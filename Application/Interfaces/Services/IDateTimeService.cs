﻿using System;

namespace LordOfTheHoney.Application.Interfaces.Services
{
    public interface IDateTimeService
    {
        DateTime NowUtc { get; }
    }
}
