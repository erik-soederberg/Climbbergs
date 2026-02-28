namespace Climbbergs.Application.DTOs;

public class GripTypeDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; }= string.Empty;
    public string IconUrl { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    
    // 🆕 Grip properties
    public bool HasAngle { get; set; }
    public bool HasDepth { get; set; }
    public decimal MinDepth { get; set; }
    public decimal MaxDepth { get; set; }
}