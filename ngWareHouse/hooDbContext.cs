using Microsoft.EntityFrameworkCore;
using ngWareHouse.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse
{
    public partial class hooDbContext : DbContext
    {
        public hooDbContext(DbContextOptions<hooDbContext> options) : base(options) { }

        public DbSet<dscr_user_roles> dscr_user_roles { get; set; }
        public DbSet<product> products { get; set; }
        public DbSet<branch> branches { get; set; }

        //New Approach
        public DbSet<WarehouseMaster> WareHouseMaster { get; set; }
        public DbSet<WareHouseTransaction> WareHouseTransaction { get; set; }


    }
}
