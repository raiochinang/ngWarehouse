using ngWareHouse.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Repositories
{
    public class LogRepository
    {
        public dscr_user_roles Login(dscr_user_roles user, hooDbContext db)
        {
            var AppUser = db.dscr_user_roles.Where(u => u.user_name == user.user_name && u.password == user.password).SingleOrDefault();
            return AppUser;
        }
    }
}
