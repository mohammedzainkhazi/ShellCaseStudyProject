using SupplyChainManagement.Data.Repositories;
using SupplyChainManagement.Entity.Models;

namespace SupplyChainManagement.Services
{
    public class ShipmentService
    {
        private readonly ShipmentRepo repo;
        public ShipmentService(ShipmentRepo repo) { this.repo = repo; }

        public string AddShipment(Shipment shipment)
        {
            return repo.AddShipment(shipment);
        }
        public string DeleteAllShipments()
        {
            return repo.DeleteAllShipments();
        }
        public string DeleteShipmentById(int id)
        {
            return repo.DeleteShipmentById(id);
        }
        public List<Shipment> GetAllShipments()
        {
            return repo.GetAllShipments();
        }
        public Shipment GetShipmentById(int id)
        {
            return repo.GetShipmentById(id);
        }
        public string UpdateShipment(Shipment shipment)
        {
            return repo.UpdateShipment(shipment);
        }
    }
}
