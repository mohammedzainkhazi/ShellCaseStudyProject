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
        public string AddOrder(Orders order)
        {
            _db.orders.Add(order);
            _db.SaveChanges();
            return "Added New Order";
        }

        public string DeleteAllOrders()
        {
            throw new NotImplementedException();
        }

        public string DeleteOrderById(int id)
        {
            var order = _db.orders.Find(id);
            _db.orders.Remove(order);
            _db.SaveChanges();
            return "Deleted order : " + id;
        }

        public List<Orders> GetAllOrders()
        {
            List<Orders> orders = _db.orders.ToList();
            return orders;
        }

        public Orders GetOrderById(int id)
        {
            Orders order = _db.orders.Find(id);
            return order;
        }

        public string UpdateOrder(Orders order)
        {
            _db.Entry(order).State = EntityState.Modified;
            _db.SaveChanges();
            return "order Updated";
        }
    }
}
