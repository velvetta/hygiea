using Hygiea.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Hygiea.Utilities
{
    public class Helpers
    {
        public static List<Claim> MapRolesToClaims(List<Role> roles)
        {
            var claims = new List<Claim>();
            roles.ForEach(role => claims.Add(new Claim(ClaimTypes.Role, role.RoleName)));
            return claims;
        }
    }
}
