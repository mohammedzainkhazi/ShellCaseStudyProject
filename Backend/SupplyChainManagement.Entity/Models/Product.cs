using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace SupplyChainManagement.Entity.Models
{
    public class Product
    {
        public Product() { }
        [Key]
        public int product_id { get; set; }
        public string product_name { get; set; }
        public string product_description { get; set; }
        public int unit_of_measure { get; set; }
        public int price_per_unit { get; set; }
    }
}
