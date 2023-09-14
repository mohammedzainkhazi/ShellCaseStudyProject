using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SupplyChainManagement.Services;
using SupplyChainManagement.Entity.Models;
using Microsoft.AspNetCore.Cors;
using System.Net.Http.Headers;
using NuGet.Protocol;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using SupplyChainManagement.API.Controllers;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SupplyChainManagement.Data;
using SupplyChainManagement.Entity.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SupplyChainManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthObj{
        public string email { get; set; }
        public string pass { get; set; }
    }


    public class UserController : ControllerBase
    {
        private IConfiguration _config;
        private readonly UserService _UserService;
        public UserController(UserService service,IConfiguration configuration)
        {
            _UserService = service;
            _config = configuration;
        }
        [HttpGet("/getAllUsers")]
        public IEnumerable<User> GetAllUsers()
        {
            return _UserService.GetAllUsers();
        }
        [HttpGet("/getUser/{id}")]
        public User GetUserById(int id)
        {
            return _UserService.GetUserById(id);
        }
        [HttpPost("/addUser")]
        public IActionResult AddUser([FromBody] User User)
        {
            return Ok(_UserService.AddUser(User));
        }
        [HttpDelete("/deleteUser")]
        public IActionResult DeleteUser(int id)
        {
            return Ok(_UserService.DeleteUserById(id));
        }
        [HttpPut("/updateUser")]
        public IActionResult UpdateUser([FromBody] User User)
        {
            return Ok(_UserService.UpdateUser(User));
        }
        [HttpDelete("/deleteAllUsers")]
        public IActionResult DeleteAllUsers()
        {
            return Ok(_UserService.DeleteAllUsers());
        }
        [HttpPost("/loginUser")]
        public IActionResult AuthenticateUser([FromBody] AuthObj obj) {
            User user = _UserService.AuthenticateUser(obj.email, obj.pass);
            if (user != null)
            {
                //create claims details based on the user information
                var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, _config["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("Id", user.user_id.ToString()),
                    new Claim("Name", user.user_name),
                    new Claim("Email", user.user_email),
                    new Claim("Password", user.user_pass),
                   };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var t = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signIn);

                var res = new { token = new JwtSecurityTokenHandler().WriteToken(t), user = user };
                return Ok(res.ToJson());
            }
            return Unauthorized(null);
        }

        public string GenerateToken(User user)
        {
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(user.ToString()));
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken("Jwt:Issuer", "Jwt:Audience", null, expires: DateTime.Now.AddMinutes(999), signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
