using Climbbergs.Core.Entities;
using Climbbergs.Core.Interfaces;
using Climbbergs.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Climbbergs.Infrastructure.Repositories;

public class ProductInterestRepository : Repository<ProductInterest>, IProductInterestRepository
{
    public ProductInterestRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<int> GetInterestCountByProductAsync(int productId)
    {
        return await _dbSet.CountAsync(pi => pi.ProductId == productId);
    }

    public async Task<IEnumerable<ProductInterest>> GetByProductIdAsync(int productId)
    {
        return await _dbSet
            .Where(pi => pi.ProductId == productId)
            .OrderByDescending(pi => pi.ClickedAt)
            .ToListAsync();
    }
}