using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SupplyChainManagement.Services;
using SupplyChainManagement.Entity.Models;
using System.Data;
using NuGet.Protocol;

namespace SupplyChainManagement.API.Controllers
{
    public class ProductData
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int TotalQuantitySold { get; set; }
    }
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
        public IEnumerable<Orders> GetAllOrders()
        {
            return _OrderService.GetAllOrders();
        }
        [HttpGet("getOrder/{id}")]
        public Orders GetOrderById(int id)
        {
            return _OrderService.GetOrderById(id);
        }
        [HttpPost("/addOrder")]
        public IActionResult AddOrder([FromBody] Orders Order)
        {
            return Ok(_OrderService.AddOrder(Order));
        }
        [HttpDelete("/deleteOrder")]
        public IActionResult DeleteOrder(int id)
        {
            return Ok(_OrderService.DeleteOrderById(id));
        }
        [HttpPut("/updateOrder")]
        public IActionResult UpdateOrder([FromBody] Orders Order)
        {
            return Ok(_OrderService.UpdateOrder(Order));
        }
        [HttpDelete("/deleteAllOrders")]
        public IActionResult DeleteAllOrders()
        {
            return Ok(_OrderService.DeleteAllOrders());
        }
        [HttpGet("/getTopProducts")]

        public IActionResult GetTopProducts() {
            return Ok(_OrderService.TopOrders().ToJson());
        }
    }
}
