using Climbbergs.Application.DTOs;

namespace Climbbergs.Application.Services;

public interface IProductInterestService
{
    Task RecordInterestAsync(CreateProductInterestDto dto, string? ipAddress, string? userAgent);
    Task<int> GetInterestCountAsync(int productId);
}