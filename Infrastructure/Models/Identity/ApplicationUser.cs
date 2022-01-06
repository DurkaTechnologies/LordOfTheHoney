﻿using LordOfTheHoney.Domain.Contracts;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using LordOfTheHoney.Application.Interfaces.Chat;
using LordOfTheHoney.Application.Models.Chat;

namespace LordOfTheHoney.Infrastructure.Models.Identity
{
    public class ApplicationUser : IdentityUser<string>, IChatUser, IAuditableEntity<string>
    {
        public string CreatedBy { get; set; }

        [Column(TypeName = "text")]
        public string ProfilePictureDataUrl { get; set; }

        public DateTime CreatedOn { get; set; }

        public string LastModifiedBy { get; set; }

        public DateTime? LastModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public bool IsActive { get; set; }

        public string RefreshToken { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }

        public virtual ICollection<ChatHistory<ApplicationUser>> ChatHistoryFromUsers { get; set; }

        public virtual ICollection<ChatHistory<ApplicationUser>> ChatHistoryToUsers { get; set; }

        public decimal BeeCoins { get; set; }

        public ApplicationUser()
        {
            ChatHistoryFromUsers = new HashSet<ChatHistory<ApplicationUser>>();
            ChatHistoryToUsers = new HashSet<ChatHistory<ApplicationUser>>();
        }
    }
}
