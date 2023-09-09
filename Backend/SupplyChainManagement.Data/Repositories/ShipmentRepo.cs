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
    public class ShipmentRepo : IShipmentRepo
    {
        private readonly ProjectDbContext _db;
        public ShipmentRepo(ProjectDbContext dbcontext)
        {
            _db = dbcontext;
        }
        public string AddShipment(Shipment shipment)
        {
            _db.shipment.Add(shipment);
            _db.SaveChanges();
            return "Added New Shipment";
        }

        public string DeleteAllShipments()
        {
            throw new NotImplementedException();
        }

        public string DeleteShipmentById(int id)
        {
            var Shipment = _db.shipment.Find(id);
            _db.shipment.Remove(Shipment);
            _db.SaveChanges();
            return "Deleted Shipment : " + id;
        }

        public List<Shipment> GetAllShipments()
        {
            List<Shipment> Shipments = _db.shipment.ToList();
            return Shipments;
        }

        public Shipment GetShipmentById(int id)
        {
            Shipment Shipment = _db.shipment.Find(id);
            return Shipment;
        }

        public string UpdateShipment(Shipment Shipment)
        {
            _db.Entry(Shipment).State = EntityState.Modified;
            _db.SaveChanges();
            return "Shipment Updated";
        }
    }
}
