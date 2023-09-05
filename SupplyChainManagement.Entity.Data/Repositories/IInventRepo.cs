using SupplyChainManagement.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SupplyChainManagement.Repository
{
    public interface IInventRepo
    {
        string AddInventory(Inventory inventory);
        string UpdateInventory(Inventory inventory, int id);
        string DeleteInventoryById(int id);
        string DeleteAllInventories();
        Inventory GetInventoryById(int id);
        List<Inventory> GetAllInventories();
    }
}