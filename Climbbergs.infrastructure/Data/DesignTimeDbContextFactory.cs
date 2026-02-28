using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Climbbergs.Infrastructure.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

            // PostgreSQL connection string
            optionsBuilder.UseNpgsql(
                "Host=localhost;Port=5432;Database=climbbergs_mvp;Username=postgres;Password=2860"
            );

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}