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
    public class UserRepo : IUserRepo
    {
        private readonly ProjectDbContext _db;
        public UserRepo(ProjectDbContext dbcontext)
        {
            _db = dbcontext;
        }
        public string AddUser(User user)
        {
            _db.user.Add(user);
            _db.SaveChanges();
            return "Added New User";
        }

        public string DeleteAllUsers()
        {
            throw new NotImplementedException();
        }

        public string DeleteUserById(int id)
        {
            var User = _db.user.Find(id);
            _db.Remove(User);
            _db.SaveChanges();
            return "Deleted User : " + id;
        }

        public List<User> GetAllUsers()
        {
            List<User> Users = _db.user.ToList();
            return Users;
        }

        public User GetUserById(int id)
        {
            User User = _db.user.Find(id);
            return User;
        }

        public string UpdateUser(User User)
        {
            _db.Entry(User).State = EntityState.Modified;
            _db.SaveChanges();
            return "User Updated";
        }

        public User AuthenticateUser(string email, string password)
        {
            // Find the user by email
            var user = _db.user.FirstOrDefault(u => u.user_email == email);

            // Check if the user exists and the password matches (you should implement secure password hashing)
            if (user != null && password.Equals(user.user_pass))
            {
                return user;
            }

            return null; // Authentication failed
        }
    }
}
