using Hygiea.Core.Entities;
using Hygiea.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hygiea.Infrastructure.Manager
{
    public class HygieaManager : IHygieaManager
    {
        private readonly Database.DataContext dataContext;
        private readonly IRoleServices roleServices;
        public HygieaManager(Database.DataContext dataContext, IRoleServices roleServices)
        {
            this.dataContext = dataContext;
            this.roleServices = roleServices;
        }
        public async Task<bool> AddUserAsync(User user)
        {
            await dataContext.Users.AddAsync(user);
            return await dataContext.SaveChangesAsync() == 1;
        }

        public async Task<bool> DeleteUser(string id)
        {
            var delete = await dataContext.Users.FindAsync(id);
            await roleServices.DeleteUserFromRole("Regular User", delete.Id);
            dataContext.Users.Remove(delete);
            return await dataContext.SaveChangesAsync() == 1;
        }

        public async Task<User> FindUserById(string id)
        {
            var find = await dataContext.Users.FindAsync(id);
            return find;
        }

        public async Task<User> FindUserByName(string name)
        {
            var find = await dataContext.Users.FindAsync(name);
            return find;
        }

        public async Task<User> GetUserAsync(string id)
        {
            var get = await dataContext.Users.FindAsync(id);
            return get;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var getall = await dataContext.Users.ToListAsync();
            return getall;
        }

        public async Task<bool> UpdateUser(User user)
        {
            dataContext.Users.Update(user);
            return await dataContext.SaveChangesAsync() == 1;
        }
    }
}
