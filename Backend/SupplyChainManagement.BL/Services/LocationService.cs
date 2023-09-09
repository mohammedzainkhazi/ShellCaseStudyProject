using SupplyChainManagement.Data.Repositories;
using SupplyChainManagement.Entity.Models;

namespace SupplyChainManagement.Services
{
    public class LocationService
    {
        private readonly LocationRepo repo;
        public LocationService(LocationRepo repo) {  this.repo = repo; }

        public string AddLocation(Location location) { 
            return repo.AddLocation(location);
        }
        public string DeleteAllLocations()
        {
            return repo.DeleteAllLocations();
        }
        public string DeleteLocationById(int id)
        {
            return repo.DeleteLocationById(id);
        }
        public List<Location> GetAllLocations()
        {
            return repo.GetAllLocations();
        }
        public Location GetLocationById(int id)
        {
            return repo.GetLocationById(id);
        }
        public string UpdateLocation(Location location)
        {
            return repo.UpdateLocation(location);
        }
    }
}
