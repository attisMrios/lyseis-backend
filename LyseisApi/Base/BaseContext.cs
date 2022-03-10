using System;
using LyseisApi.Enums;
using Microsoft.EntityFrameworkCore;
using static System.Enum;

namespace LyseisApi.Base
{
    public class BaseContext : DbContext
    {
        // Database connection string
        private string ConnectionString { get; set; } = "";
        private bool _testing = false;

        // defines the type of engine to use
        private DatabaseEngine DbEngineType { get; set; } = DatabaseEngine.PostgreSql;

        public string Schema => GetValueConnectionString("Search Path", ConnectionString);

        public BaseContext() : base(GetOptions())
        {
            BeginConfiguring();
        }

        /// <summary>
        /// only for unit test
        /// </summary>
        /// <param name="options"></param>
        public BaseContext(DbContextOptions options) : base(options)
        {
            _testing = true;
        }

        private static DbContextOptions GetOptions()
        {
            TryParse(DefaultSettings.GetValue("DBEngineType"), out DatabaseEngine engineType);

            DbContextOptions contextOptions = null;
            switch (engineType)
            {
                case DatabaseEngine.PostgreSql:
                    contextOptions = NpgsqlDbContextOptionsBuilderExtensions.UseNpgsql(new DbContextOptionsBuilder(),
                        DefaultSettings.GetConnectionString("PostgreSql")).Options;
                    break;
            }

            return contextOptions;
        }

        /// <summary>
        /// Set connection string depending of the database engine previously selected
        /// </summary>
        /// <param name="optionsBuilder"></param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (_testing) return;
            try
            {
                if (!optionsBuilder.IsConfigured)
                {
                    switch (DbEngineType)
                    {
                        case DatabaseEngine.PostgreSql:
                            optionsBuilder.UseNpgsql(ConnectionString);
                            break;
                    }
                }
            }
            catch (Exception ex)
            {
                System.Console.WriteLine(ex.Message);
                throw;
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            if (_testing) return;
            // if (DbEngineType == DatabaseEngine.PostgreSql)
            // {
            //     foreach (var entity in modelBuilder.Model.GetEntityTypes())
            //     {
            //         entity.SetTableName(entity.GetTableName()?.ToLower());
            //     }
            // }
        }

        private void BeginConfiguring()
        {
            this.ChangeTracker.LazyLoadingEnabled = false;
            this.ChangeTracker.AutoDetectChangesEnabled = false;
        }

        /// <summary>
        /// This method search on the connection string the param named "search"
        /// normally this method is used to get the default schema
        /// </summary>
        /// <param name="search"></param>
        /// <param name="connectionString"></param>
        /// <returns></returns>
        private string GetValueConnectionString(string search, string connectionString = "")
        {
            var value = "";

            // try
            // {
            //     connectionString = (string.IsNullOrEmpty(connectionString)) ? GetConnectionString() : connectionString;
            //     var dataConections = connectionString.Split(';');
            //
            //     foreach (string data in dataConections)
            //     {
            //         if (!data.Contains(search)) continue;
            //         if (search == "Data Source")
            //         {
            //             value = data.Replace("Data Source=", "");
            //         }
            //         else
            //         {
            //             value = data.Split('=')[1];
            //         }
            //
            //         break;
            //     }
            // }
            // catch (Exception ex)
            // {
            //     System.Console.WriteLine(ex.Message);
            // }

            return value;
        }

        public string GetConnectionString()
        {
            //return Database.GetDbConnection().ConnectionString;
            return "";
        }
    }
}