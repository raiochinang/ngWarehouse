using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Models
{
    public class ngpurchase
    {
        public int id { get; set; }
        public string po_number { get; set; }
        public string branch { get; set; }
        public string supplier { get; set; }
        public string status { get; set; }
    }
}
