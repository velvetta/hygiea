using Hygiea.Core.Entities;
using Hygiea.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading.Tasks;

namespace Hygiea.Infrastructure.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly Database.DataContext dataContext;
        private readonly IRoleServices roleServices;
        private readonly IHygieaManager hygieaManager;
       
        public UserRepository(Database.DataContext dataContext, IRoleServices roleServices, IHygieaManager hygieaManager)
        {
            this.dataContext = dataContext;
            this.roleServices = roleServices;
            this.hygieaManager = hygieaManager;
        }
        public Task<(bool flag, string message)> ChangeUserPassword(string password, string newPassword, string userId)
        {
            throw new NotImplementedException();
        }

        public async Task<User> CheckIfUserExists(string emailAddress, string password)
        {
            if (string.IsNullOrWhiteSpace(emailAddress) || string.IsNullOrWhiteSpace(password))
                return null;
            var result = await dataContext.Users.SingleOrDefaultAsync(x => x.EmailAddress == emailAddress);
            return result;
        }

        public async Task<bool> DeleteUserAsync(string id)
        {
            if (id != null)
            {
                await hygieaManager.DeleteUser(id);
                return true;
            }
            return false;
        }

        public async Task<User> FindUserByIdAsync(string id)
        {
            if (id != null)
            {
                var userName = await hygieaManager.FindUserByName(id);
                return userName;
            }
            return null;
        }

        public User FindUser(string id){
            if(id != null){
                var user = dataContext.Users.FirstOrDefault(x=>x.Id == id);
                return user ?? null;
            }
            return null;
        }

        public async Task<User> FindUserByName(string name)
        {
            if (name != null)
            {
                var userName = await hygieaManager.FindUserByName(name);
                return userName;
            }
            return null;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await hygieaManager.GetUsers();
        }

        public async Task<bool> RegisterUserAsync(User user)
        {
            try
            {
                dataContext.Roles.Add(new Role { RoleName = "Administrator" });
                dataContext.Roles.Add(new Role { RoleName = "RegularUser" });
                dataContext.SaveChanges();

                if (user == null) return false;
                var password = user.PasswordHash;
                user.PasswordHash = Encryption.Encryption.MD5Hash(password);
                user.Id =  $"HYG - {new Random().Next(1111111,9999999)}";

                await hygieaManager.AddUserAsync(user);
                await roleServices.AddUserToRole("RegularUser", user.Id);
                return true;
            }
            catch { return false; }
        }

        public Task<bool> UpdateUserAsync(User user)
        {
            throw new NotImplementedException();
        }
    }
}
