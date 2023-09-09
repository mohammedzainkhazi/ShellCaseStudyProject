using SupplyChainManagement.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SupplyChainManagement.Repository
{
    public interface IOrderRepo
    {
        string AddOrder(Order Order);
        string UpdateOrder(Order Order);
        string DeleteOrderById(int id);
        string DeleteAllOrders();
        Order GetOrderById(int id);
        List<Order> GetAllOrders();
    }
}