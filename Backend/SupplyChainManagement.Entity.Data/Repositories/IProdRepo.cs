using SupplyChainManagement.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SupplyChainManagement.Repository
{
    public interface IProdRepo
    {
        string AddProduct(Product product);
        string UpdateProduct(Product movie);
        string DeleteProductById(int id);
        string DeleteAllProducts();
        Product GetProductById(int id);
        List<Product> GetAllProducts();
    }
}