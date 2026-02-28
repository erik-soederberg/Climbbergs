using Climbbergs.Application.DTOs;
using Climbbergs.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Climbbergs.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GripTypesController : ControllerBase
{
    private readonly IGripTypeRepository _repository;

    public GripTypesController(IGripTypeRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var gripTypes = await _repository.GetAllAsync();
        var dtos = gripTypes.Select(g => new GripTypeDto
        {
            Id = g.Id,
            Name = g.Name,
            Description = g.Description,
            IconUrl = g.IconUrl,
            Color = g.Color,
            HasAngle = g.HasAngle,      // ✅ Dessa ska finnas
            HasDepth = g.HasDepth,      // ✅
            MinDepth = g.MinDepth,      // ✅
            MaxDepth = g.MaxDepth       // ✅
        });
        return Ok(dtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var gripType = await _repository.GetByIdAsync(id);
        if (gripType == null) return NotFound();

        var dto = new GripTypeDto
        {
            Id = gripType.Id,
            Name = gripType.Name,
            Description = gripType.Description,
            IconUrl = gripType.IconUrl,
            Color = gripType.Color,
            HasAngle = gripType.HasAngle,
            HasDepth = gripType.HasDepth,
            MinDepth = gripType.MinDepth,
            MaxDepth = gripType.MaxDepth
            // ❌ INGEN PriceModifier här!
        };
        return Ok(dto);
    }
}