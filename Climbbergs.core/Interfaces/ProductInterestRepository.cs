using Climbbergs.Core.Entities;

namespace Climbbergs.Core.Interfaces;

public interface IProductInterestRepository : IRepository<ProductInterest>
{
    Task<int> GetInterestCountByProductAsync(int productId);
    Task<IEnumerable<ProductInterest>> GetByProductIdAsync(int productId);
}