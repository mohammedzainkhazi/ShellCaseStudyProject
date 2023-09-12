using SupplyChainManagement.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SupplyChainManagement.Data.Repositories
{
    public interface IUserRepo
    {
        string AddUser(User User);
        string UpdateUser(User User);
        string DeleteUserById(int id);
        string DeleteAllUsers();
        User GetUserById(int id);
        User AuthenticateUser(string email, string password);
        List<User> GetAllUsers();
    }
}
