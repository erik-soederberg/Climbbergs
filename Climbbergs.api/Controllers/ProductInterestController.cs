using Climbbergs.Application.DTOs;
using Climbbergs.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Climbbergs.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductInterestsController : ControllerBase
{
    private readonly IProductInterestService _interestService;

    public ProductInterestsController(IProductInterestService interestService)
    {
        _interestService = interestService;
    }

    [HttpPost]
    public async Task<IActionResult> RecordInterest([FromBody] CreateProductInterestDto dto)
    {
        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        var userAgent = HttpContext.Request.Headers["User-Agent"].ToString();

        await _interestService.RecordInterestAsync(dto, ipAddress, userAgent);
        
        return Ok(new { message = "Interest recorded successfully" });
    }

    [HttpGet("{productId}/count")]
    public async Task<IActionResult> GetInterestCount(int productId)
    {
        var count = await _interestService.GetInterestCountAsync(productId);
        return Ok(new { productId, interestCount = count });
    }
}