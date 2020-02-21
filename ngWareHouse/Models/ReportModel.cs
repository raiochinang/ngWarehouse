using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Models
{
    public class ReportModel
    {
        public int id { get; set; }
        public string Product { get; set; }
        public string Branch { get; set; }
        public int LocationId { get; set; }
        public int ProductId { get; set; }
        public string UserName { get; set; }
        public string LotNumber { get; set; }
        public int Quantity { get; set; }
        public string Reference { get; set; }
        public DateTime TransactionDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string Comment { get; set; }
        public string TransactionType { get; set; }
        public string DeliveryTo { get; set; } 
        public decimal? Cost { get; set; }

    }
}