using HospitalManagementApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementApi.Data
{
    public class HospitalDbContext : DbContext
    {
        public HospitalDbContext(DbContextOptions<HospitalDbContext> options) : base(options)
        {
        }

        // Define DbSets for each entity
        public DbSet<Hospital> Hospitals { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Doctor>()
                .HasOne(p => p.Hospital)
                .WithMany(h => h.Doctors)
                .HasForeignKey(p => p.HospitalId)
                .OnDelete(DeleteBehavior.Cascade); // Allow cascade delete for this relationship

            modelBuilder.Entity<Patient>()
                .HasOne(p => p.Doctor)
                .WithMany(d => d.Patients)
                .HasForeignKey(p => p.DoctorId)
                .OnDelete(DeleteBehavior.Restrict); // Disable cascade delete for this relationship
        }

    }
}