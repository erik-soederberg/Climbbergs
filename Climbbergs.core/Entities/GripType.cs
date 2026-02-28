namespace Climbbergs.Core.Entities;

public class GripType
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal PriceModifier { get; set; }
    public string IconUrl { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    
    // Grip-specific properties
    public bool HasAngle { get; set; }      // True for slopers
    public bool HasDepth { get; set; }      // True for pockets/crimps
    public decimal MinDepth { get; set; }   // Min depth in mm
    public decimal MaxDepth { get; set; }   // Max depth in mm
    
    public ICollection<DesignGrip> DesignGrips { get; set; } = new List<DesignGrip>();
}