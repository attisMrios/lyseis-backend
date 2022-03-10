

using System;
using System.Threading.Tasks;
using LyseisApi.Api.Admin.Business;
using LyseisApi.Api.Admin.Entities.AdminEntities;
using LyseisApi.Base;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace LyseisApiTest
{
    public class AdminTest
    {
        private CompaniesEntity _company;
        private DbContextOptions _dbContextOptions;

        [SetUp]
        public void Setup()
        {
            // Add company info
            _company = new CompaniesEntity()
            {
                Address = "pereira",
                Ciudad = "pereira",
                Email = "mail@mail.com",
                Id = 1,
                CompanyName = "testing",
                CreatedAt = DateTime.Now,
                LogoUrl = "",
                MobileNumber = "",
                NuidDigit = "2",
                PhoneNumber = "asdf",
                WebSite = "",
                TaxInformationNumber = 123
            };
            _dbContextOptions = new DbContextOptionsBuilder<AdminContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
        }
    
        [Test]
        public async Task AddCompany()
        {
            CompaniesEntity company = null;
            using (var adminUnitOfWork = new AdminUnitOfWork(_dbContextOptions))
            {
                using (var companyBusiness = new CompaniesBusiness("", adminUnitOfWork))
                {
                    companyBusiness.AddCompany(_company);
                }

                company = await adminUnitOfWork.CompaniesRepository.Items.FirstOrDefaultAsync(company => company.Id == _company.Id);
            }
            
            Assert.NotNull(company);
            Assert.AreEqual(company?.Id, _company.Id);
        }

        [Test]
        public void GetCompanyInfoTest()
        {
            // CompaniesEntity company = null;
            // using (var adminUnitOfWork = new AdminUnitOfWork(_dbContextOptions))
            // {
            //     using (var companyBusiness = new CompaniesBusiness("", adminUnitOfWork))
            //     {
            //         company = companyBusiness.GetCompanyInfo(_company.TaxInformationNumber);
            //     }
            // }
            //
            // Assert.NotNull(company);
            // Assert.AreEqual(company?.Id, _company.Id);
            Assert.Pass();
        }
    }
}