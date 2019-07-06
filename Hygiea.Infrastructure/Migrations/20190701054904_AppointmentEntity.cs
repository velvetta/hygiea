using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Hygiea.Infrastructure.Migrations
{
    public partial class AppointmentEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Appointments",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    DateofAppointment = table.Column<DateTime>(nullable: false),
                    IsAppointmentApprovedAdmin = table.Column<bool>(nullable: false),
                    IsAppointmentApprovedUser = table.Column<bool>(nullable: false),
                    PurposeofAppointment = table.Column<string>(nullable: true),
                    DateAppointmentMade = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Appointments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_UserId",
                table: "Appointments",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Appointments");
        }
    }
}
