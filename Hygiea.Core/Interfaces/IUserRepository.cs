using Hygiea.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hygiea.Core.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> RegisterUserAsync(User user);
        Task<bool> UpdateUserAsync(User user);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<bool> DeleteUserAsync(string id);
        User FindUser(string id);
        Task<User> FindUserByIdAsync(string id);
        Task<User> FindUserByName(string name);
        Task<User> CheckIfUserExists(string emailAddress, string password);
        Task<(bool flag, string message)> ChangeUserPassword(string password, string newPassword, string userId);
    }
}
