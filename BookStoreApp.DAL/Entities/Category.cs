namespace BookStoreApp.DAL.Entities;

public class Category
{
    public Guid Id { get; set; }
    public string? CategoryName { get; set; }
    public string? Description { get; set; }
    public DateTime CreatedDate { get; set; }
}