using HospitalManagementApi.Data;
using HospitalManagementApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagementApi.Services
{
    public class PatientService
    {
        private readonly HospitalDbContext _context;

        public PatientService(HospitalDbContext context)
        {
            _context = context;
        }

        // Get all patients
        public async Task<IEnumerable<Patient>> GetPatientsAsync()
        {
            return await _context.Patients.Include(p => p.Doctor).Include(p => p.Hospital).ToListAsync();
        }

        // Get patient by id
        public async Task<Patient> GetPatientByIdAsync(int id)
        {
            return await _context.Patients.Include(p => p.Doctor).Include(p => p.Hospital).FirstOrDefaultAsync(p => p.Id == id);
        }

        // Add a new patient
        public async Task<Patient> AddPatientAsync(Patient patient)
        {
            var hospital = await _context.Hospitals.FindAsync(patient.HospitalId);
            var doctor = await _context.Doctors.FindAsync(patient.DoctorId);

            if (hospital == null)
            {
                throw new Exception("Hospital not found.");
            }

            if (doctor == null)
            {
                throw new Exception("Doctor not found.");
            }
            patient.Doctor = doctor;
            patient.Hospital = hospital;

            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();
            return patient;
        }

        // Update patient details
        public async Task UpdatePatientAsync(int id, Patient patient)
        {
            var existingPatient = await _context.Patients.FindAsync(id);
            if (existingPatient == null)
            {
                throw new Exception("Patient not found.");
            }

            existingPatient.FirstName = patient.FirstName;
            existingPatient.LastName = patient.LastName;
            existingPatient.Age = patient.Age;
            existingPatient.Gender = patient.Gender;
            existingPatient.DoctorId = patient.DoctorId;
            existingPatient.HospitalId = patient.HospitalId;

            _context.Entry(existingPatient).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        // Delete a patient
        public async Task DeletePatientAsync(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                throw new Exception("Patient not found.");
            }

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();
        }
    }
}