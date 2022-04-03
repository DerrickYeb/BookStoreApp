using BookStoreApp.DAL.Abstractions;
using BookStoreApp.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreApp.Controllers;
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AuthenticateController : ControllerBase
{
    private readonly IUserAuthenticate _authenticate;
    public AuthenticateController(IUserAuthenticate authenticate)
    {
        _authenticate = authenticate;
    }
    [AllowAnonymous]
    [HttpPost("user")]
    public async Task<IActionResult> AuthenticateUser([FromBody]User user)
    {
        try
        {
            var result = await _authenticate.Authenticate(user);
            return Ok(result);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}