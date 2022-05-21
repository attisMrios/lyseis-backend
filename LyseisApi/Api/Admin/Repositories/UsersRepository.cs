using System;
using LyseisApi.Api.Admin.Entities.Admin;
using LyseisApi.Base;
using Microsoft.EntityFrameworkCore;

namespace LyseisApi.Api.Admin.Repositories
{
    ///
    public class UsersRepository: Repository<UsersEntity>
    {
        ///
        public UsersRepository(DbContext context) : base(context, nameof(UsersRepository))
        {
        }

        /// <summary>
        /// Save user information without the id field 
        /// </summary>
        public void AddNew(UsersEntity userInfo)
        {
            try
            {
                userInfo.Id = null;
                Add(userInfo);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}