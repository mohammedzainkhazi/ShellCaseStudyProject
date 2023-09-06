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
    public class LocationRepo : ILocationRepo
    {
        private readonly ProjectDbContext _db;
        public LocationRepo(ProjectDbContext dbcontext)
        {
            _db = dbcontext;
        }
        public string AddLocation(Location location)
        {
            _db.location.Add(location);
            _db.SaveChanges();
            return "Added New location";
        }

        public string DeleteAllLocations()
        {
            throw new NotImplementedException();
        }

        public string DeleteLocationById(int id)
        {
            var location = _db.location.Find(id);
            _db.Remove(location);
            _db.SaveChanges();
            return "Deleted location : " + id;
        }

        public List<Location> GetAllLocations()
        {
            List<Location> locations = _db.location.ToList();
            return locations;
        }

        public Location GetLocationById(int id)
        {
            Location location = _db.location.Find(id);
            return location;
        }

        public string UpdateLocation(Location location)
        {
            _db.Entry(location).State = EntityState.Modified;
            _db.SaveChanges();
            return "location Updated";
        }
    }
}
