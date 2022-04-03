using System;
using System.Security.Cryptography;
using BookStoreApi.Controllers;
using BookStoreApp.DAL.Abstractions;
using BookStoreApp.DAL.Entities;
using Microsoft.Extensions.Logging;
using Xunit;

namespace BookStoreAppTest;

public class WebApiControllerEndpointsTest
{
  private BookController Controller { get; set; } = null!;
  private Book Book { get;set; } = null!;
  private readonly IBookService _service = null!;
  private ILogger<BookController> _logger = null!;

  public WebApiControllerEndpointsTest(BookController controller)
  {
  }
 [Fact]
  public void CheckIfResponseReturnsOkOrNull()
  {
      var response = new BookController(_service,_logger);
      Assert.True(response.TryValidateModel(Book));
      Assert.NotNull(response);
  }

  [Fact]
  public void ReturnAllBooksInAListIfAvailable()
  {
      var response = new BookController(_service, _logger);
      Assert.NotNull(response.Ok());
  }
}