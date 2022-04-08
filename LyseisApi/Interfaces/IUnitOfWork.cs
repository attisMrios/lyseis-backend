using System;
using LyseisApi.Base;

namespace LyseisApi.Interfaces
{
    ///
    public interface IUnitOfWork : IDisposable
    {
        ///
        int SaveChanges();
        ///
        BaseContext GetDbContext();
    }
}