using System;
using LyseisApi.Api.Admin.Business;
using LyseisApi.Api.Admin.Entities.AdminEntities;
using LyseisApi.Base;
using Microsoft.AspNetCore.Mvc;
using Shared.Classess;

namespace LyseisApi.Controllers.Admin
{
    /// <summary>
    /// Companies management
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class CompaniesController: ControllerBase
    {
        /// <summary>
        /// Save company info
        /// </summary>
        /// <param name="companyInfo"></param>
        /// <returns></returns>
        [HttpPost]
        public Result<CompaniesEntity> AddCompany(CompaniesEntity companyInfo)
        {
            Result<CompaniesEntity> result = new Result<CompaniesEntity>();
            string userId = Request.Headers[Shared.Constants.DefaultHeaders.UserId];

            try
            {
                using (var uWork = new AdminUnitOfWork())
                {
                    using (var companyBusiness = new CompaniesBusiness(userId, uWork))
                    {
                        companyBusiness.AddCompany(companyInfo);
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            
            return result;
        }
        
    }
}