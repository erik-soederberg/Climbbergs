using Climbbergs.Application.DTOs;
using Climbbergs.Core.Interfaces;

namespace Climbbergs.Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IProductInterestRepository _interestRepository;

    public ProductService(IProductRepository productRepository, IProductInterestRepository interestRepository)
    {
        _productRepository = productRepository;
        _interestRepository = interestRepository;
    }

    public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
    {
        var products = await _productRepository.GetAllAsync();
        
        var productDtos = new List<ProductDto>();
        
        foreach (var product in products)
        {
            var interestCount = await _interestRepository.GetInterestCountByProductAsync(product.Id);
            
            productDtos.Add(new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                SKU = product.SKU,
                StockQuantity = product.StockQuantity,
                CategoryName = product.Category?.Name ?? "",
                ImageUrls = product.Images.Select(i => i.Url).ToList(),
                InterestCount = interestCount
            });
        }
        
        return productDtos;
    }

    public async Task<ProductDetailDto?> GetProductByIdAsync(int id)
    {
        var product = await _productRepository.GetByIdWithDetailsAsync(id);
        if (product == null) return null;

        var interestCount = await _interestRepository.GetInterestCountByProductAsync(id);

        return new ProductDetailDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            SKU = product.SKU,
            StockQuantity = product.StockQuantity,
            CategoryName = product.Category?.Name ?? "",
            CategoryId = product.CategoryId,
            ImageUrls = product.Images.Select(i => i.Url).ToList(),
            InterestCount = interestCount,
            CreatedAt = product.CreatedAt
        };
    }

    public async Task<IEnumerable<ProductDto>> GetProductsByCategoryAsync(int categoryId)
    {
        var products = await _productRepository.GetByCategoryAsync(categoryId);
        
        var productDtos = new List<ProductDto>();
        
        foreach (var product in products)
        {
            var interestCount = await _interestRepository.GetInterestCountByProductAsync(product.Id);
            
            productDtos.Add(new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                SKU = product.SKU,
                StockQuantity = product.StockQuantity,
                CategoryName = product.Category?.Name ?? "",
                ImageUrls = product.Images.Select(i => i.Url).ToList(),
                InterestCount = interestCount
            });
        }
        
        return productDtos;
    }
}