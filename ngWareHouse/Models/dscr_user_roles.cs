using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Models
{
    public partial class dscr_user_roles
    {
        public int id { get; set; }
        public string user_name { get; set; }
        public string password { get; set; }
        public string full_name_fld { get; set; }
        public Nullable<int> branch_id { get; set; }
        public string branch_code { get; set; }
        public string branch { get; set; }
        public string role_name { get; set; }
        public long role_id { get; set; }
    }
}
