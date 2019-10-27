using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TypeSmash.Models;

namespace TypeSmash.Models
{
    public class ApplicationDbContext : DbContext
    {
        public virtual DbSet<Match> Matches { get; set; }
        public virtual DbSet<Player> Players { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    }
}
