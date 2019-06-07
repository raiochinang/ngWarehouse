using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Models
{
    public class inventory_view
    {
        public int id { get; set; }
        public int quantity { get; set; }
        public string lotNumber { get; set; }
        public string expiryDate { get; set; }
        public string fullName { get; set; }
        public string branch { get; set; }
        public string item { get; set; }
        public int locationId { get; set; }
        public string brandcode { get; set; }
        public DateTime transactionDate { get; set; }
    }
}


