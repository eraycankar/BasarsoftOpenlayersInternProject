using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BasarsoftIntern.Ol.Models
{
    public class Neighbourhood
    {
        [Key]
        public int NeighborhoodId { get; set; }
        public string NeighborhoodName { get; set; }
        public string Coordinates { get; set; }
    }
    
}
