namespace Climbbergs.Core.Entities;

public class ProductInterest
{
    public int Id { get; set; }
    
    // Which product
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
    
    // Tracking data
    public DateTime ClickedAt { get; set; } = DateTime.UtcNow;
    public string? IpAddress { get; set; }  // For basic analytics
    public string? UserAgent { get; set; }  // Browser info
    public string? ReferrerUrl { get; set; }  // Where they came from
    
    // Optional: User identifier (if they return, you can track them)
    public string? SessionId { get; set; }
}