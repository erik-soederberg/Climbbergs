using Climbbergs.Application.DTOs;

namespace Climbbergs.Application.Services;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetAllProductsAsync();
    Task<ProductDetailDto?> GetProductByIdAsync(int id);
    Task<IEnumerable<ProductDto>> GetProductsByCategoryAsync(int categoryId);
}