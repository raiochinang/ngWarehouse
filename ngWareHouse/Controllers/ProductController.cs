using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ngWareHouse.Models;
using ngWareHouse.Repositories;

namespace ngWareHouse.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly hooDbContext _context;

        public ProductController(hooDbContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<product> GetProducts()
        {
            ProductRepository repo = new ProductRepository();
            return repo.products(_context);
        }
    }
}