﻿// <auto-generated />
using Hygiea.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Hygiea.Infrastructure.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20190622133351_ChangedDataType")]
    partial class ChangedDataType
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.11-servicing-32099")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Hygiea.Core.Entities.Drug", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("DateAdded");

                    b.Property<string>("Name");

                    b.Property<int>("Price");

                    b.Property<int>("Quantity");

                    b.HasKey("Id");

                    b.ToTable("Drugs");
                });

            modelBuilder.Entity("Hygiea.Core.Entities.Privilege", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<string>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Privileges");
                });

            modelBuilder.Entity("Hygiea.Core.Entities.Role", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("RoleName");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("Hygiea.Core.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AccountType");

                    b.Property<string>("Address");

                    b.Property<string>("DateOfBirth");

                    b.Property<string>("Department");

                    b.Property<string>("EmailAddress");

                    b.Property<string>("Faculty");

                    b.Property<string>("FirstName");

                    b.Property<string>("Gender");

                    b.Property<string>("LastName");

                    b.Property<string>("MatricNumber");

                    b.Property<string>("NextofKin");

                    b.Property<string>("NextofKinAddress");

                    b.Property<string>("NextofKinPhoneNumber");

                    b.Property<string>("ParentAddress");

                    b.Property<string>("ParentPhoneNumber");

                    b.Property<string>("PasswordHash");

                    b.Property<string>("Phonenumber");

                    b.Property<string>("YearofEmployment");

                    b.Property<string>("YearofEntry");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Hygiea.Core.Entities.UserRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("RoleId");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("Hygiea.Core.Entities.Privilege", b =>
                {
                    b.HasOne("Hygiea.Core.Entities.Role", "Role")
                        .WithMany("Privileges")
                        .HasForeignKey("RoleId");
                });

            modelBuilder.Entity("Hygiea.Core.Entities.UserRole", b =>
                {
                    b.HasOne("Hygiea.Core.Entities.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId");

                    b.HasOne("Hygiea.Core.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
