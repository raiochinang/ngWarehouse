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

        [HttpPost("[action]")]
        public bool ProductEntry([FromBody] productEntry entry)
        {
            ProductRepository repo = new ProductRepository();
            var result = repo.ProductEntry(entry, _context);
            repo.UpdateInventory(entry, _context);
            _context.SaveChanges();
            return result;
        }

        [HttpGet("[action]")]
        public IEnumerable<branch> GetBranches()
        {
            ProductRepository repo = new ProductRepository();
            return repo.branches(_context);
        }

        [HttpPost("[action]")]
        public bool ProductOutGoing([FromBody] productEntry entry)
        {
            ProductRepository repo = new ProductRepository();
            var result = repo.InventoryOutGoing(entry, _context);
            repo.UpdateInventoryOutGoing(entry, _context);
            _context.SaveChanges();
            return result;
        }

        [HttpPost("[action]")]
        public ngInventory GetProductByBarcode([FromBody] productEntry entry)
        {
            ProductRepository repo = new ProductRepository();
            var result = repo.GetProductByBarcode(entry, _context);
            _context.SaveChanges();
            return result;
        }

        [HttpPost("[action]")]
        public bool ProductAdjust([FromBody] productEntry entry)
        {
            ProductRepository repo = new ProductRepository();
            var result = repo.ProductAdjust(entry, _context);
            _context.SaveChanges();
            return result;
        }

        [HttpPost("[action]")]
        public IEnumerable<inventory_view> GetInventoryByLocation([FromBody] productEntry entry)
        {
            ProductRepository repo = new ProductRepository();
            return repo.GetInventoryByLocation(entry.locationId, _context);
        }


    }

    public class productEntry
    {

        public string branch { get; set; }
        public string barcode { get; set; }
        public string lotNumber { get; set; }
        public string item { get; set; }
        public int quantity { get; set; }
        public string expiryDate { get; set; }
        public string comment { get; set; }
        public int productId { get; set; }
        public int locationId { get; set; }
        public int userId { get; set; }
        public int locationIdFrom { get; set; }
    }
}