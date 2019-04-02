using ngWareHouse.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Repositories
{
    public class ProductRepository
    {
        public List<product> products(hooDbContext db)
        {
            return db.products.ToList();
        }
    }
}
