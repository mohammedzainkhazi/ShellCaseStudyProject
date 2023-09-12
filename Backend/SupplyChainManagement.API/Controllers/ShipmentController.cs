using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SupplyChainManagement.Services;
using SupplyChainManagement.Entity.Models;

namespace SupplyChainManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShipmentController : ControllerBase
    {
        private readonly ShipmentService _ShipmentService;
        public ShipmentController(ShipmentService service)
        {
            _ShipmentService = service;
        }
        [HttpGet("/getAllShipments")]
        public IEnumerable<Shipment> GetAllShipments()
        {
            return _ShipmentService.GetAllShipments();
        }
        [HttpGet("getShipment/{id}")]
        public Shipment GetShipmentById(int id)
        {
            return _ShipmentService.GetShipmentById(id);
        }
        [HttpPost("/addShipment")]
        public IActionResult AddShipment([FromBody] Shipment Shipment)
        {
            return Ok(_ShipmentService.AddShipment(Shipment));
        }
        [HttpDelete("/deleteShipment")]
        public IActionResult DeleteShipment(int id)
        {
            return Ok(_ShipmentService.DeleteShipmentById(id));
        }
        [HttpPut("/updateShipment")]
        public IActionResult UpdateShipment([FromBody] Shipment Shipment)
        {
            return Ok(_ShipmentService.UpdateShipment(Shipment));
        }
        [HttpDelete("/deleteAllShipments")]
        public IActionResult DeleteAllShipments()
        {
            return Ok(_ShipmentService.DeleteAllShipments());
        }
    }
}
