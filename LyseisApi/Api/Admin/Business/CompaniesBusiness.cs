using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using LyseisApi.Api.Admin.Entities.AdminEntities;
using LyseisApi.Base;
using Microsoft.EntityFrameworkCore;

namespace LyseisApi.Api.Admin.Business
{
    /// <summary>
    /// Business logic for Company
    /// </summary>
    public class CompaniesBusiness : BusinessBase
    {
        /// <summary>
        /// Constructor for company business
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="adminUnitOfWork"></param>
        public CompaniesBusiness(string userId, AdminUnitOfWork adminUnitOfWork)
            : base(nameof(CompaniesBusiness), userId: userId, adminUnitOfWork: adminUnitOfWork)
        {
        }

        /// <summary>
        /// loops to create the admin Schema
        /// </summary>
        /// <returns></returns>
        public List<string> CreateAdminSchema()
        {
            List<string> errorsList = new List<string>();
            try
            {
                // read sql script file
                string[] scripts = System.IO.File.ReadAllText(System.IO.Path.Combine(
                    Shared.Constants.SystemPaths.Resources,
                    "AdminDataBase.sql")).Split(';');

                foreach (var script in scripts)
                {
                    try
                    {
                        AdminUnitOfWork.CompaniesRepository.ExecuteSqlRaw(script);
                    }
                    catch (DbUpdateException sqlException)
                    {
                        errorsList.Add(sqlException.Message);
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                        errorsList.Add(e.Message);
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

            return errorsList;
        }

        /// <summary>
        /// Create basic info for start up the company
        /// </summary>
        public void CreateStartUpInfo()
        {
            try
            {
                // prepare company info
                CompaniesEntity companyInfo = new CompaniesEntity()
                {
                    Address = "pereira",
                    Ciudad = "Pereira",
                    Email = "lyseis@gmail.com",
                    TaxInformationNumber = 123,
                    CompanyName = "LYSEIS",
                    LogoUrl = "/",
                    MobileNumber = "321321",
                    NuidDigit = "0",
                    PhoneNumber = "3178915937",
                    WebSite = "http://lyseis.co",
                    CreatedAt = DateTime.Now
                };

                // save company info
                AddCompany(companyInfo);
                
                // save crypt and decrypt keys
                // using (var crypto = new CryptoBusiness(UserId, AdminUnitOfWork))
                // {
                //     var rsa = new RSACryptoServiceProvider();
                //     
                //     // keys to encrypt
                //     var cryptoParametersFalse = rsa.ExportParameters(false);
                //     var cryptoInfo = new CryptoEntity()
                //     {
                //         Parameters = false,
                //         D = cryptoParametersFalse.D,
                //         P = cryptoParametersFalse.P,
                //         Q = cryptoParametersFalse.Q,
                //         DP = cryptoParametersFalse.DP,
                //         DQ = cryptoParametersFalse.DQ,
                //         InverseQ = cryptoParametersFalse.InverseQ,
                //         Exponent = cryptoParametersFalse.Exponent,
                //         Modulus = cryptoParametersFalse.Modulus
                //     };
                //     crypto.AddCryptoInfo(cryptoInfo);
                //     
                //     // keys to decrypt
                //     cryptoParametersFalse = rsa.ExportParameters(true);
                //     cryptoInfo = new CryptoEntity()
                //     {
                //         Parameters = true,
                //         D = cryptoParametersFalse.D,
                //         P = cryptoParametersFalse.P,
                //         Q = cryptoParametersFalse.Q,
                //         DP = cryptoParametersFalse.DP,
                //         DQ = cryptoParametersFalse.DQ,
                //         InverseQ = cryptoParametersFalse.InverseQ,
                //         Exponent = cryptoParametersFalse.Exponent,
                //         Modulus = cryptoParametersFalse.Modulus
                //     };
                //     
                //     crypto.AddCryptoInfo(cryptoInfo);
                // }

                // prepare user info
                var users = new UsersEntity()
                {
                    Password = "123456Aa",
                    CreatedAt = DateTime.Now,
                    LastLogin = null,
                    UserName = "Admin"
                };

                using (var usersBusiness = new UsersBusiness(UserId, AdminUnitOfWork))
                {
                    usersBusiness.AddUser(users);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        /// <summary>
        /// Save company info
        /// </summary>
        /// <param name="companyInfo"></param>
        public void AddCompany(CompaniesEntity companyInfo)
        {
            try
            {
                AdminUnitOfWork.CompaniesRepository.Add(companyInfo);
                AdminUnitOfWork.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        /// <summary>
        /// Obtains company info
        /// </summary>
        /// <returns></returns>
        public CompaniesEntity GetCompanyInfo(int taxInformationNumber)
        {
            return AdminUnitOfWork.CompaniesRepository.Items.FirstOrDefault(company => company.TaxInformationNumber == taxInformationNumber);
        }
    }
}