using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Models
{
    public partial class product
    {
        public long id { get; set; }
        public string item { get; set; }
        public string barcode { get; set; }
    }
}
