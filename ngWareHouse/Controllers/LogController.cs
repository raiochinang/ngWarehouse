﻿using Microsoft.AspNetCore.Mvc;
using ngWareHouse.Models;
using ngWareHouse.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ngWareHouse.Controllers
{
    [Route("api/[controller]")]
    public class LogController : Controller
    {
        private readonly hooDbContext _context;

        public LogController(hooDbContext context)
        {
            _context = context;
        }

        [HttpPost("[action]")]
        public dscr_user_roles Login([FromBody] dscr_user_roles user)
        {
            LogRepository repo = new LogRepository();
            return repo.Login(user, _context);
        }
    }
}
