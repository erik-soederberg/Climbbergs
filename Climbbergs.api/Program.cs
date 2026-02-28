using Climbbergs.Application.Services;
using Climbbergs.Core.Interfaces;
using Climbbergs.Infrastructure.Data;
using Climbbergs.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register Repositories
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductInterestRepository, ProductInterestRepository>();

// Register Services
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductInterestService, ProductInterestService>();

// 🆕 Hangboard Designer Repositories
builder.Services.AddScoped<IHangboardDesignRepository, HangboardDesignRepository>();
builder.Services.AddScoped<IGripTypeRepository, GripTypeRepository>();
builder.Services.AddScoped<IHangboardBaseRepository, HangboardBaseRepository>();

// 🆕 Hangboard Designer Service
builder.Services.AddScoped<IHangboardDesignService, HangboardDesignService>();

// Configure CORS for frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();