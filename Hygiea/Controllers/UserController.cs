using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Hygiea.Core.DTOs;
using Hygiea.Core.Entities;
using Hygiea.Core.Interfaces;
using Hygiea.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Hygiea.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly IRoleServices roleServices;
        public UserController(IUserRepository userRepository,IRoleServices roleServices)
        {
            this.userRepository = userRepository;
            this.roleServices = roleServices;
        }
        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserDTO userDTO)
        {
            if (userDTO != null)
            {
                var user = Mapper.Map<UserDTO, User>(userDTO);

                if (await userRepository.RegisterUserAsync(user))
                    return Ok("Success");
                return BadRequest("Registration not Successful");
            }

            return BadRequest("ERRRRRR!!!");
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO){
            if (loginDTO == null) return BadRequest("Invalid Credentials; Check your credentials!");
            var user = await userRepository.CheckIfUserExists(loginDTO.EmailAddress, loginDTO.PasswordHash);
            var userRole = await roleServices.GetUserRole(user.Id);
            if(user !=null){
                var claims = Helpers.MapRolesToClaims((await roleServices.GetUserRoles(user.Id)).ToList());
                claims.Add(new Claim(ClaimTypes.Name, user.EmailAddress));
                claims.Add(new Claim("Id", user.Id));
                claims.Add(new Claim("AccountType", user.AccountType.ToLower()));
                claims.Add(new Claim("RoleName", userRole.RoleName));
               var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("reacthygieaauthtoken"));
                var siginCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokenOptions = new JwtSecurityToken(
                    "http://localhost:52161/", 
                    "http://localhost:52161/",
                    claims,
                    expires: DateTime.Now.AddHours(3),
                    signingCredentials: siginCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return Ok(new {token = tokenString});
            }
            return BadRequest("Account does not exist!");
        }

        [HttpGet]
        [Authorize(Roles="Administrator")]
        [Route("getusers")]
        public async Task<IEnumerable<UserDTO>> GetUsers()
        {
            if(!ModelState.IsValid)return null;
            var get = await userRepository.GetAllUsersAsync();
            var usersDtoCollection = new List<UserDTO>();
            get.ToList().ForEach(x => usersDtoCollection.Add(Mapper.Map<User, UserDTO>(x)));

            return usersDtoCollection;
        }

        [HttpDelete]
        [Authorize(Roles="Administrator")]
        [Route("deleteuser/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if(!ModelState.IsValid)return null;
            if(id != null)
            {
                await userRepository.DeleteUserAsync(id);
                return Ok("Success");
            }
            return BadRequest("Not Successful");
        }

        [HttpPut]
        [Route("updateuser/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateUser (string id , UserDTO userDTO)
        {
            if(!ModelState.IsValid)return null;
            if(userDTO == null) return BadRequest("Not Successful");
            var update = Mapper.Map<UserDTO, User>(userDTO);
            update.Id = id;
            await userRepository.UpdateUserAsync(update);
            return Ok ("Success");

        }
    }
}