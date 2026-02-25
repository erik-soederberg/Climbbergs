using Climbbergs.Application.DTOs;
using Climbbergs.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Climbbergs.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HangboardDesignsController : ControllerBase
{
    private readonly IHangboardDesignService _service;

    public HangboardDesignsController(IHangboardDesignService service)
    {
        _service = service;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var design = await _service.GetDesignByIdAsync(id);
        if (design == null) return NotFound();
        return Ok(design);
    }

    [HttpGet("recent")]
    public async Task<IActionResult> GetRecent([FromQuery] int count = 10)
    {
        var designs = await _service.GetRecentDesignsAsync(count);
        return Ok(designs);
    }

    [HttpGet("session/{sessionId}")]
    public async Task<IActionResult> GetBySession(string sessionId)
    {
        var designs = await _service.GetDesignsBySessionIdAsync(sessionId);
        return Ok(designs);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateHangboardDesignDto dto)
    {
        try
        {
            var design = await _service.CreateDesignAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = design.Id }, design);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateHangboardDesignDto dto)
    {
        try
        {
            var design = await _service.UpdateDesignAsync(id, dto);
            if (design == null) return NotFound();
            return Ok(design);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _service.DeleteDesignAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }
}