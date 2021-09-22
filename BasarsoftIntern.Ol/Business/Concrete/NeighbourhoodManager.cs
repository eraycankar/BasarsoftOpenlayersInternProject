using BasarsoftIntern.Ol.Business.Abstract;
using BasarsoftIntern.Ol.DataAccess.Abstract;
using BasarsoftIntern.Ol.DataAccess.Concrete;
using BasarsoftIntern.Ol.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace BasarsoftIntern.Ol.Business.Concrete
{
    public class NeighbourhoodManager : INeighbourhoodService
    {
        private readonly INeighbourhoodDal _neighborhoodDal;

        public NeighbourhoodManager(INeighbourhoodDal neighborhoodDal)
        {
            _neighborhoodDal = neighborhoodDal ?? throw new ArgumentNullException(nameof(neighborhoodDal));
        }

        public void Add(Neighbourhood neighbourhood)
        {
            _neighborhoodDal.Add(neighbourhood);
        }

        public void Delete(int id)
        {
            _neighborhoodDal.Delete(id);
        }

        public List<Neighbourhood> GetAll(Expression<Func<Neighbourhood, bool>> filter = null)
        {
            return _neighborhoodDal.GetAll(filter);
        }

        public void Update(Neighbourhood neighbourhood)
        {
            _neighborhoodDal.Update(neighbourhood);
        }
    }
}
