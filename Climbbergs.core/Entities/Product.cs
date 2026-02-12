namespace Climbbergs.Core.Entities;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string SKU { get; set; } = string.Empty;
    public int StockQuantity { get; set; }
    
    // Relationships
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;
    
    public ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
    public ICollection<ProductInterest> Interests { get; set; } = new List<ProductInterest>();  // ⬅️ LÄGG TILL DENNA
    
    // Timestamps
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}