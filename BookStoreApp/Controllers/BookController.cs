using System.Diagnostics;
using System.Reflection.Metadata.Ecma335;
using BookStoreApp.DAL.Abstractions;
using BookStoreApp.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreApp.Controllers;
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BookController : ControllerBase
{
    private readonly IBookService _service;
    private readonly ILogger<BookController> _logger;
    public BookController(IBookService service, ILogger<BookController> logger)
    {
        _service = service;
        _logger = logger;
    }
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetAllBooks()
    {
        try
        {
            var result = await _service.GetAllBooks();
            return Ok(result.OrderByDescending(e => e.CreatedDate));
        }
        catch (UnauthorizedAccessException exception)
        {
            return Unauthorized(exception.Message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    [AllowAnonymous]
[HttpPost("add/new/book")]
    public async Task<IActionResult> AddNewBook([FromBody] Book book)
    {
        try
        {

            var addBook = await _service.AddBook(book);
            return Ok(new
            {
                IsSuccessful = true,
                Data = addBook,
                Message = "Book added successfully"
            });
        }
        
        catch (Exception e)
        {
            _logger.LogError(e,"");
            return Ok();
        }
    }
    
[HttpPost("update/book")]
    public async Task<IActionResult> UpdateBook([FromBody] Book book)
    {
        try
        {
            var updateBook = await _service.UpdateBook(book);
            return Ok(new
            {
                IsSuccessful = true,
                Data = updateBook,
                Message = updateBook != null ? "Book updated successfully" : "UnAuthorized user"
            });
        }
        catch (UnauthorizedAccessException exception)
        {
            return Unauthorized(exception.Message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    [AllowAnonymous]
[HttpDelete("delete/by/{bookId:guid}")]
    public async Task<IActionResult> DeleteBook(Guid bookId)
    {
        try
        {
            var result = await _service.DeleteBook(bookId);
            return Ok(new
            {
                IsSuccessful = result,
                Data = result,
                Message = result is not false ? "Book deleted successfully":"Failed to delete book"
            });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
[HttpGet("search/book/by/{name}")]
    public async Task<IActionResult> SearchBookByName(string name)
    {
        try
        {
            var searchResult = await _service.SearchBookByName(name);
            return Ok(new
            {
                IsSuccessful = true,
                Data = searchResult,
                Message = "Book is available"
            });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}