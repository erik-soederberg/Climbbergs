namespace Climbbergs.Application.DTOs;

public class HangboardBaseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Width { get; set; }
    public decimal Height { get; set; }
    public string Material { get; set; } = string.Empty;
    public decimal Price { get; set; }  // ✏️ Just "Price"
    public string ImageUrl { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}