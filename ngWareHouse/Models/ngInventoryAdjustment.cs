using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Models
{
    public class ngInventoryAdjustment
    {
        public int id { get; set; }
        public string lotNumber { get; set; }
        public string item { get; set; }
        public int updatequantity { get; set; }
        public string comment { get; set; }
        public int productId { get; set; }
        public int locationId { get; set; }
        public int userId { get; set; }
        public string branch { get; set; }
    }
}