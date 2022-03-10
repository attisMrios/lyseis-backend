using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using LyseisApi.Api.Admin.Business;
using LyseisApi.Base;
using Microsoft.Extensions.Logging;
using Shared.Classess;
using Shared.Enums;


namespace LyseisApi.Controllers.Admin
{
    /// <summary>
    /// Manage 
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly ILogger<AdminController> _logger;

        /// <summary>
        /// Create all application schemas
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public Result<List<string>> CreateSchemas()
        {
            Result<List<string>> result = new Result<List<string>>();
            
            try
            {
                string userId = Request.Headers[Shared.Constants.DefaultHeaders.UserId];
                using AdminUnitOfWork adminUnitOfWork = new AdminUnitOfWork();
                using CompaniesBusiness companies = new CompaniesBusiness(userId, adminUnitOfWork);
                var errorList = companies.CreateAdminSchema();
                result.ResultStatus = Status.Success;
                result.Data = errorList;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                result.Message = e.Message;
                result.ResultStatus = Status.Error;
            }

            return result;
        }

        /// <summary>
        /// Start Up Lyseis web api
        /// 1 - create database schemas
        /// 2 - create start up info
        /// </summary>
        /// <returns>void</returns>
        /// <Author>mrios</Author>
        [HttpPost]
        [Route("getstarted")]
        public Result<bool> GetStarted()
        {
            Result<bool> result = new Result<bool>();
            
            try
            {
                string userId = Request.Headers["user_id"];
                using (AdminUnitOfWork adminUnitOfWork = new AdminUnitOfWork())
                {
                    using (CompaniesBusiness companiesBusiness = new CompaniesBusiness(userId, adminUnitOfWork))
                    {
                        CreateSchemas();
                        companiesBusiness.CreateStartUpInfo();
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