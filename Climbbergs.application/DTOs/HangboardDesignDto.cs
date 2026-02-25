namespace Climbbergs.Application.DTOs;

public class HangboardDesignDto
{
    public int Id { get; set; }
    public string? SessionId { get; set; }
    public HangboardBaseDto HangboardBase { get; set; } = null!;
    public List<DesignGripDto> Grips { get; set; } = new();
    public string ConfigurationJson { get; set; } = string.Empty;
    public decimal TotalPrice { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsOrderPlaced { get; set; }
    public string? ContactEmail { get; set; }
    public string? ContactName { get; set; }
}