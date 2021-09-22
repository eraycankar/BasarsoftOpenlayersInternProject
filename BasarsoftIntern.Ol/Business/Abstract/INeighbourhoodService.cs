
using BasarsoftIntern.Ol.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BasarsoftIntern.Ol.Business.Abstract
{
    public interface INeighbourhoodService
    {
        List<Neighbourhood> GetAll(Expression<Func<Neighbourhood, bool>> filter = null);
        void Add(Neighbourhood neighbourhood);
        void Update(Neighbourhood neighbourhood);
        void Delete(int id);
    }
}
