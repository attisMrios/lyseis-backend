using LyseisApi.Api.Admin.Entities.AdminEntities;
using LyseisApi.Base;
using Microsoft.EntityFrameworkCore;

namespace LyseisApi.Api.Admin.Repositories
{
    ///
    public class CryptoRepository: Repository<CryptoEntity>
    {
        ///
        public CryptoRepository(DbContext context) : base(context, nameof(CryptoRepository))
        {
        }
    }
}