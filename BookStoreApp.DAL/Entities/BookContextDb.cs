using Microsoft.EntityFrameworkCore;
namespace BookStoreApp.DAL.Entities;

public class BookContextDb:DbContext
{
    public BookContextDb(DbContextOptions<BookContextDb> contextOptions):base(contextOptions)
    {
    }
    public DbSet<Book> Books { get; set; } = null!;
    public DbSet<User> UserLogins { get; set; } = null!;
}