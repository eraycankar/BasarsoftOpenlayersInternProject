using BasarsoftIntern.Ol.Models;
using BasarsoftIntern.Ol.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BasarsoftIntern.Ol.Business.Abstract
{
    public interface IDoorService
    {
        List<Door> GetAll(Expression<Func<Door, bool>> filter = null);
        void Add(Door door);
        void Update(Door door);
        void Delete(int id);

        DoorDto GetDoorById(int id);
    }
}
