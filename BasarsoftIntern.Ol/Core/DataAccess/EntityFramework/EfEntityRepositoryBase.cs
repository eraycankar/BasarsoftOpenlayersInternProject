using BasarsoftIntern.Ol.DataAccess.Concrete;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BasarsoftIntern.Ol.Core.DataAccess.EntityFramework
{
    public class EfEntityRepositoryBase<T> : IEntityRepository<T>
        where T : class,new()

    {

        private readonly DevDBContext _context;
        private readonly DbSet<T> _dbSet;

        public EfEntityRepositoryBase(DevDBContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _dbSet = _context.Set<T>();
        }

        public List<T> GetAll(Expression<Func<T, bool>> filter = null)
        {
            return filter == null ? _dbSet.ToList() : _dbSet.Where(filter).ToList();
        }

        public void Add(T entity)
        {
            _dbSet.Add(entity);
            _context.SaveChanges();
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            var entity = _dbSet.Find(id);
            _dbSet.Remove(entity);
            _context.SaveChangesAsync();
        }

      
    }
}

