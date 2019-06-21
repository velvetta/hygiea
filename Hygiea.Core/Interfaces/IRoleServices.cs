using Hygiea.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hygiea.Core.Interfaces
{
    public interface IRoleServices
    {
        Task<Role> AddRole(string roleName);
        Task<bool> DeleteRole(string id);
        Task<bool> UpdateRole(Role role);
        Task<IEnumerable<Role>> GetRoles();
        Task<Role> GetRole(string roleName);
        Task<bool> AddUserToRole(string role, string userId);
        Task<bool> DeleteUserFromRole(string role, string userId);
        Task<IEnumerable<Role>> GetUserRoles(string userId);
    }
}
