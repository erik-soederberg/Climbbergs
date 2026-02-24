using Climbbergs.Application.DTOs;
using Climbbergs.Core.Entities;
using Climbbergs.Core.Interfaces;

namespace Climbbergs.Application.Services;

public class ProductInterestService : IProductInterestService
{
    private readonly IProductInterestRepository _interestRepository;

    public ProductInterestService(IProductInterestRepository interestRepository)
    {
        _interestRepository = interestRepository;
    }

    public async Task RecordInterestAsync(CreateProductInterestDto dto, string? ipAddress, string? userAgent)
    {
        var interest = new ProductInterest
        {
            ProductId = dto.ProductId,
            IpAddress = ipAddress,
            UserAgent = userAgent,
            ClickedAt = DateTime.UtcNow
        };

        await _interestRepository.AddAsync(interest);
    }

    public async Task<int> GetInterestCountAsync(int productId)
    {
        return await _interestRepository.GetInterestCountByProductAsync(productId);
    }
}