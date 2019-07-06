using Hygiea.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Hygiea.Infrastructure.Database
{
    public class DataContext :DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
         : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }

        public DbSet<Privilege> Privileges { get; set; }
        public DbSet<Drug> Drugs { get; set; }
        public DbSet<Appointment> Appointments {get;set;}
    }
}
