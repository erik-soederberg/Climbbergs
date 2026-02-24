using Climbbergs.Core.Entities;

namespace Climbbergs.Core.Interfaces;

public interface IProductRepository : IRepository<Product>
{
    Task<IEnumerable<Product>> GetByCategoryAsync(int categoryId);
    Task<Product?> GetByIdWithDetailsAsync(int id); // Includes images, category
}