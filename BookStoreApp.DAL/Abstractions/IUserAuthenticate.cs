using BookStoreApp.DAL.Entities;

namespace BookStoreApp.DAL.Abstractions;

public interface IUserAuthenticate
{
    /// <summary>
    /// This method is used to generate JWT tokens for the current valid user
    /// </summary>
    /// <param name="user"></param>
    /// <returns>Authorized User</returns>
    Task<Tokens> Authenticate(User user);
}