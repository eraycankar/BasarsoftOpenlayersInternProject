using BasarsoftIntern.Ol.Core.DataAccess.EntityFramework;
using BasarsoftIntern.Ol.DataAccess.Abstract;
using BasarsoftIntern.Ol.Models;
using BasarsoftIntern.Ol.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BasarsoftIntern.Ol.DataAccess.Concrete
{
    public class DoorDal:EfEntityRepositoryBase<Door>,IDoorDal
    {
        private readonly DevDBContext _context;
        public DoorDal(DevDBContext context) : base(context)
        {
            _context = context;
        }

        public DoorDto GetDoorById(int id)
        {
            var result = from door in _context.Doors
                         join neigh in _context.Neighbourhoods
                         on door.NeighborhoodNumber equals neigh.NeighborhoodId
                         where door.Id == id
                         select new DoorDto
                         {
                             DoorNumber = door.DoorNumber,
                             NeighborhoodName = neigh.NeighborhoodName,
                             x = door.x,
                             y = door.y,
                             NeighborhoodNumber=neigh.NeighborhoodId
                         };
            return result.FirstOrDefault();

        }

        //public List<FilteredDoorDto> GetDoorDto()
        //{
        //    var result = from door in _context.Doors
        //                 join neigh in _context.Neighbourhoods
        //                 on door.NeighborhoodNumber equals neigh.NeighborhoodId
        //                 select new FilteredDoorDto
        //                 {
        //                     Id = door.Id,
        //                     DoorNumber = door.DoorNumber,
        //                     NeighborhoodName = neigh.NeighborhoodName
        //                 };
        //    return result.ToList();
        //}
    }
}
