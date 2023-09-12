using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SupplyChainManagement.Services;
using SupplyChainManagement.Entity.Models;

namespace SupplyChainManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly LocationService _LocationService;
        public LocationController(LocationService service)
        {
            _LocationService = service;
        }
        [HttpGet("/getAllLocations")]
        public IEnumerable<Location> GetAllLocations()
        {
            return _LocationService.GetAllLocations();
        }
        [HttpGet("getLocation/{id}")]
        public Location GetLocationById(int id)
        {
            return _LocationService.GetLocationById(id);
        }
        [HttpPost("/addLocation")]
        public IActionResult AddLocation([FromBody] Location Location)
        {
            return Ok(_LocationService.AddLocation(Location));
        }
        [HttpDelete("/deleteLocation")]
        public IActionResult DeleteLocation(int id)
        {
            return Ok(_LocationService.DeleteLocationById(id));
        }
        [HttpPut("/updateLocation")]
        public IActionResult UpdateLocation([FromBody] Location Location)
        {
            return Ok(_LocationService.UpdateLocation(Location));
        }
        [HttpDelete("/deleteAllLocations")]
        public IActionResult DeleteAllLocations()
        {
            return Ok(_LocationService.DeleteAllLocations());
        }
    }
}
