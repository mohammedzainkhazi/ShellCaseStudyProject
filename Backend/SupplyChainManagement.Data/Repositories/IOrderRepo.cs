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
        string AddOrder(Orders Order);
        string UpdateOrder(Orders Order);
        string DeleteOrderById(int id);
        string DeleteAllOrders();
        Orders GetOrderById(int id);
        List<Orders> GetAllOrders();
    }
}