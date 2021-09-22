using BasarsoftIntern.Ol.Business.Abstract;
using BasarsoftIntern.Ol.DataAccess.Abstract;
using BasarsoftIntern.Ol.Models;
using BasarsoftIntern.Ol.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace BasarsoftIntern.Ol.Business.Concrete
{
    public class DoorManager : IDoorService
    {
        private readonly IDoorDal _doorDal;

        public DoorManager(IDoorDal doorDal)
        {
            _doorDal = doorDal ?? throw new ArgumentNullException(nameof(doorDal));
        }

        public void Add(Door door)
        {
            _doorDal.Add(door);
        }

        public void Delete(int id)
        {
            _doorDal.Delete(id);
        }

        public List<Door> GetAll(Expression<Func<Door, bool>> filter = null)
        {
            return _doorDal.GetAll(filter);
        }

        public DoorDto GetDoorById(int id)
        {
            return _doorDal.GetDoorById(id);
        }


        public void Update(Door door)
        {
            _doorDal.Update(door);
        }
    }
}
