using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Npgsql;
using SupplyChainManagement.Data.Repositories;
using SupplyChainManagement.Entity.Models;
using System.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace SupplyChainManagement.Services
{
    public class ProductData
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int TotalQuantitySold { get; set; }
    }
    public class OrderService
    {
        private readonly OrderRepo repo;
        public OrderService(OrderRepo repo) { this.repo = repo; }

        public string AddOrder(Orders order)
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
        public List<Orders> GetAllOrders()
        {
            return repo.GetAllOrders();
        }
        public Orders GetOrderById(int id)
        {
            return repo.GetOrderById(id);
        }
        public string UpdateOrder(Orders Order)
        {
            return repo.UpdateOrder(Order);
        }

        public List<ProductData> TopOrders()
        {
            // Connection string for your PostgreSQL database
            string connectionString = "Host=localhost;Database=SupplyChainManagement;Username=postgres;Password=roottoor";

            List<ProductData> data = new List<ProductData>();

            using (NpgsqlConnection connection = new NpgsqlConnection(connectionString))
            {
                connection.Open();

                // SQL query to get the top 5 selling products
                string sqlQuery = @"
                SELECT p.product_id, p.product_name, SUM(o.quantity_ordered) AS total_quantity_sold
                FROM Product p
                INNER JOIN Orders o ON p.product_id = o.product_id
                GROUP BY p.product_id, p.product_name
                ORDER BY total_quantity_sold DESC
                LIMIT 5;";

                using (NpgsqlCommand command = new NpgsqlCommand(sqlQuery, connection))
                {
                    using (NpgsqlDataAdapter adapter = new NpgsqlDataAdapter(command))
                    {
                        DataTable dataTable = new DataTable();
                        adapter.Fill(dataTable);
                        foreach (DataRow row in dataTable.Rows)
                        {
                            ProductData product = new ProductData
                            {
                                ProductId = Convert.ToInt32(row["product_id"]),
                                ProductName = row["product_name"].ToString(),
                                TotalQuantitySold = Convert.ToInt32(row["total_quantity_sold"])
                            };

                            data.Add(product);
                        }
                    }
                }
            }

            return data;
        }
    }
}
