using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Models
{
    public class ngpurchasedetails
    {

        public int id { get; set; }
        public string po_number { get; set; }
        public int productId { get; set; }
        public string lotNumber { get; set; }
        public int quantity { get; set; }
        public string expireDate { get; set; }
        
    }
}
