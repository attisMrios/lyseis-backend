using System.IO;
using Microsoft.Extensions.Configuration;

namespace LyseisApi.Base
{
    ///
    public class DefaultSettings
    {
        private static IConfigurationRoot Settings { get; set; }

        /// 
        public static string GetConnectionString(string connectionString){
            if( Settings == null)
            {
                GetCurrentSettings();
            }
            
            return Settings?.GetSection($"ConnectionStrings:{connectionString}").Value;
        }
        
        private static void GetCurrentSettings()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            Settings = builder.Build();
        }
        ///
        public static string GetValue(string section)
        {
            if( Settings == null)
            {
                GetCurrentSettings();
            }
            return Settings?.GetSection($"DefaultSetting:{section}").Value;
        }
        
        /// <summary>
        /// Get value from app settings
        /// </summary>
        /// <param name="section"></param>
        /// <returns></returns>
        public static string GetSection(string section)
        {
            if( Settings == null)
            {
                GetCurrentSettings();
            }
            return Settings?.GetSection(section).Value;
        }
    }
}