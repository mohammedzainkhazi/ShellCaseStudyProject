using SupplyChainManagement.Data.Repositories;
using SupplyChainManagement.Entity.Models;

namespace SupplyChainManagement.Services
{
    public class InventoryService
    {
        private readonly InventRepo repo;
        public InventoryService(InventRepo repo) { this.repo = repo; }

        public string AddInventory(Inventory Inventory)
        {
            return repo.AddInventory(Inventory);
        }
        public string DeleteAllInventories()
        {
            return repo.DeleteAllInventories();
        }
        public string DeleteInventoryById(int id)
        {
            return repo.DeleteInventoryById(id);
        }
        public List<Inventory> GetAllInventories()
        {
            return repo.GetAllInventories();
        }
        public Inventory GetInventoryById(int id)
        {
            return repo.GetInventoryById(id);
        }
        public string UpdateInventory(Inventory Inventory)
        {
            return repo.UpdateInventory(Inventory);
        }
    }
}
