using Climbbergs.Core.Entities;
using Climbbergs.Core.Interfaces;
using Climbbergs.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Climbbergs.Infrastructure.Repositories;

public class HangboardDesignRepository : Repository<HangboardDesign>, IHangboardDesignRepository
{
    public HangboardDesignRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<HangboardDesign?> GetByIdWithDetailsAsync(int id)
    {
        return await _dbSet
            .Include(d => d.HangboardBase)
            .Include(d => d.Grips)
            .ThenInclude(g => g.GripType)
            .FirstOrDefaultAsync(d => d.Id == id);
    }

    public async Task<IEnumerable<HangboardDesign>> GetRecentDesignsAsync(int count)
    {
        return await _dbSet
            .Include(d => d.HangboardBase)
            .Include(d => d.Grips)
            .OrderByDescending(d => d.CreatedAt)
            .Take(count)
            .ToListAsync();
    }

    public async Task<IEnumerable<HangboardDesign>> GetBySessionIdAsync(string sessionId)
    {
        return await _dbSet
            .Include(d => d.HangboardBase)
            .Include(d => d.Grips)
            .Where(d => d.SessionId == sessionId)
            .OrderByDescending(d => d.CreatedAt)
            .ToListAsync();
    }
}