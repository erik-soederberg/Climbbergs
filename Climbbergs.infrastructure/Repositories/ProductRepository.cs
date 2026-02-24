using Climbbergs.Core.Entities;
using Climbbergs.Core.Interfaces;
using Climbbergs.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Climbbergs.Infrastructure.Repositories;

public class ProductRepository : Repository<Product>, IProductRepository
{
    public ProductRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Product>> GetByCategoryAsync(int categoryId)
    {
        return await _dbSet
            .Include(p => p.Category)
            .Include(p => p.Images)
            .Where(p => p.CategoryId == categoryId)
            .ToListAsync();
    }

    public async Task<Product?> GetByIdWithDetailsAsync(int id)
    {
        return await _dbSet
            .Include(p => p.Category)
            .Include(p => p.Images)
            .Include(p => p.Interests)
            .FirstOrDefaultAsync(p => p.Id == id);
    }
}