using HospitalManagementApi.Data;
using HospitalManagementApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementApi.Services
{
    public class HospitalService
    {
        private readonly HospitalDbContext _context;

        public HospitalService(HospitalDbContext context)
        {
            _context = context;
        }

        // Get all hospitals
        public async Task<IEnumerable<Hospital>> GetHospitalsAsync()
        {
            return await _context.Hospitals.ToListAsync();
        }

        // Get hospital by id
        public async Task<Hospital> GetHospitalByIdAsync(int id)
        {
            return await _context.Hospitals.FindAsync(id);
        }

        // Add a new hospital
        public async Task<Hospital> AddHospitalAsync(Hospital hospital)
        {
            if (await HospitalExists(hospital.HospName))
            {
                throw new Exception("Hospital with the same name already exists.");
            }

            _context.Hospitals.Add(hospital);
            await _context.SaveChangesAsync();
            return hospital;
        }

        // Update hospital details
        public async Task UpdateHospitalAsync(int id, Hospital hospital)
        {
            var existingHospital = await _context.Hospitals.FindAsync(id);
            if (existingHospital == null)
            {
                throw new Exception("Hospital not found.");
            }

            existingHospital.HospName = hospital.HospName;
            existingHospital.Country = hospital.Country;
            existingHospital.Address = hospital.Address;

            _context.Entry(existingHospital).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        // Delete a hospital
        public async Task DeleteHospitalAsync(int id)
        {
            var hospital = await _context.Hospitals.FindAsync(id);
            if (hospital == null)
            {
                throw new Exception("Hospital not found.");
            }

            _context.Hospitals.Remove(hospital);
            await _context.SaveChangesAsync();
        }

        // Check if hospital already exists
        private async Task<bool> HospitalExists(string hospName)
        {
            return await _context.Hospitals.AnyAsync(h => h.HospName == hospName);
        }
    }
}