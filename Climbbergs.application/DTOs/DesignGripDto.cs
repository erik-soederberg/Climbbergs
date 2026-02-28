namespace Climbbergs.Application.DTOs;

public class DesignGripDto
{
    public int Id { get; set; }
    public int GripTypeId { get; set; }
    public string GripTypeName { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public decimal PositionX { get; set; }
    public decimal PositionY { get; set; }
    public decimal Width { get; set; }
    public decimal Height { get; set; }
    public int Rotation { get; set; }
    public int DisplayOrder { get; set; }
    
    // 🆕 Grip-specific
    public int? Angle { get; set; }
    public decimal? Depth { get; set; }
}