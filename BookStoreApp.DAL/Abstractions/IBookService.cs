using BookStoreApp.DAL.Entities;

namespace BookStoreApp.DAL.Abstractions;

public interface IBookService
{
    /// <summary>
    /// Add new book to the database
    /// </summary>
    /// <param name="book"></param>
    /// <returns>Book</returns>
    Task<Book> AddBook(Book book);
    /// <summary>
    /// Delete book using the book Id
    /// </summary>
    /// <param name="bookId"></param>
    /// <returns>True - Deleted</returns>
    Task<bool> DeleteBook(Guid bookId);

    /// <summary>
    /// Update a book using the book Id
    /// </summary>
    /// <param name="book"></param>
    /// <returns>Updated book</returns>
    Task<bool> UpdateBook(Book book);

    /// <summary>
    /// Get all books using a query
    /// </summary>
    /// <returns></returns>
    Task<List<Book>> GetAllBooks();
/// <summary>
/// Search book by using the name
/// </summary>
/// <param name="bookName"></param>
/// <returns>Book</returns>
    Task<Book> SearchBookByName(string bookName);
}