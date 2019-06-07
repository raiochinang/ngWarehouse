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

        public WarehouseMaster GetRemainingQuantity(WareHouseTransaction model, hooDbContext db)
        {
            var master = db.WareHouseMaster.Where(m =>
                        m.LocationId == model.LocationId &&
                        m.ProductId == model.ProductId &&
                        m.LotNumber == model.LotNumber
                    ).SingleOrDefault();
            return master;
        }

        public List<ReportModel> GenerateReport(WareHouseTransaction model, hooDbContext db)
        {
            var report = (
                            from w in db.WareHouseTransaction
                            join b in db.branches on w.LocationId equals b.id
                            join p in db.products on w.ProductId equals p.id
                            join u in db.dscr_user_roles on w.UserId equals u.id
                            select new ReportModel
                            {
                                LotNumber = w.LotNumber,
                                TransactionType = w.TransactionType,
                                Quantity = w.Quantity,
                                Reference = w.Reference,
                                TransactionDate = w.LastUpdate,
                                ExpirationDate = w.ExpirationDate,
                                Comment = w.Comment,
                                Branch = b.name,
                                Product = p.item,
                                LocationId = w.LocationId,
                                UserName = u.full_name_fld
                            }
                         )
                         .Where(q =>
                            q.TransactionDate.Date == model.LastUpdate.Date &&
                            q.LocationId == model.LocationId &&
                            q.TransactionType == model.TransactionType
                         )
                         .ToList();
            return report;
        }
    }
}
