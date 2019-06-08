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
        public List<ReportModel> generateInventoryReport([FromBody] WareHouseTransaction model)
        {
            TransactionRepository repository = new TransactionRepository();
            return repository.GenerateInventoryReport(model, _context);
        }

    }
}