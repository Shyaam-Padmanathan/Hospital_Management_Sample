namespace HospitalManagementApi.Models
{
    public class Hospital
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string Address { get; set; }

        public ICollection<Doctor>? Doctors { get; set; } = null;
        public ICollection<Patient>? Patients { get; set; } = null;
    }
}