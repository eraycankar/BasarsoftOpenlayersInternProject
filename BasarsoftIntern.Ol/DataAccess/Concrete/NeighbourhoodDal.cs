using BasarsoftIntern.Ol.Core.DataAccess.EntityFramework;
using BasarsoftIntern.Ol.DataAccess.Abstract;
using BasarsoftIntern.Ol.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BasarsoftIntern.Ol.DataAccess.Concrete
{
    public class NeighbourhoodDal:EfEntityRepositoryBase<Neighbourhood>,INeighbourhoodDal
    {
        public NeighbourhoodDal(DevDBContext context):base(context)
        {

        }
    }
}
