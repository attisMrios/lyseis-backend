using System;
using System.Linq;
using System.Linq.Expressions;

namespace LyseisApi.Interfaces
{
    public interface IRepository<T> : IDisposable where T : class
    {
        IQueryable<T> GetAll();
        IQueryable<T> GetAll(params Expression<Func<T, object>>[] paths);
        long Count();
        long Count(Expression<Func<T, bool>> predicate);
        IQueryable<T> Find(Expression<Func<T, bool>> predicate);
        IQueryable<T> Find(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] paths);
        T Single(Expression<Func<T, bool>> predicate);
        T SingleOrDefault(Expression<Func<T, bool>> predicate);
        T First(Expression<Func<T, bool>> predicate);
        T Last(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        void Delete(T entity);
        void Delete(Expression<Func<T, bool>> predicate);
        void Attach(T entity);
        int SaveChanges();
        double Max(Expression<Func<T, double>> predicate); 
        IQueryable<T> FromSQLRaw(string sql, params object[] parameters);
        
    }
}