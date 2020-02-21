using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Models
{
    public class InventoryReportModel
    {
        public int id { get; set; }
        public string Product { get; set; }
        public string Branch { get; set; }
        public string LotNumber { get; set; }
        public DateTime ExpirationDate { get; set; }
        public int LocationId { get; set; }
        public int Quantity { get; set; }
        public decimal Cost { get; set; }
    }
}
