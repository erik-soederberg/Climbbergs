using Climbbergs.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Climbbergs.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<ProductImage> ProductImages => Set<ProductImage>();
    public DbSet<ProductInterest> ProductInterests => Set<ProductInterest>();
    
    public DbSet<HangboardBase> HangboardBases { get; set; }
    public DbSet<GripType> GripTypes { get; set; }
    public DbSet<HangboardDesign> HangboardDesigns { get; set; }
    public DbSet<DesignGrip> DesignGrips { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // =============================
        // PRODUCT CONFIG
        // =============================

        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(p => p.Price)
                  .HasPrecision(18, 2);

            entity.HasIndex(p => p.SKU)
                  .IsUnique();

            // Let database generate CreatedAt
            entity.Property(p => p.CreatedAt)
                  .ValueGeneratedOnAdd();

            entity.Property(p => p.UpdatedAt)
                  .ValueGeneratedOnUpdate();
        });

        // =============================
        // CATEGORY CONFIG
        // =============================

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasOne(c => c.ParentCategory)
                  .WithMany(c => c.SubCategories)
                  .HasForeignKey(c => c.ParentCategoryId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        // =============================
        // CATEGORY SEED
        // =============================

        modelBuilder.Entity<Category>().HasData(
            new Category
            {
                Id = 1,
                Name = "Jackets",
                Slug = "jackets",
                Description = "Climbing jackets and outerwear"
            },
            new Category
            {
                Id = 2,
                Name = "Pants",
                Slug = "pants",
                Description = "Climbing pants and shorts"
            },
            new Category
            {
                Id = 3,
                Name = "Shoes",
                Slug = "shoes",
                Description = "Climbing and approach shoes"
            },
            new Category
            {
                Id = 4,
                Name = "Accessories",
                Slug = "accessories",
                Description = "Chalk bags, gloves, and more"
            }
        );

        // =============================
        // PRODUCT SEED
        // =============================

        // Seed some example products
        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1,
                Name = "Alpine Pro Jacket",
                Description = "Waterproof climbing jacket for all conditions",
                Price = 299.99m,
                SKU = "JAC-001",
                StockQuantity = 50,
                CategoryId = 1,
                CreatedAt = new DateTime(2026, 2, 12, 10, 0, 0, DateTimeKind.Utc)
            },
            new Product
            {
                Id = 2,
                Name = "Boulder Pants",
                Description = "Flexible climbing pants with reinforced knees",
                Price = 129.99m,
                SKU = "PNT-001",
                StockQuantity = 75,
                CategoryId = 2,
                CreatedAt = new DateTime(2026, 2, 12, 10, 0, 0, DateTimeKind.Utc)
            },
            new Product
            {
                Id = 3,
                Name = "Grip Master Shoes",
                Description = "High-performance climbing shoes",
                Price = 189.99m,
                SKU = "SHO-001",
                StockQuantity = 30,
                CategoryId = 3,
                CreatedAt = new DateTime(2026, 2, 12, 10, 0, 0, DateTimeKind.Utc)
            }
        );

    }
}
