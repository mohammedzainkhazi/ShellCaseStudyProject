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
    public class InventRepo : IInventRepo
    {
        private readonly ProjectDbContext _db;
        public InventRepo(ProjectDbContext dbcontext)
        {
            _db = dbcontext;
        }
        public string AddInventory(Inventory inventory)
        {
            _db.inventory.Add(inventory);
            _db.SaveChanges();
            return "Added New Inventory";
        }

        public string DeleteAllInventories()
        {
            throw new NotImplementedException();
        }

        public string DeleteInventoryById(int id)
        {
            var inventory = _db.inventory.Find(id);
            _db.Remove(inventory);
            _db.SaveChanges();
            return "Deleted Inventory : " + id;
        }

        public List<Inventory> GetAllInventories()
        {
            List<Inventory> inventories = _db.inventory.ToList();
            return inventories;
        }

        public Inventory GetInventoryById(int id)
        {
            Inventory inventory = _db.inventory.Find(id);
            return inventory;
        }

        public string UpdateInventory(Inventory inventory)
        {
            _db.Entry(inventory).State = EntityState.Modified;
            _db.SaveChanges();
            return "Inventory Updated";
        }
    }
}
