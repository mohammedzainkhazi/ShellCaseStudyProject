using SupplyChainManagement.Data.Repositories;
using SupplyChainManagement.Entity.Models;

namespace SupplyChainManagement.Services
{
    public class OrderService
    {
        private readonly OrderRepo repo;
        public OrderService(OrderRepo repo) { this.repo = repo; }

        public string AddOrder(Order order)
        {
            return repo.AddOrder(order);
        }
        public string DeleteAllOrders()
        {
            return repo.DeleteAllOrders();
        }
        public string DeleteOrderById(int id)
        {
            return repo.DeleteOrderById(id);
        }
        public List<Order> GetAllOrders()
        {
            return repo.GetAllOrders();
        }
        public Order GetOrderById(int id)
        {
            return repo.GetOrderById(id);
        }
        public string UpdateOrder(Order Order)
        {
            return repo.UpdateOrder(Order);
        }
    }
}
