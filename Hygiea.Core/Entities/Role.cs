using System;
using System.Collections.Generic;
using System.Text;

namespace Hygiea.Core.Entities
{
    public class Role
    {
        public string Id { get; set; }
        public string RoleName { get; set; }

        public ICollection<Privilege> Privileges { get; set; }
    }
}
