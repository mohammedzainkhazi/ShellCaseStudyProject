using SupplyChainManagement.Data.Repositories;
using SupplyChainManagement.Entity.Models;

namespace SupplyChainManagement.Services
{
    public class UserService
    {
        private readonly UserRepo repo;
        public UserService(UserRepo repo) { this.repo = repo; }

        public string AddUser(User User)
        {
            return repo.AddUser(User);
        }
        public string DeleteAllUsers()
        {
            return repo.DeleteAllUsers();
        }
        public string DeleteUserById(int id)
        {
            return repo.DeleteUserById(id);
        }
        public List<User> GetAllUsers()
        {
            return repo.GetAllUsers();
        }
        public User GetUserById(int id)
        {
            return repo.GetUserById(id);
        }
        public string UpdateUser(User User)
        {
            return repo.UpdateUser(User);
        }

        public User AuthenticateUser(string email,string pass) {
            return repo.AuthenticateUser(email, pass);
        }
    }
}
