using ngWareHouse.Controllers;
using ngWareHouse.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Repositories
{
    public class ProductRepository
    {
        public List<product> products(hooDbContext db)
        {
            return db.products.ToList();
        }

        public List<branch> branches(hooDbContext db)
        {
            return db.branches.ToList();
        }

        public bool ProductEntry(productEntry entry, hooDbContext db)
        {
            var e = new ngInventoryTrx
            {
                branch = entry.branch,
                barcode = entry.barcode,
                lotNumber = entry.lotNumber,
                item = entry.item,
                quantity = entry.quantity,
                expiryDate = entry.expiryDate,
                comment = entry.comment,
                productId = entry.productId,
                locationId = entry.locationId,
                userId = entry.userId
            };
            db.inventorytrx.Add(e);

            return true;
        }

        public void UpdateInventory(productEntry entry, hooDbContext db)
        {
            var record = db.inventory.Where(r => r.LocationId == entry.locationId && r.ProductId == entry.productId && r.LotNumber == entry.lotNumber).SingleOrDefault();
            if (record == null)
            {
                //insert
                var e = new ngInventory
                {
                    ProductId = entry.productId,
                    Quantity = entry.quantity,
                    LotNumber = entry.lotNumber,
                    ExpiryDate = entry.expiryDate,
                    UserId = entry.userId,
                    LocationId = entry.locationId
                };
                db.inventory.Add(e);


            }
            else
            {
                //update
                record.ProductId = entry.productId;
                record.Quantity += entry.quantity;
                record.LotNumber = entry.lotNumber;
                record.ExpiryDate = entry.expiryDate;
                record.UserId = entry.userId;
                record.LocationId = entry.locationId;
            }
           
        }
    }
}
