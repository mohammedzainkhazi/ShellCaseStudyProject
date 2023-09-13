using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SupplyChainManagement.Entity.Models
{
    public class Order
    {
        [Key]
        public int order_id { get; set; }
        [ForeignKey("Product")]
        public int product_id { get; set; }
        public int quantity_ordered { get; set; }
        public DateTime order_date { get; set; }
        public string status { get; set; }
        public int inventory_id { get; set; }
    }
}
