using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SupplyChainManagement.Services;
using SupplyChainManagement.Entity.Models;

namespace SupplyChainManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly InventoryService _inventoryService;
        public InventoryController(InventoryService service) {
            _inventoryService = service;
        }
        [HttpGet("/getAllInventories")]
        public IEnumerable<Inventory> GetAllInventories()
        {
             return _inventoryService.GetAllInventories();
        }
        [HttpGet("getInventory/{id}")]
        public Inventory GetInventoryById(int id) {
            return _inventoryService.GetInventoryById(id);
        }
        [HttpPost("/addInventory")]
        public IActionResult AddInventory([FromBody]Inventory inventory)
        {
            return Ok(_inventoryService.AddInventory(inventory));
        }
        [HttpDelete("/deleteInventory")]
        public IActionResult DeleteInventory(int id)
        {
            return Ok(_inventoryService.DeleteInventoryById(id));
        }
        [HttpPut("/updateInventory")]
        public IActionResult UpdateInventory([FromBody]Inventory inventory)
        {
            return Ok(_inventoryService.UpdateInventory(inventory));
        }
        [HttpDelete("/deleteAllInventories")]
        public IActionResult DeleteAllInventories()
        {
            return Ok(_inventoryService.DeleteAllInventories());
        }
    }
}
