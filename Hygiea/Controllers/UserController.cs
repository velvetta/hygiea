using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Hygiea.Core.DTOs;
using Hygiea.Core.Entities;
using Hygiea.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hygiea.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        public UserController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] UserDTO userDTO)
        {
            if (userDTO != null)
            {
                var user = Mapper.Map<UserDTO, User>(userDTO);

                if (await userRepository.RegisterUserAsync(user))
                    return Ok("Success");
                return BadRequest("Registration not Successful");
            }

            return BadRequest();
        }
    }
}