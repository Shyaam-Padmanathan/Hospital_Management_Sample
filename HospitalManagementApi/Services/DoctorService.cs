using HospitalManagementApi.Data;
using HospitalManagementApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementApi.Services
{
    public class DoctorService
    {
        private readonly HospitalDbContext _context;

        public DoctorService(HospitalDbContext context)
        {
            _context = context;
        }

        // Get all doctors
        public async Task<IEnumerable<Doctor>> GetDoctorsAsync()
        {
            return await _context.Doctors.Include(d => d.Hospital).ToListAsync();
        }

        // Get doctor by id
        public async Task<Doctor> GetDoctorByIdAsync(int id)
        {
            return await _context.Doctors.Include(d => d.Hospital).FirstOrDefaultAsync(d => d.Id == id);
        }

        // Add a new doctor
        public async Task<Doctor> AddDoctorAsync(Doctor doctor)
        {
            var hospital = await _context.Hospitals.FindAsync(doctor.HospitalId);
            if (hospital == null)
            {
                throw new Exception("Hospital not found.");
            }

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();
            return doctor;
        }

        // Update doctor details
        public async Task UpdateDoctorAsync(int id, Doctor doctor)
        {
            var existingDoctor = await _context.Doctors.FindAsync(id);
            if (existingDoctor == null)
            {
                throw new Exception("Doctor not found.");
            }

            existingDoctor.Name = doctor.Name;
            existingDoctor.Qualification = doctor.Qualification;
            existingDoctor.JobSpecification = doctor.JobSpecification;
            existingDoctor.Gender = doctor.Gender;
            existingDoctor.HospitalId = doctor.HospitalId;

            _context.Entry(existingDoctor).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        // Delete a doctor
        public async Task DeleteDoctorAsync(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
            {
                throw new Exception("Doctor not found.");
            }

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();
        }
    }
}