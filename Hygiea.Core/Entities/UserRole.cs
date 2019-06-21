using System;
using System.Collections.Generic;
using System.Text;

namespace Hygiea.Core.Entities
{
    public class UserRole
    {
        public string Id { get; set; }
        public Role Role { get; set; }
        public User User { get; set; }
    }
}
