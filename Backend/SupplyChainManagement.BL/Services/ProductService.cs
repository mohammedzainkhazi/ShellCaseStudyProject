using SupplyChainManagement.Data.Repositories;
using SupplyChainManagement.Entity.Models;

namespace SupplyChainManagement.Services
{
    public class ProductService
    {
        private readonly ProdRepo repo;
        public ProductService(ProdRepo repo) { this.repo = repo; }

        public string AddProduct(Product product)
        {
            return repo.AddProduct(product);
        }
        public string DeleteAllProducts()
        {
            return repo.DeleteAllProducts();
        }
        public string DeleteProductById(int id)
        {
            return repo.DeleteProductById(id);
        }
        public List<Product> GetAllProducts()
        {
            return repo.GetAllProducts();
        }
        public Product GetProductById(int id)
        {
            return repo.GetProductById(id);
        }
        public string UpdateProduct(Product product)
        {
            return repo.UpdateProduct(product);
        }
    }
}
