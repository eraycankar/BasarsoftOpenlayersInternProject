using BasarsoftIntern.Ol.Business.Abstract;
using BasarsoftIntern.Ol.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BasarsoftIntern.Ol.Controllers
{
    public class NeighborhoodController : Controller
    {
        private readonly INeighbourhoodService _neighbourhoodManager;

        public NeighborhoodController(INeighbourhoodService neighbourhoodManager)
        {
            _neighbourhoodManager = neighbourhoodManager;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]

        public JsonResult GetAll()
        {
            var _coords = _neighbourhoodManager.GetAll();
            return Json(_coords);
        }

        [HttpPost]
        public JsonResult SaveNeighborhood(Neighbourhood neighborhood)
        {
            _neighbourhoodManager.Add(neighborhood);
            return Json("");
        }

        [HttpPut]

        public JsonResult Update( string result, int id)
        {
            var updateNeigh = _neighbourhoodManager.GetAll(p => p.NeighborhoodId  == id).SingleOrDefault();
            updateNeigh.Coordinates = result;
            _neighbourhoodManager.Update(updateNeigh);
            return Json("");
            
        }

        [HttpPut]

        public JsonResult UpdateName(int code,string newName)
        {
            var result = _neighbourhoodManager.GetAll(p => p.NeighborhoodId == code).SingleOrDefault();
            result.NeighborhoodName = newName;
            _neighbourhoodManager.Update(result);
            return Json("");

        }

        [HttpDelete]

        public JsonResult Delete(int code)
        {
            _neighbourhoodManager.Delete(code);
            return Json("");
        }


    }
}
