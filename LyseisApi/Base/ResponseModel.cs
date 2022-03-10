namespace LyseisApi.Base
{
    /// Generic model for every endpoint responses
    public class ResponseModel<T>
    {
        /// set the status of response eg. status 200
        public int Status { get; set; }

        /// set the end point data response
        public T Data {get; set;}
    }
}