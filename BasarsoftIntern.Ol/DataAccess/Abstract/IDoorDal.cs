using BasarsoftIntern.Ol.Core.DataAccess;
using BasarsoftIntern.Ol.Models;
using BasarsoftIntern.Ol.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BasarsoftIntern.Ol.DataAccess.Abstract
{
   public  interface IDoorDal:IEntityRepository<Door>
    {
        DoorDto GetDoorById(int id);
       
    }
}
