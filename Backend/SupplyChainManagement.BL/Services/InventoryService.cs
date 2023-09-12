using SupplyChainManagement.Data.Repositories;
using SupplyChainManagement.Entity.Models;

namespace SupplyChainManagement.Services
{
    public class InventoryService
    {
        private readonly InventRepo _repo;
        public InventoryService(InventRepo repo) { _repo = repo; }

        public string AddInventory(Inventory Inventory)
        {
            return _repo.AddInventory(Inventory);
        }
        public string DeleteAllInventories()
        {
            return _repo.DeleteAllInventories();
        }
        public string DeleteInventoryById(int id)
        {
            return _repo.DeleteInventoryById(id);
        }
        public List<Inventory> GetAllInventories()
        {
            return _repo.GetAllInventories();
        }
        public Inventory GetInventoryById(int id)
        {
            return _repo.GetInventoryById(id);
        }
        public string UpdateInventory(Inventory Inventory)
        {
            return _repo.UpdateInventory(Inventory);
        }
    }
}
