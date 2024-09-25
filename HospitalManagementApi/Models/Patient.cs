namespace HospitalManagementApi.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }

        // Foreign key to Doctor
        public int DoctorId { get; set; }
        public Doctor Doctor { get; set; }

        // Foreign key to Hospital
        public int HospitalId { get; set; }
        public Hospital Hospital { get; set; }
    }
}