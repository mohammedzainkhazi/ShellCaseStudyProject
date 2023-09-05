using SupplyChainManagement.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SupplyChainManagement.Repository
{
    public interface ILocationRepo
    {
        string AddLocation(Location Location);
        string UpdateLocation(Location Location, int id);
        string DeleteLocationById(int id);
        string DeleteAllLocations();
        Location GetLocationById(int id);
        List<Location> GetAllLocations();
    }
}