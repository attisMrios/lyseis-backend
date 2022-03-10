using System;
using System.Linq;
using System.Security.Cryptography;
using LyseisApi.Api.Admin.Entities.AdminEntities;
using LyseisApi.Base;
using Shared.Classess;

namespace LyseisApi.Api.Admin.Business
{
    /// <summary>
    /// Business logic for companies Users
    /// </summary>
    public class UsersBusiness : BusinessBase
    {
        /// <summary>
        /// Generic constructor for business classess
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="adminUnitOfWork"></param>
        public UsersBusiness(string userId = "", AdminUnitOfWork adminUnitOfWork = null) : base(nameof(UsersBusiness),
            userId: userId, adminUnitOfWork: adminUnitOfWork)
        {
        }

        /// <summary>
        /// Save the user into table
        /// </summary>
        /// <param name="user"></param>
        /// <exception cref="Exception"></exception>
        public void AddUser(UsersEntity user)
        {
            try
            {
                using AdminUnitOfWork unitOfWork = new AdminUnitOfWork();
                
                // save user info
                user.CreatedAt = DateTime.Now;
                
                // passwrod encrypt
                user.Password = Shared.Classess.Security.Encrypt(user.Password);
                
                unitOfWork.UsersRepository.AddNew(user);
                unitOfWork.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        /// <summary>
        /// Get user information with password decrypted
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public UsersEntity GetUser(string userName)
        {
            UsersEntity userInfo;
            try
            {
                using (AdminUnitOfWork unitOfWork = new AdminUnitOfWork())
                {
                    // get user info
                    userInfo = unitOfWork.UsersRepository.Find(userBd => userBd.UserName == userName).FirstOrDefault();

                    if (userInfo == null)
                    {
                        return null;
                    }
                    

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

            return userInfo;
        }
    }
}