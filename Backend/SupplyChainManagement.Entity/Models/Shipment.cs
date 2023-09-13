using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SupplyChainManagement.Entity.Models
{
    public class Shipment
    {
        public Shipment() { }
        [Key]
        public int shipment_id { get; set; }

        [ForeignKey("Order")]
        public int order_id { get; set; }

        [ForeignKey("Product")]
        public int product_id { get; set;}
        public int source_location_id { get; set; }
        public int destination_location_id { get; set; }
        public DateTime shipment_date { get; set; }
        public string shipment_status { get; set; }

    }
}
