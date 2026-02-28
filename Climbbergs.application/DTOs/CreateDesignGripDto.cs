public class CreateDesignGripDto
{
    public int GripTypeId { get; set; }
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