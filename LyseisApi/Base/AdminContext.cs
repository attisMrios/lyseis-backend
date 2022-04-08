using System.Configuration;
using LyseisApi.Api.Admin.Entities.AdminEntities;
using Microsoft.EntityFrameworkCore;

namespace LyseisApi.Base
{
    ///
    public class AdminContext : BaseContext
    {
        ///
        public AdminContext() : base()
        { }

        /// <summary>
        /// only for unit test
        /// </summary>
        /// <param name="options"></param>
        public AdminContext(DbContextOptions options) : base(options)
        { }

        #region DBSetProperties

        ///
        public DbSet<CompaniesEntity> Companies { get; set; }
        ///
        public DbSet<UsersEntity> Users { get; set; }
        ///
        public DbSet<CryptoEntity> Crypto { get; set; }

        #endregion
    }
}