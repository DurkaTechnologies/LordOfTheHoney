﻿using System.ComponentModel;

namespace Domain.Enums
{
    public enum SortDirection
    {
        [Description("none")]
        None,
        [Description("ascending")]
        Ascending,
        [Description("descending")]
        Descending
    }
}
