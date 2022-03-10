using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using System.Text;

namespace LyseisApi.Api.Admin.Entities.AdminEntities
{
    /// <summary>
    /// Users table structure
    /// </summary>
    [Table("users")]
    public class UsersEntity
    {
        /// <summary>
        /// Table primary key, identify the file into table,
        /// autogenerated do not set this field
        /// </summary>
        [Required]
        [Key]
        [Column("usr_id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public double? Id { get; set; }

        /// <summary>
        /// user name to login
        /// </summary>
        [StringLength(50)]
        [Column("usr_user_name")]
        public string UserName { get; set; }

        /// <summary>
        /// Encrypted password
        /// </summary>
        [Column("usr_password")] 
        public string Password { set; get; }

        /// <summary>
        /// log data
        /// </summary>
        [Column("usr_created_at")] 
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// log data
        /// </summary>
        [Column("usr_last_login")] 
        public DateTime? LastLogin { get; set; }
    }
}