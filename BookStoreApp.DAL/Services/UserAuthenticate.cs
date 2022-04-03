using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookStoreApp.DAL.Abstractions;
using BookStoreApp.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace BookStoreApp.DAL.Services;

public class UserAuthenticate:IUserAuthenticate
{
    private readonly BookContextDb _context;
    private IConfiguration _configuration;
    public UserAuthenticate(BookContextDb context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }
    /// <inheritdoc />
    public async Task<Tokens> Authenticate(User user)
    {
        try
        {
            var checkUserExist = await _context.UserLogins.Where(s => s.Username ==user.Username).FirstOrDefaultAsync();
            if (checkUserExist is { }) return null;
            var tokenhandler = new JwtSecurityTokenHandler();
            var tokenSecret = Encoding.UTF8.GetBytes(_configuration["jwtTokenConfig:secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new(ClaimTypes.Name,user.Username)
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenSecret),SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenhandler.CreateToken(tokenDescriptor);
            return new Tokens { Token = tokenhandler.WriteToken(token) };
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}