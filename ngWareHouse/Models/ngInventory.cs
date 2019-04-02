using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Models
{
    public class ngInventory
    {

        public int id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string LotNumber { get; set; }
        public string ExpiryDate { get; set; }
        public int UserId { get; set; }
        public int LocationId { get; set; }
    }
}
