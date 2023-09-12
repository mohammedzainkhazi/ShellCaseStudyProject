using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SupplyChainManagement.Services;
using SupplyChainManagement.Entity.Models;
using Microsoft.AspNetCore.Cors;
using System.Net.Http.Headers;
using NuGet.Protocol;

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
        private readonly UserService _UserService;
        public UserController(UserService service)
        {
            _UserService = service;
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
            return Ok(_UserService.AuthenticateUser(obj.email,obj.pass).ToJson());
        }
    }
}
