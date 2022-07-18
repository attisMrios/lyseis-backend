using LyseisApi.Base;
using LyseisApi.Interfaces;

namespace Lyseis.Api
{
    /// Unidad de trabajo para la empresa
    public class UnitOfWork : IUnitOfWork
    {
        //
        public void Dispose()
        {
            throw new System.NotImplementedException();
        }

        //
        public BaseContext GetDbContext()
        {
            throw new System.NotImplementedException();
        }

        //
        public int SaveChanges()
        {
            throw new System.NotImplementedException();
        }
    }
}