using SupplyChainManagement.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SupplyChainManagement.Repository
{
    public interface IShipmentRepo
    {
        string AddShipment(Shipment Shipment);
        string UpdateShipment(Shipment Shipment);
        string DeleteShipmentById(int id);
        string DeleteAllShipments();
        Shipment GetShipmentById(int id);
        List<Shipment> GetAllShipments();
    }
}