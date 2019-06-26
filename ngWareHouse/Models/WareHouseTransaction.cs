using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Models
{
    public class WareHouseTransaction
    {
        public int WareHouseTransactionId { get; set; }
        public int LocationId { get; set; }
        public int ProductId { get; set; }
        public string LotNumber { get; set; }
        public string TransactionType { get; set; }
        public int DeliveredTo { get; set; }
        public int Quantity { get; set; }
        public string Reference { get; set; }
        public int UserId { get; set; }
        public DateTime LastUpdate { get; set; }
        public DateTime LastUpdateTo { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string Comment { get; set; }

    }
}
