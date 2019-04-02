using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Models
{
    public class ngInventoryTrx
    {
        public int id { get; set; }
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
    }
}
