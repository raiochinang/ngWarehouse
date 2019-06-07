using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Models
{
    public class WarehouseMaster
    {
        public int WareHouseMasterId { get; set; }
        public int ProductId { get; set; }
        public string LotNumber { get; set; }
        public int Quantity { get; set; }
        public DateTime ExpirationDate { get; set; }
        public int LocationId { get; set; }
    }
}
