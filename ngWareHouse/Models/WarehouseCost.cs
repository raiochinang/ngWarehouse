using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Models
{
    public class WarehouseCost
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public decimal? Cost { get; set; }
    }
}
