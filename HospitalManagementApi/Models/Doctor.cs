namespace HospitalManagementApi.Models
{
    public class Doctor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Qualification { get; set; }
        public string JobSpecification { get; set; }
        public string Gender { get; set; }

        // Foreign key to Hospital
        public int HospitalId { get; set; }
        public Hospital Hospital { get; set; }

         public ICollection<Patient> Patients { get; set; }
    }
}