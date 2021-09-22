using BasarsoftIntern.Ol.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BasarsoftIntern.Ol.DataAccess.Concrete
{
    public class DevDBContext:DbContext
    {
        public DevDBContext(DbContextOptions options)
    :       base(options)
        { }
       
        public DbSet<Neighbourhood> Neighbourhoods { get; set; }

        public DbSet<Door> Doors { get; set; }
    }
}
