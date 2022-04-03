using BookStoreApp.DAL.Abstractions;
using BookStoreApp.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookStoreApp.DAL.Services;

public class BookService : IBookService
{
    private BookContextDb _context;

    public BookService(BookContextDb context)
    {
        _context = context;
    }

  
    /// <inheritdoc /> 
    public async Task<Book> AddBook(Book book)
    {
        try
        {
           var bookAddes = await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
            return bookAddes.Entity;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

/// <inheritdoc />
    public async Task<bool> DeleteBook(Guid bookId)
    {
        var exist = await _context.Books.FindAsync(bookId);
        if (exist != null) _context.Books.Remove(exist);
        await _context.SaveChangesAsync();
        return true;
    }
/// <inheritdoc />
    public async Task<bool> UpdateBook(Book book)
    {
        try
        {
            var bookExist = await _context.Books.FindAsync(book.Id);
            if (bookExist != null)
            {
                bookExist.Id = book.Id;
                bookExist.BookName = book.BookName;
                bookExist.Price = book.Price;
                bookExist.Description = book.Description;
                bookExist.Category = book.Category;
                bookExist.ModifiedDate = DateTime.UtcNow;
            }
            else
            {
                return false;
            }

            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
/// <inheritdoc />
    public async Task<List<Book>> GetAllBooks()
{
    return await _context.Books.ToListAsync();
}
/// <inheritdoc />
    public async Task<Book> SearchBookByName(string bookName)
    {
        return (await _context.Books.Where(s => s.BookName!.Contains(bookName)).FirstOrDefaultAsync())!;
    }
}