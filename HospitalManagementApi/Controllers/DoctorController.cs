using HospitalManagementApi.Models;
using HospitalManagementApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagementApi.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly DoctorService _doctorService;

        public DoctorController(DoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        // GET: api/doctor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
        {
            var doctors = await _doctorService.GetDoctorsAsync();
            return Ok(doctors);
        }

        // GET: api/doctor/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> GetDoctor(int id)
        {
            var doctor = await _doctorService.GetDoctorByIdAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            return Ok(doctor);
        }

        // POST: api/doctor
        [HttpPost]
        public async Task<ActionResult<Doctor>> CreateDoctor(Doctor doctor)
        {
            try
            {
                var newDoctor = await _doctorService.AddDoctorAsync(doctor);
                return CreatedAtAction(nameof(GetDoctor), new { id = newDoctor.Id }, newDoctor);
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }

        // PUT: api/doctor/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDoctor(int id, Doctor doctor)
        {
            try
            {
                await _doctorService.UpdateDoctorAsync(id, doctor);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        // DELETE: api/doctor/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            try
            {
                await _doctorService.DeleteDoctorAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}