using System;

namespace LyseisApi.Base
{
    public class BusinessBase: IDisposable
    {
        public string ClassName { get; set; }
        public string CompanyId { get; set; }
        public string UserId { get; set; }
        public AdminUnitOfWork AdminUnitOfWork { get; set; }

        public BusinessBase(string className, string companyId = "", string userId = "", AdminUnitOfWork adminUnitOfWork = null)
        {
            AdminUnitOfWork = adminUnitOfWork;
            ClassName = className;
            CompanyId = companyId;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}