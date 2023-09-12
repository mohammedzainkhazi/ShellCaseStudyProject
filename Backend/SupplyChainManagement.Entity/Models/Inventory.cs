using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SupplyChainManagement.Entity.Models
{
    public class Inventory
    {
        public Inventory() { }
        [Key]
        public int inventory_id { get; set; }

        [ForeignKey("Location")]
        public int location_id { get; set; }
        public Location Location { get; set; }

        [ForeignKey("Product")]
        public int product_id { get; set; }
        public Product Product { get; set; }
        public int quantity_available { get; set; }

        public DateTime last_updated { get; set; }


    }
}
