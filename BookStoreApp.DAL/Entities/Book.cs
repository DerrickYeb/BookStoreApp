using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreApp.DAL.Entities;

public class Book
{
    public Guid Id { get; set; }
    [Required]
    public string BookName { get; set; }
    [Required]
    public string Category { get; set; }
    [Required]
    public decimal Price { get; set; }
    public string Description { get; set; } = null!;
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public DateTime ModifiedDate { get; set; }
}