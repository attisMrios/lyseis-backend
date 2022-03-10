using System;
using LyseisApi.Api.Admin.Business;
using LyseisApi.Api.Admin.Entities.AdminEntities;
using LyseisApi.Api.Admin.Models;
using LyseisApi.Base;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Classess;
using Shared.Enums;

namespace LyseisApi.Controllers.Admin
{
    /// <summary>
    /// Users management
    /// </summary>
    [ApiController]
    [Route("users")]
    public class UsersController: ControllerBase
    {
        /// <summary>
        /// Save user information
        /// </summary>
        /// <param name="userInfo"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("add")]
        [Authorize]
        public Result<UsersEntity> Add(UsersEntity userInfo)
        {
            var result = new Result<UsersEntity>();
            try
            {
                using var uWork = new AdminUnitOfWork();
                using var business = new UsersBusiness(adminUnitOfWork: uWork);
                var md5 = new System.Security.Cryptography.MD5CryptoServiceProvider();

                business.AddUser(userInfo);
                result.Data = userInfo;
                result.ResultStatus = Status.Success;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                result.ResultStatus = Status.Error;
                throw;
            }
            return result;
        }
    }
}