namespace Climbbergs.Core.Entities;

public class HangboardBase
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Width { get; set; }
    public decimal Height { get; set; }
    public string Material { get; set; } = string.Empty;
    public decimal BasePrice { get; set; }
    
    public string Description { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    
    public ICollection<HangboardDesign> Designs { get; set; } = new List<HangboardDesign>();
}