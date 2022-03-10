using System;
using System.Security.Cryptography;
using System.Text;

namespace Shared.Classess
{
    public class Security
    {

        
        public static string Encrypt(string text)
        {
            using (var md5 = new MD5CryptoServiceProvider())
            {
                using (var tdes = new TripleDESCryptoServiceProvider())
                {
                    tdes.Key = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes("MIIBCgKCAQEAxV6i8yoS40dy7tCw19u7ZXs9cPCfA0CzQnJuTzZ+/uDEwmpgFRUdp3yfmqVK3PnK7H1Gc506NmTIZ8mdyiDtz97A8+6p3PnOHJmunLqwvVUI4j5c1HdFbwRaIeA00HCuSy2LDchd6r4iQPPHCVB79Kw4c/A8FzNay8ighrzNpPw1qYrEknuVt26vFkINN7i7YItdZAq9+RfV31XYeAXKUQHR0J0A2fk/n+DA2fEW9ENzmsnVaBaWAlGzLMYn8hsldoRHov1boTtpzsXqN0ggEdhh4g1mHqhSnTslzA/6E6mSHtk2oe70uFowtozst6XyKLaw7fLdEa983yhbrrzJkQIDAQAB"));
                    tdes.Mode = CipherMode.ECB;
                    tdes.Padding = PaddingMode.PKCS7;

                    using (var transform = tdes.CreateEncryptor())
                    {
                        byte[] textBytes = UTF8Encoding.UTF8.GetBytes(text);
                        byte[] bytes = transform.TransformFinalBlock(textBytes, 0, textBytes.Length);
                        return Convert.ToBase64String(bytes, 0, bytes.Length);
                    }
                }
            }
        }

        public static string Decrypt(string cipher)
        {
            using (var md5 = new MD5CryptoServiceProvider())
            {
                using (var tdes = new TripleDESCryptoServiceProvider())
                {
                    tdes.Key = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes("MIIBCgKCAQEAxV6i8yoS40dy7tCw19u7ZXs9cPCfA0CzQnJuTzZ+/uDEwmpgFRUdp3yfmqVK3PnK7H1Gc506NmTIZ8mdyiDtz97A8+6p3PnOHJmunLqwvVUI4j5c1HdFbwRaIeA00HCuSy2LDchd6r4iQPPHCVB79Kw4c/A8FzNay8ighrzNpPw1qYrEknuVt26vFkINN7i7YItdZAq9+RfV31XYeAXKUQHR0J0A2fk/n+DA2fEW9ENzmsnVaBaWAlGzLMYn8hsldoRHov1boTtpzsXqN0ggEdhh4g1mHqhSnTslzA/6E6mSHtk2oe70uFowtozst6XyKLaw7fLdEa983yhbrrzJkQIDAQAB"));
                    tdes.Mode = CipherMode.ECB;
                    tdes.Padding = PaddingMode.PKCS7;

                    using (var transform = tdes.CreateDecryptor())
                    {
                        byte[] cipherBytes = Convert.FromBase64String(cipher);
                        byte[] bytes = transform.TransformFinalBlock(cipherBytes, 0, cipherBytes.Length);
                        return UTF8Encoding.UTF8.GetString(bytes);
                    }
                }
            }
        }
    }
}