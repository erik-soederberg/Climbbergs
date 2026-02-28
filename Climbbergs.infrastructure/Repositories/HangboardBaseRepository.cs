using Climbbergs.Core.Entities;
using Climbbergs.Core.Interfaces;
using Climbbergs.Infrastructure.Data;

namespace Climbbergs.Infrastructure.Repositories;

public class HangboardBaseRepository : Repository<HangboardBase>, IHangboardBaseRepository
{
    public HangboardBaseRepository(ApplicationDbContext context) : base(context)
    {
    }
}