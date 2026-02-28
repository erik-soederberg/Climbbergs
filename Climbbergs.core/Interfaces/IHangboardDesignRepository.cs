using Climbbergs.Core.Entities;

namespace Climbbergs.Core.Interfaces;

public interface IHangboardDesignRepository : IRepository<HangboardDesign>
{
    Task<HangboardDesign?> GetByIdWithDetailsAsync(int id);
    Task<IEnumerable<HangboardDesign>> GetRecentDesignsAsync(int count);
    Task<IEnumerable<HangboardDesign>> GetBySessionIdAsync(string sessionId);
}