namespace LyseisApi.Api.Admin.Models
{
    /// <summary>
    /// Specify the properties for users controller 
    /// </summary>
    public class UsersModel
    {
        /// <summary>
        /// set user name
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// set user password
        /// </summary>
        public string Password { get; set; }
    }
}