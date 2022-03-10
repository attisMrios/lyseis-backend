using System;
using System.Linq;
using System.Linq.Expressions;
using LyseisApi.Interfaces;
using Microsoft.EntityFrameworkCore;
using LyseisApi.Enums;

namespace LyseisApi.Base
{
    /// <summary>
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DbContext _dbContext;
        private readonly DbSet<T> _dbSet;
        private string _className;
        private DatabaseEngine _motorBd;
        
        /// <summary>
        /// Get all items
        /// </summary>
        public DbSet<T> Items { get { return _dbSet; } }

        /// <summary>
        /// </summary>
        /// <param name="context"></param>
        /// <param name="className"></param>
        public Repository(DbContext context, String className)
        {
            _dbContext = context;
            _dbSet = _dbContext.Set<T>();
            _className = className;
            Enum.TryParse(DefaultSettings.GetValue("DBEngineType"), out _motorBd);
            
        }

        /// <summary>
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// </summary>
        /// <param name="disposing"></param>
        protected virtual void Dispose(bool disposing)
        {
            if (!disposing) return;
            _dbContext?.Dispose();
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public IQueryable<T> GetAll()
        {
            return _dbSet.AsNoTracking().AsQueryable();
        }

        /// <summary>
        /// </summary>
        /// <param name="paths"></param>
        /// <returns></returns>
        public IQueryable<T> GetAll(params Expression<Func<T, object>>[] paths)
        {
            IQueryable<T> query =
                paths.Aggregate<Expression<Func<T, object>>, IQueryable<T>>(_dbSet,
                    (current, path) => current.Include(path));

            return query.AsNoTracking();
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public long Count()
        {
            return GetAll().LongCount();
        }

        /// <summary>
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public long Count(Expression<Func<T, bool>> predicate)
        {
            return Find(predicate).LongCount();
        }

        /// <summary>
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public IQueryable<T> Find(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.AsNoTracking().Where<T>(predicate);
        }

        /// <summary>
        /// </summary>
        /// <param name="predicate"></param>
        /// <param name="paths"></param>
        /// <returns></returns>
        public IQueryable<T> Find(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] paths)
        {
            IQueryable<T> query = _dbSet.AsNoTracking();
            foreach (var path in paths)
                query = query.Include(path);
            return query.Where<T>(predicate).AsNoTracking();
        }

        /// <summary>
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public T Single(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.AsNoTracking().Single<T>(predicate);
        }

        /// <summary>
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public T SingleOrDefault(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.AsNoTracking().SingleOrDefault<T>(predicate);
        }

        /// <summary>
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public T First(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.AsNoTracking().First<T>(predicate);
        }

        /// <summary>
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public T Last(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.AsNoTracking().Last<T>(predicate);
        }

        /// <summary>
        /// </summary>
        /// <param name="entity"></param>
        public void Add(T entity)
        {
            if (_dbContext.Entry(entity).State == EntityState.Detached)
            {
                Attach(entity);
            }

            _dbSet.Add(entity);
        }

        /// <summary>
        /// </summary>
        /// <param name="entity"></param>
        public void Delete(T entity)
        {
            if (_dbContext.Entry(entity).State == EntityState.Detached)
            {
                Attach(entity);
            }

            _dbSet.Remove(entity);
        }

        /// <summary>
        /// </summary>
        /// <param name="predicate"></param>
        public void Delete(Expression<Func<T, bool>> predicate)
        {
            var entitiesToDelete = _dbSet.Where(predicate).ToList();
            foreach (var entity in entitiesToDelete)
            {
                Delete(entity);
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="entity"></param>
        public void Attach(T entity)
        {
            _dbSet.Attach(entity);
        }

        /// <summary>
        /// save entity changes to table
        /// </summary>
        /// <returns></returns>
        public int SaveChanges()
        {
            return _dbContext.SaveChanges();
        }

        /// <summary>
        /// get the max of field
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public double Max(Expression<Func<T, double>> predicate)
        {
            return _dbSet.Max(predicate);
        }

        /// <summary>
        /// execute sql queries
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public IQueryable<T> FromSQLRaw(string sql, params object[] parameters)
        {
            // return _dbContext.Set<T>().FromSqlRaw<T>(sql, parameters);
            return null;
        }

        /// <summary>
        /// Execute sql raw
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public int ExecuteSqlRaw(string sql)
        {
            try
            {
                return _dbContext.Database.ExecuteSqlRaw(sql);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}