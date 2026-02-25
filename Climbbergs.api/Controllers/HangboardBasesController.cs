using Climbbergs.Application.DTOs;
using Climbbergs.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Climbbergs.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HangboardBasesController : ControllerBase
{
    private readonly IHangboardBaseRepository _repository;

    public HangboardBasesController(IHangboardBaseRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var bases = await _repository.GetAllAsync();
        var dtos = bases.Select(b => new HangboardBaseDto
        {
            Id = b.Id,
            Name = b.Name,
            Width = b.Width,
            Height = b.Height,
            Material = b.Material,
            Price = b.BasePrice,
            ImageUrl = b.ImageUrl,
            Description = b.Description
        });
        return Ok(dtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var hangboardBase = await _repository.GetByIdAsync(id);
        if (hangboardBase == null) return NotFound();

        var dto = new HangboardBaseDto
        {
            Id = hangboardBase.Id,
            Name = hangboardBase.Name,
            Width = hangboardBase.Width,
            Height = hangboardBase.Height,
            Material = hangboardBase.Material,
            Price = hangboardBase.BasePrice,
            ImageUrl = hangboardBase.ImageUrl,
            Description = hangboardBase.Description
        };
        return Ok(dto);
    }
}