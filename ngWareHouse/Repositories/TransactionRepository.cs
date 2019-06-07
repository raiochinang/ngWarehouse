using ngWareHouse.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Repositories
{
    public class TransactionRepository
    {
        public WareHouseTransaction PostTransaction(WareHouseTransaction model, hooDbContext db)
        {
            var error = "";
            //single transaction
            using (var trx = db.Database.BeginTransaction())
            {
                try
                {
                    //Insert on WareHouseTransaction table
                    db.WareHouseTransaction.Add(model);
                    db.SaveChanges();

                    //Insert/Update the WareHouseMaster table
                    var master = db.WareHouseMaster.Where(m =>
                        m.LocationId == model.LocationId &&
                        m.ProductId == model.ProductId &&
                        m.LotNumber == model.LotNumber 
                    ).SingleOrDefault();

                    //Insert 
                    if (master == null)
                    {
                        var m = new WarehouseMaster();
                        m.ProductId = model.ProductId;
                        m.LotNumber = model.LotNumber;
                        m.ExpirationDate = model.ExpirationDate;
                        m.LocationId = model.LocationId;
                        m.Quantity = model.Quantity;

                        db.WareHouseMaster.Add(m);
                    }
                    //Update
                    else
                    {
                        if (model.TransactionType == "in")
                        {
                            master.Quantity += model.Quantity;
                        }
                        else if (model.TransactionType == "out" || model.TransactionType == "consumption")
                        {
                            master.Quantity -= model.Quantity;
                        }
                        else if (model.TransactionType == "adjustment")
                        {
                            master.Quantity = model.Quantity;
                        }
                    }
                    db.SaveChanges();
                    trx.Commit();
                }
                catch (Exception ex)
                {
                    trx.Rollback();
                    error = ex.Message;
                }
                finally
                {
                    trx.Dispose();
                }
            }

            return model;
        }
    }
}
