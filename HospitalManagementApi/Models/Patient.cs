using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
        [ForeignKey("Doctor")]
        public int DoctorId { get; set; }


        // Foreign key to Hospital
        [ForeignKey("Hospital")]
        public int HospitalId { get; set; }

        [JsonIgnore]
        public virtual Doctor Doctor { get; set; } = new Doctor();

        [JsonIgnore]
        public virtual Hospital Hospital { get; set; } = new Hospital();
    }
}