namespace Climbbergs.Core.Entities;

public class DesignGrip
{
    public int Id { get; set; }
    
    public int HangboardDesignId { get; set; }
    public HangboardDesign HangboardDesign { get; set; } = null!;
    
    public int GripTypeId { get; set; }
    public GripType GripType { get; set; } = null!;
    
    public decimal PositionX { get; set; }
    public decimal PositionY { get; set; }
    public decimal Width { get; set; }
    public decimal Height { get; set; }
    public int Rotation { get; set; }
    public int DisplayOrder { get; set; }
    
    public int? Angle { get; set; }
    
    public decimal Depth { get; set; }
}