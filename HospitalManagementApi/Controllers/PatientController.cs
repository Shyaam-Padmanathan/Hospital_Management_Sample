using HospitalManagementApi.Models;
using HospitalManagementApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly PatientService _patientService;

        public PatientController(PatientService patientService)
        {
            _patientService = patientService;
        }

        // GET: api/patient
        //[Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
            var patients = await _patientService.GetPatientsAsync();
            return Ok(patients);
        }

        // GET: api/patient/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(int id)
        {
            var patient = await _patientService.GetPatientByIdAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            return Ok(patient);
        }

        // POST: api/patient
        [HttpPost]
        public async Task<ActionResult<Patient>> CreatePatient(Patient patient)
        {
            try
            {
                var newPatient = await _patientService.AddPatientAsync(patient);
                return CreatedAtAction(nameof(GetPatient), new { id = newPatient.Id }, newPatient);
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }

        // PUT: api/patient/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePatient(int id, Patient patient)
        {
            try
            {
                await _patientService.UpdatePatientAsync(id, patient);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        // DELETE: api/patient/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            try
            {
                await _patientService.DeletePatientAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}