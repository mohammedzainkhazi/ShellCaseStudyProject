using Microsoft.EntityFrameworkCore;
using SupplyChainManagement.Entity.Models;
using System.Threading.Tasks;
namespace SupplyChainManagement
{
    public class ProjectDbContext:DbContext
    {
        public ProjectDbContext(DbContextOptions<ProjectDbContext> options) : base(options) { }
        public DbSet<Location> location { get; set; }
        public DbSet<Inventory> inventory { get; set; }
        public DbSet<Product> product { get; set; }
        public DbSet<Order> order { get; set; }
        public DbSet<Shipment> shipment { get; set; }
    }
}
