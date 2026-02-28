namespace Climbbergs.Core.Entities;

public class HangboardDesign
{
    public int Id { get; set; }
    public string? SessionId { get; set; }
    
    public int HangboardBaseId { get; set; }
    public HangboardBase HangboardBase { get; set; } = null!;
    
    public string ConfigurationJson { get; set; } = string.Empty;
    public decimal TotalPrice { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public bool IsOrderPlaced { get; set; } = false;
    
    public string? ContactEmail { get; set; }
    public string? ContactName { get; set; }
    
    public ICollection<DesignGrip> Grips { get; set; } = new List<DesignGrip>();
}