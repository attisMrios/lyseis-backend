using System;
using LyseisApi.Api.Admin.Repositories;
using LyseisApi.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LyseisApi.Base
{
    /// <summary>
    /// Unit of work from admin schema
    /// </summary>
    public class AdminUnitOfWork : IUnitOfWork
    {
        private AdminContext _context;
        
        /// <summary>
        /// Default constructor
        /// </summary>
        public AdminUnitOfWork()
        {
            _context = new AdminContext();
        }

        /// <summary>
        /// only for unit test
        /// </summary>
        /// <param name="options"></param>
        public AdminUnitOfWork(DbContextOptions options)
        {
            _context = new AdminContext(options);
        }
        /// <summary>
        /// From IDisposable
        /// </summary>
        public void Dispose()
        {
            if (_context != null)
            {
                _context.Dispose();
                GC.SuppressFinalize(this);
            }
            _context = null;
        }

        /// <summary>
        /// Save Data
        /// </summary>
        /// <returns></returns>
        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public BaseContext GetDbContext()
        {
            return _context;
        }

        #region Repositories

        private CompaniesRepository _companiesRepository;
        /// <summary>
        /// </summary>
        public CompaniesRepository CompaniesRepository { get { return _companiesRepository ??= new CompaniesRepository(_context); } }


        private UsersRepository _usersRepository;
        /// <summary>
        /// </summary>
        public UsersRepository UsersRepository { get { return _usersRepository ??= new UsersRepository(_context); } }

        private CryptoRepository _cryptoRepository;
        /// <summary>
        /// </summary>
        public CryptoRepository CryptoRepository { get { return _cryptoRepository ??= new CryptoRepository(_context); } }

        #endregion
    }
}