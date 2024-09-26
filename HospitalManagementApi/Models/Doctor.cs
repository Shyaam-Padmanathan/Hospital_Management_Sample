using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
        [ForeignKey("Hospital")]
        public int HospitalId { get; set; }

        public virtual Hospital Hospital { get; set; } = new Hospital();

        [JsonIgnore]
        public virtual ICollection<Patient> Patients { get; set; } = new List<Patient>();
    }
}   