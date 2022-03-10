using LyseisApi.Api.Admin.Entities.AdminEntities;
using LyseisApi.Base;
using Microsoft.EntityFrameworkCore;

namespace LyseisApi.Api.Admin.Repositories
{
    public class CompaniesRepository: Repository<CompaniesEntity>
    {
        public CompaniesRepository(DbContext context) : base(context, nameof(CompaniesRepository))
        {
        }
    }
}