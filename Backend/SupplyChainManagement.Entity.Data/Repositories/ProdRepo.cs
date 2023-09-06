using Microsoft.EntityFrameworkCore;
using SupplyChainManagement.Entity.Models;
using SupplyChainManagement.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SupplyChainManagement.Data.Repositories
{
    public class ProdRepo : IProdRepo
    {
        private readonly ProjectDbContext _db;
        public ProdRepo(ProjectDbContext dbcontext)
        {
            _db = dbcontext;
        }
        public string AddProduct(Product product)
        {
            _db.product.Add(product);
            _db.SaveChanges();
            return "Added New Product";
        }

        public string DeleteAllProducts()
        {
            throw new NotImplementedException();
        }

        public string DeleteProductById(int id)
        {
            var product = _db.product.Find(id);
            _db.Remove(product);
            _db.SaveChanges();
            return "Deleted Product : " + id;
        }

        public List<Product> GetAllProducts()
        {
            List<Product> products = _db.product.ToList();
            return products;
        }

        public Product GetProductById(int id)
        {
            Product product = _db.product.Find(id);
            return product;
        }

        public string UpdateProduct(Product product)
        {
            _db.Entry(product).State = EntityState.Modified;
            _db.SaveChanges();
            return "Product Updated";
        }
    }
}
