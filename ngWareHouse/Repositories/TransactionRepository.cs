﻿using ngWareHouse.Models;
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
            if (model.TransactionType == "out")
            {
                var report = (
                            from w in db.WareHouseTransaction
                            join b in db.branches on w.LocationId equals b.id
                            join p in db.products on w.ProductId equals p.id
                            join u in db.dscr_user_roles on w.UserId equals u.id
                            join b1 in db.branches on w.DeliveredTo equals b1.id
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
                                UserName = u.full_name_fld,
                                DeliveryTo = b1.name
                            }
                         )
                         .Where(q =>
                            q.TransactionDate >= model.LastUpdate.Date.AddDays(1) &&
                            q.TransactionDate <= model.LastUpdateTo.Date &&
                            q.LocationId == model.LocationId &&
                            q.TransactionType == model.TransactionType
                         ).ToList();
                return report;
            }
            else
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
                            q.TransactionDate >= model.LastUpdate.Date &&
                            q.TransactionDate <= model.LastUpdateTo.Date &&
                            q.LocationId == model.LocationId &&
                            q.TransactionType == model.TransactionType
                         ).ToList();
                return report;
            }

        }

        public List<InventoryReportModel> GenerateInventoryReport(WareHouseTransaction model, hooDbContext db)
        {
            return db.InventoryReportModels.Where(q => q.LocationId == model.LocationId).ToList(); ;
        }

        public List<product> products(hooDbContext db)
        {
            return db.products.ToList();
        }

        public List<branch> branches(hooDbContext db)
        {
            return db.branches.ToList();
        }

        public List<WarehouseCostModel> GetInventoryCost(hooDbContext db)
        {
            return db.WarehouseCostReportModel.OrderBy(r => r.ProductName).ToList();
        }

        public bool UpdateInventoryCost(hooDbContext db, WarehouseCostModel model)
        {
            using (var trx = db.Database.BeginTransaction())
            {
                try
                {
                    var dbWarehouseCost = db.WarehouseCost.Where(w => w.ProductId == model.ProductId).SingleOrDefault();

                    if (dbWarehouseCost == null)
                    {
                        //Add
                        var warehouseCost = new WarehouseCost();
                        warehouseCost.Cost = model.Cost;
                        warehouseCost.ProductId = model.ProductId;
                        db.WarehouseCost.Add(warehouseCost);
                    }
                    else
                    {
                        //update
                        dbWarehouseCost.Cost = model.Cost;
                    }
                    db.SaveChanges();
                    trx.Commit();

                }
                catch (Exception ex)
                {
                    trx.Rollback();
                    return false;
                }
                finally
                {
                    trx.Dispose();
                }
            }
            return true;
        }
    }
}
