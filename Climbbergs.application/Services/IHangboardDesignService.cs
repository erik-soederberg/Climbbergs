using Climbbergs.Application.DTOs;

namespace Climbbergs.Application.Services;

public interface IHangboardDesignService
{
    Task<HangboardDesignDto?> GetDesignByIdAsync(int id);
    Task<IEnumerable<HangboardDesignDto>> GetRecentDesignsAsync(int count);
    Task<IEnumerable<HangboardDesignDto>> GetDesignsBySessionIdAsync(string sessionId);
    Task<HangboardDesignDto> CreateDesignAsync(CreateHangboardDesignDto dto);
    Task<HangboardDesignDto?> UpdateDesignAsync(int id, CreateHangboardDesignDto dto);
    Task<bool> DeleteDesignAsync(int id);
}