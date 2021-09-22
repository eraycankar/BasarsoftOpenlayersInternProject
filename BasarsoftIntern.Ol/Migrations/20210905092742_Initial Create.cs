using Microsoft.EntityFrameworkCore.Migrations;

namespace BasarsoftIntern.Ol.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Doors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NeighborhoodNumber = table.Column<int>(type: "int", nullable: false),
                    DoorNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    x = table.Column<double>(type: "float", nullable: false),
                    y = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Doors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Neighbourhoods",
                columns: table => new
                {
                    NeighborhoodId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NeighborhoodName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Coordinates = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Neighbourhoods", x => x.NeighborhoodId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Doors");

            migrationBuilder.DropTable(
                name: "Neighbourhoods");
        }
    }
}
