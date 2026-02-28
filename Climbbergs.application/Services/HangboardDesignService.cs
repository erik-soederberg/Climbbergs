using Climbbergs.Application.DTOs;
using Climbbergs.Core.Entities;
using Climbbergs.Core.Interfaces;

namespace Climbbergs.Application.Services;

public class HangboardDesignService : IHangboardDesignService
{
    private readonly IHangboardDesignRepository _designRepository;
    private readonly IHangboardBaseRepository _baseRepository;
    private readonly IGripTypeRepository _gripTypeRepository;

    public HangboardDesignService(
        IHangboardDesignRepository designRepository,
        IHangboardBaseRepository baseRepository,
        IGripTypeRepository gripTypeRepository)
    {
        _designRepository = designRepository;
        _baseRepository = baseRepository;
        _gripTypeRepository = gripTypeRepository;
    }

    public async Task<HangboardDesignDto?> GetDesignByIdAsync(int id)
    {
        var design = await _designRepository.GetByIdWithDetailsAsync(id);
        if (design == null) return null;

        return MapToDto(design);
    }

    public async Task<IEnumerable<HangboardDesignDto>> GetRecentDesignsAsync(int count)
    {
        var designs = await _designRepository.GetRecentDesignsAsync(count);
        return designs.Select(MapToDto);
    }

    public async Task<IEnumerable<HangboardDesignDto>> GetDesignsBySessionIdAsync(string sessionId)
    {
        var designs = await _designRepository.GetBySessionIdAsync(sessionId);
        return designs.Select(MapToDto);
    }

    public async Task<HangboardDesignDto> CreateDesignAsync(CreateHangboardDesignDto dto)
    {
        var hangboardBase = await _baseRepository.GetByIdAsync(dto.HangboardBaseId);
        if (hangboardBase == null)
            throw new ArgumentException("Invalid hangboard base ID");

        // Price is just the base price (no extra for grips)
        decimal totalPrice = hangboardBase.BasePrice;
        
        var grips = new List<DesignGrip>();
        foreach (var gripDto in dto.Grips)
        {
            var gripType = await _gripTypeRepository.GetByIdAsync(gripDto.GripTypeId);
            if (gripType != null)
            {
                grips.Add(new DesignGrip
                {
                    GripTypeId = gripDto.GripTypeId,
                    PositionX = gripDto.PositionX,
                    PositionY = gripDto.PositionY,
                    Width = gripDto.Width,
                    Height = gripDto.Height,
                    Rotation = gripDto.Rotation,
                    DisplayOrder = gripDto.DisplayOrder,
                    Angle = gripDto.Angle,
                    Depth = gripDto.Depth
                });
            }
        }

        var design = new HangboardDesign
        {
            SessionId = dto.SessionId,
            HangboardBaseId = dto.HangboardBaseId,
            ConfigurationJson = dto.ConfigurationJson,
            TotalPrice = totalPrice,
            ContactEmail = dto.ContactEmail,
            ContactName = dto.ContactName,
            Grips = grips
        };

        var created = await _designRepository.AddAsync(design);
        return MapToDto(await _designRepository.GetByIdWithDetailsAsync(created.Id) ?? created);
    }

    public async Task<HangboardDesignDto?> UpdateDesignAsync(int id, CreateHangboardDesignDto dto)
    {
        var existing = await _designRepository.GetByIdWithDetailsAsync(id);
        if (existing == null) return null;

        var hangboardBase = await _baseRepository.GetByIdAsync(dto.HangboardBaseId);
        if (hangboardBase == null)
            throw new ArgumentException("Invalid hangboard base ID");

        decimal totalPrice = hangboardBase.BasePrice;
        
        existing.Grips.Clear();
        
        foreach (var gripDto in dto.Grips)
        {
            var gripType = await _gripTypeRepository.GetByIdAsync(gripDto.GripTypeId);
            if (gripType != null)
            {
                existing.Grips.Add(new DesignGrip
                {
                    GripTypeId = gripDto.GripTypeId,
                    PositionX = gripDto.PositionX,
                    PositionY = gripDto.PositionY,
                    Width = gripDto.Width,
                    Height = gripDto.Height,
                    Rotation = gripDto.Rotation,
                    DisplayOrder = gripDto.DisplayOrder,
                    Angle = gripDto.Angle,
                    Depth = gripDto.Depth
                });
            }
        }

        existing.HangboardBaseId = dto.HangboardBaseId;
        existing.ConfigurationJson = dto.ConfigurationJson;
        existing.TotalPrice = totalPrice;
        existing.ContactEmail = dto.ContactEmail;
        existing.ContactName = dto.ContactName;
        existing.UpdatedAt = DateTime.UtcNow;

        await _designRepository.UpdateAsync(existing);
        return MapToDto(await _designRepository.GetByIdWithDetailsAsync(id) ?? existing);
    }

    public async Task<bool> DeleteDesignAsync(int id)
    {
        var design = await _designRepository.GetByIdAsync(id);
        if (design == null) return false;

        await _designRepository.DeleteAsync(id);
        return true;
    }

    private HangboardDesignDto MapToDto(HangboardDesign design)
    {
        return new HangboardDesignDto
        {
            Id = design.Id,
            SessionId = design.SessionId,
            HangboardBase = new HangboardBaseDto
            {
                Id = design.HangboardBase.Id,
                Name = design.HangboardBase.Name,
                Width = design.HangboardBase.Width,
                Height = design.HangboardBase.Height,
                Material = design.HangboardBase.Material,
                Price = design.HangboardBase.BasePrice,
                ImageUrl = design.HangboardBase.ImageUrl,
                Description = design.HangboardBase.Description
            },
            Grips = design.Grips.Select(g => new DesignGripDto
            {
                Id = g.Id,
                GripTypeId = g.GripTypeId,
                GripTypeName = g.GripType.Name,
                Color = g.GripType.Color,
                PositionX = g.PositionX,
                PositionY = g.PositionY,
                Width = g.Width,
                Height = g.Height,
                Rotation = g.Rotation,
                DisplayOrder = g.DisplayOrder,
                Angle = g.Angle,
                Depth = g.Depth
            }).ToList(),
            ConfigurationJson = design.ConfigurationJson,
            TotalPrice = design.TotalPrice,
            CreatedAt = design.CreatedAt,
            IsOrderPlaced = design.IsOrderPlaced,
            ContactEmail = design.ContactEmail,
            ContactName = design.ContactName
        };
    }
}