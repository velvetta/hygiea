using System;
using System.Collections.Generic;
using System.Text;

namespace Hygiea.Core.Entities
{
    public class Privilege
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public virtual Role Role { get; set; }
    }
}
