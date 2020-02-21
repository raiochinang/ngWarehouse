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
    public class TransactionController : Controller
    {
        private readonly hooDbContext _context;

        public TransactionController(hooDbContext context)
        {
            _context = context;
        }

        [HttpPost("[action]")]
        public WareHouseTransaction postTransaction([FromBody] WareHouseTransaction model)
        {
            TransactionRepository repository = new TransactionRepository();
            return repository.PostTransaction(model, _context);
        }

        [HttpPost("[action]")]
        public WarehouseMaster getRemainingQuantity([FromBody] WareHouseTransaction model)
        {
            TransactionRepository repository = new TransactionRepository();
            return repository.GetRemainingQuantity(model, _context);
        }

        [HttpPost("[action]")]
        public List<ReportModel> generateReport([FromBody] WareHouseTransaction model)
        {
            TransactionRepository repository = new TransactionRepository();
            return repository.GenerateReport(model, _context);
        }

        [HttpPost("[action]")]
        public List<InventoryReportModel> generateInventoryReport([FromBody] WareHouseTransaction model)
        {
            TransactionRepository repository = new TransactionRepository();
            return repository.GenerateInventoryReport(model, _context);
        }

        [HttpGet("[action]")]
        public IEnumerable<product> GetProducts()
        {
            TransactionRepository repo = new TransactionRepository();
            return repo.products(_context);
        }

        [HttpGet("[action]")]
        public IEnumerable<branch> GetBranches()
        {
            TransactionRepository repo = new TransactionRepository();
            return repo.branches(_context);
        }

        [HttpGet("[action]")]
        public IEnumerable<WarehouseCostModel> GetInventoryCost()
        {
            TransactionRepository repo = new TransactionRepository();
            return repo.GetInventoryCost(_context);
        }

        [HttpPost("[action]")]
        public bool UpdateInventoryCost([FromBody] WarehouseCostModel model)
        {
            TransactionRepository repo = new TransactionRepository();
            return repo.UpdateInventoryCost(_context, model);
        }


    }
}