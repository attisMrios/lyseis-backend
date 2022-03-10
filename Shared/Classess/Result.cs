using System;
using Shared.Enums;

namespace Shared.Classess
{
    public class Result<T>
    {
        public T Data { get; set; }
        public Status ResultStatus { get; set; }
        public string Message { get; set; }
    }
}