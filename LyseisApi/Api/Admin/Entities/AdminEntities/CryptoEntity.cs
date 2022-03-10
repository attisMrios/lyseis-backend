using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LyseisApi.Api.Admin.Entities.AdminEntities
{
    [Table("crypto")]
    public class CryptoEntity
    {
        [Column("parameters")]
        [Key]
        public  bool Parameters { get; set; }
        
        [Column("d")]
        public byte[] D { get; set; }
        
        [Column("p")]
        public byte[] P { get; set; }
        
        [Column("q")]
        public byte[] Q { get; set; }
        
        [Column("dq")]
        public byte[] DQ { get; set; }
        
        [Column("dp")]
        public byte[] DP { get; set; }
        
        [Column("inverseq")]
        public byte[] InverseQ { get; set; }
        
        [Column("exponent")]
        public byte[] Exponent { get; set; }
        
        [Column("modulus")]
        public byte[] Modulus { get; set; }
        
    }
}