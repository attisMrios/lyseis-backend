using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using LyseisApi.Api.Admin.Business;
using LyseisApi.Api.Admin.Entities.AdminEntities;
using LyseisApi.Base;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace LyseisApi.Controllers.Admin
{
    /// <summary>
    /// Controller for secure login
    /// </summary>
    [ApiController]
    [Route("api/authentication")]
    public class AuthenticationController: ControllerBase
    {
        
        private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="configuration"></param>
        public AuthenticationController(IConfiguration configuration)
        {
            _jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
        }
        /// <summary>
        /// Generate a symmetric token
        /// </summary>
        /// <param name="loginData"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("token")]
        [Consumes("application/x-www-form-urlencoded")]
        public IActionResult GetToken([FromForm] IFormCollection loginData)
        {
            try
            {
                string userName = loginData["username"];
                string password = loginData["password"];

                using AdminUnitOfWork adminUnitOfWork = new AdminUnitOfWork();
                using (UsersBusiness usersBusiness = new UsersBusiness(userName, adminUnitOfWork))
                {
                    UsersEntity user = usersBusiness.GetUser(userName);

                    if (user == null)
                    {
                        return StatusCode(401, "Unauthorized - The user does not exist");
                    }
                    else
                    {
                        if (user.Password != Shared.Classess.Security.Encrypt(password))
                        {
                            return StatusCode(401, "Unauthorized - Password incorrect");
                        }
                        else
                        {
                            RSA rsa = RSA.Create();

                            rsa.ImportRSAPrivateKey(
                                source: Convert.FromBase64String(DefaultSettings.GetSection("Jwt:Asymmetric:PrivateKey")), // Use the private key to sign tokens
                                bytesRead: out int _);

                            var signingCredentials = new SigningCredentials(
                                key: new RsaSecurityKey(rsa),
                                algorithm: SecurityAlgorithms.RsaSha512 // Hay que usar la versión RSA del algoritmo de seguridad
                            );

                            // date to sign the token
                            DateTime jwtDate = DateTime.Now;

                            var jwt = new JwtSecurityToken(
                                audience: "Lyseis",
                                issuer: "LyseisApi",
                                claims: new Claim[] { new Claim(ClaimTypes.NameIdentifier, "??") },
                                notBefore: jwtDate,
                                expires: jwtDate.AddDays(1),    
                                signingCredentials: signingCredentials
                            );

                            // get token to response
                            string token = _jwtSecurityTokenHandler.WriteToken(jwt);

                            return Ok(new
                            {
                                token = token,
                                expirationDate = new DateTimeOffset(jwtDate.AddDays(1)).ToLocalTime(),
                            });
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, e.Message);
            }
        }
    }
}