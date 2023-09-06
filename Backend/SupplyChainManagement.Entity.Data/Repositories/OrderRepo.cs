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
    public class OrderRepo : IOrderRepo
    {
        private readonly ProjectDbContext _db;
        public OrderRepo(ProjectDbContext dbcontext)
        {
            _db = dbcontext;
        }
        public string AddOrder(Order order)
        {
            _db.order.Add(order);
            _db.SaveChanges();
            return "Added New Order";
        }

        public string DeleteAllOrders()
        {
            throw new NotImplementedException();
        }

        public string DeleteOrderById(int id)
        {
            var order = _db.order.Find(id);
            _db.order.Remove(order);
            _db.SaveChanges();
            return "Deleted order : " + id;
        }

        public List<Order> GetAllOrders()
        {
            List<Order> orders = _db.order.ToList();
            return orders;
        }

        public Order GetOrderById(int id)
        {
            Order order = _db.order.Find(id);
            return order;
        }

        public string UpdateOrder(Order order)
        {
            _db.Entry(order).State = EntityState.Modified;
            _db.SaveChanges();
            return "order Updated";
        }
    }
}
