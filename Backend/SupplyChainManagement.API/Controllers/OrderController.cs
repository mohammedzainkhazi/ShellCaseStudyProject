using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SupplyChainManagement.Services;
using SupplyChainManagement.Entity.Models;

namespace SupplyChainManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _OrderService;
        public OrderController(OrderService service)
        {
            _OrderService = service;
        }
        [HttpGet("/getAllOrders")]
        public IEnumerable<Order> GetAllOrders()
        {
            return _OrderService.GetAllOrders();
        }
        [HttpGet("getOrder/{id}")]
        public Order GetOrderById(int id)
        {
            return _OrderService.GetOrderById(id);
        }
        [HttpPost("/addOrder")]
        public IActionResult AddOrder([FromBody] Order Order)
        {
            return Ok(_OrderService.AddOrder(Order));
        }
        [HttpDelete("/deleteOrder")]
        public IActionResult DeleteOrder(int id)
        {
            return Ok(_OrderService.DeleteOrderById(id));
        }
        [HttpPut("/updateOrder")]
        public IActionResult UpdateOrder([FromBody] Order Order)
        {
            return Ok(_OrderService.UpdateOrder(Order));
        }
        [HttpDelete("/deleteAllOrders")]
        public IActionResult DeleteAllOrders()
        {
            return Ok(_OrderService.DeleteAllOrders());
        }
    }
}
