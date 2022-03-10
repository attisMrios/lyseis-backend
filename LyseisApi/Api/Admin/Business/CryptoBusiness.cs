using LyseisApi.Api.Admin.Entities.AdminEntities;
using LyseisApi.Base;

namespace LyseisApi.Api.Admin.Business
{
    /// <summary>
    /// Business logic for cryptography configuration table
    /// </summary>
    public class CryptoBusiness : BusinessBase
    {
        /// <summary>
        /// standard constructor for business
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="adminUnitOfWork"></param>
        public CryptoBusiness(string userId = "", AdminUnitOfWork adminUnitOfWork = null) : base(nameof(CryptoBusiness), userId:userId, adminUnitOfWork:adminUnitOfWork)
        {
        }
        
        /// <summary>
        /// Save the init cryptogrphy kes for use in all application
        /// this is used for crypt and decrypt password
        /// </summary>
        /// <param name="cryptoEntity"></param>
        public void AddCryptoInfo(CryptoEntity cryptoEntity)
        {
            AdminUnitOfWork.CryptoRepository.Add(cryptoEntity);
            AdminUnitOfWork.CryptoRepository.SaveChanges();
        }
    }
}