using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Climbbergs.infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddHangboardDesigner : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GripTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    PriceModifier = table.Column<decimal>(type: "numeric", nullable: false),
                    IconUrl = table.Column<string>(type: "text", nullable: false),
                    Color = table.Column<string>(type: "text", nullable: false),
                    HasAngle = table.Column<bool>(type: "boolean", nullable: false),
                    HasDepth = table.Column<bool>(type: "boolean", nullable: false),
                    MinDepth = table.Column<decimal>(type: "numeric", nullable: false),
                    MaxDepth = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GripTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HangboardBases",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Width = table.Column<decimal>(type: "numeric", nullable: false),
                    Height = table.Column<decimal>(type: "numeric", nullable: false),
                    Material = table.Column<string>(type: "text", nullable: false),
                    BasePrice = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HangboardBases", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HangboardDesigns",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SessionId = table.Column<string>(type: "text", nullable: true),
                    HangboardBaseId = table.Column<int>(type: "integer", nullable: false),
                    ConfigurationJson = table.Column<string>(type: "text", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsOrderPlaced = table.Column<bool>(type: "boolean", nullable: false),
                    ContactEmail = table.Column<string>(type: "text", nullable: true),
                    ContactName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HangboardDesigns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HangboardDesigns_HangboardBases_HangboardBaseId",
                        column: x => x.HangboardBaseId,
                        principalTable: "HangboardBases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DesignGrips",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    HangboardDesignId = table.Column<int>(type: "integer", nullable: false),
                    GripTypeId = table.Column<int>(type: "integer", nullable: false),
                    PositionX = table.Column<decimal>(type: "numeric", nullable: false),
                    PositionY = table.Column<decimal>(type: "numeric", nullable: false),
                    Width = table.Column<decimal>(type: "numeric", nullable: false),
                    Height = table.Column<decimal>(type: "numeric", nullable: false),
                    Rotation = table.Column<int>(type: "integer", nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    Angle = table.Column<int>(type: "integer", nullable: true),
                    Depth = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DesignGrips", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DesignGrips_GripTypes_GripTypeId",
                        column: x => x.GripTypeId,
                        principalTable: "GripTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DesignGrips_HangboardDesigns_HangboardDesignId",
                        column: x => x.HangboardDesignId,
                        principalTable: "HangboardDesigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "GripTypes",
                columns: new[] { "Id", "Color", "Description", "HasAngle", "HasDepth", "IconUrl", "MaxDepth", "MinDepth", "Name", "PriceModifier" },
                values: new object[,]
                {
                    { 1, "#22c55e", "Large positive hold, great for beginners", false, false, "/icons/jug.svg", 0m, 0m, "Jug", 0m },
                    { 2, "#ef4444", "Small edge hold for finger strength", false, true, "/icons/crimp.svg", 20m, 5m, "Crimp", 0m },
                    { 3, "#3b82f6", "Rounded hold requiring open hand grip", true, false, "/icons/sloper.svg", 0m, 0m, "Sloper", 0m },
                    { 4, "#a855f7", "One or two finger pocket hold", false, true, "/icons/pocket.svg", 40m, 10m, "Pocket", 0m },
                    { 5, "#f59e0b", "Pinch grip for thumb opposition", false, false, "/icons/pinch.svg", 0m, 0m, "Pinch", 0m },
                    { 6, "#8b5cf6", "Flat edge for various grip positions", false, true, "/icons/edge.svg", 25m, 5m, "Edge", 0m }
                });

            migrationBuilder.InsertData(
                table: "HangboardBases",
                columns: new[] { "Id", "BasePrice", "Description", "Height", "ImageUrl", "Material", "Name", "Width" },
                values: new object[] { 1, 0m, "Design your perfect training board", 20m, "/images/hangboard-blank.jpg", "Custom", "Standard Hangboard", 60m });

            migrationBuilder.CreateIndex(
                name: "IX_DesignGrips_GripTypeId",
                table: "DesignGrips",
                column: "GripTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_DesignGrips_HangboardDesignId",
                table: "DesignGrips",
                column: "HangboardDesignId");

            migrationBuilder.CreateIndex(
                name: "IX_HangboardDesigns_HangboardBaseId",
                table: "HangboardDesigns",
                column: "HangboardBaseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DesignGrips");

            migrationBuilder.DropTable(
                name: "GripTypes");

            migrationBuilder.DropTable(
                name: "HangboardDesigns");

            migrationBuilder.DropTable(
                name: "HangboardBases");
        }
    }
}
