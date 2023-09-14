using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SupplyChainManagement.Services;
using SupplyChainManagement.Entity.Models;
using Microsoft.AspNetCore.Authorization;

namespace SupplyChainManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _ProductService;
        public ProductController(ProductService service)
        {
            _ProductService = service;
        }
        [Authorize]
        [HttpGet("/getAllProducts")]
        public IEnumerable<Product> GetAllProducts()
        {
            return _ProductService.GetAllProducts();
        }
        [HttpGet("getProduct/{id}")]
        public Product GetProductById(int id)
        {
            return _ProductService.GetProductById(id);
        }
        [HttpPost("/addProduct")]
        public IActionResult AddProduct([FromBody] Product Product)
        {
            return Ok(_ProductService.AddProduct(Product));
        }
        [HttpDelete("/deleteProduct")]
        public IActionResult DeleteProduct(int id)
        {
            return Ok(_ProductService.DeleteProductById(id));
        }
        [HttpPut("/updateProduct")]
        public IActionResult UpdateProduct([FromBody] Product Product)
        {
            return Ok(_ProductService.UpdateProduct(Product));
        }
        [HttpDelete("/deleteAllProducts")]
        public IActionResult DeleteAllProducts()
        {
            return Ok(_ProductService.DeleteAllProducts());
        }
    }
}
