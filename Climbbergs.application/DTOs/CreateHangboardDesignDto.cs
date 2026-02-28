namespace Climbbergs.Application.DTOs;

public class CreateHangboardDesignDto
{
    public string? SessionId { get; set; }
    public int HangboardBaseId { get; set; } = 1;  // Default to standard base
    public string ConfigurationJson { get; set; } = string.Empty;
    public List<CreateDesignGripDto> Grips { get; set; } = new();
    public string? ContactEmail { get; set; }
    public string? ContactName { get; set; }
}

public class CreateDesignGripDto
{
    public int GripTypeId { get; set; }
    public decimal PositionX { get; set; }
    public decimal PositionY { get; set; }
    public decimal Width { get; set; }
    public decimal Height { get; set; }
    public int Rotation { get; set; }
    public int DisplayOrder { get; set; }
    public int? Angle { get; set; }
    public decimal Depth { get; set; }
}