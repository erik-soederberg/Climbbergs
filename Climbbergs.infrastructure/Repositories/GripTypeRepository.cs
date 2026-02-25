using Climbbergs.Core.Entities;
using Climbbergs.Core.Interfaces;
using Climbbergs.Infrastructure.Data;

namespace Climbbergs.Infrastructure.Repositories;

public class GripTypeRepository : Repository<GripType>, IGripTypeRepository
{
    public GripTypeRepository(ApplicationDbContext context) : base(context)
    {
    }
}