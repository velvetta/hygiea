using Hygiea.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hygiea.Core.Interfaces
{
    public interface IHygieaManager
    {
        Task<bool> AddUserAsync(User user);
        Task<bool> DeleteUser(string id);
        Task<bool> UpdateUser(User user);
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUserAsync(string id);
        Task<User> FindUserByName(string name);
        Task<User> FindUserById(string id);
    }
}
