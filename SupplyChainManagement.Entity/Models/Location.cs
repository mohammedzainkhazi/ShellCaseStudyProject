using System.ComponentModel.DataAnnotations;

namespace SupplyChainManagement.Entity.Models
{
    public class Location
    {
        public Location() { }
        [Key]
        public int location_Id { get; set; }
        [Required]
        public string location_name { get; set; }

    }
}
