using Hygiea.Core.Entities;
using Hygiea.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hygiea.Infrastructure.Service
{
    public class RoleServices : IRoleServices
    {
        private readonly Database.DataContext dataContext;
        public RoleServices(Database.DataContext dataContext)
        {
            this.dataContext = dataContext;
        }
        public async Task<Role> AddRole(string roleName)
        {
            var roleexist = await dataContext.Roles.SingleOrDefaultAsync(c => c.RoleName == roleName);
            if (roleexist == null)
            {
                var role = new Role { RoleName = roleName };
                await dataContext.Roles.AddAsync(role);
                await dataContext.SaveChangesAsync();
                return role;
            }

            return null;
        }

        public async Task<bool> AddUserToRole(string role, string userId)
        {
            var roleName = await GetRole(role);
            var user = await dataContext.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if (role == null)
            {
                roleName = new Role { RoleName = role };
                await dataContext.Roles.AddAsync(roleName);
            }

            if (user == null) return false;

            var userRole = new UserRole { Role = roleName, User = user };
            await dataContext.UserRoles.AddAsync(userRole);
            return await dataContext.SaveChangesAsync() == 1;
        }

        public async Task<bool> DeleteRole(string id)
        {
            if (id != null)
            {
                var findRole = await dataContext.Roles.SingleOrDefaultAsync(x => x.Id == id);
                var deleteRole = dataContext.Roles.Remove(findRole);
                return await dataContext.SaveChangesAsync() == 1;
            }

            return false;
        }

        public async Task<bool> DeleteUserFromRole(string role, string userId)
        {
            var remove =
          await dataContext.UserRoles.FirstOrDefaultAsync(c =>
             c.Role.RoleName == role && c.User.Id == userId);
            dataContext.UserRoles.Remove(remove);
            return await dataContext.SaveChangesAsync() == 1;
        }

        public async Task<Role> GetRole(string roleName)
        {
            var role = await dataContext.Roles.FirstOrDefaultAsync(x => x.RoleName.ToLower() == roleName);
            return role ?? null;
        }

        public async Task<IEnumerable<Role>> GetRoles()
        {
            return await dataContext.Roles.ToListAsync();
        }

        public async Task<IEnumerable<Role>> GetUserRoles(string userId)
        {
            if (userId == null) return null;

            var roles = await dataContext.UserRoles.Where(role => role.User.Id == userId).Select(x => x.Role)
                .ToListAsync();
            if (roles != null)
                return roles;
            return null;
        }

        public async Task<bool> UpdateRole(Role role)
        {
            if (role != null)
            {
                var roleName = await dataContext.Roles.SingleAsync(x => x.Id == role.Id);
                dataContext.Roles.Update(roleName);
                return await dataContext.SaveChangesAsync() == 1;
            }
            return false;
        }
    }
}
