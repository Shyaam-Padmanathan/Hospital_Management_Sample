using HospitalManagementApi.Models;
using HospitalManagementApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalController : ControllerBase
    {
        private readonly HospitalService _hospitalService;

        public HospitalController(HospitalService hospitalService)
        {
            _hospitalService = hospitalService;
        }

        // GET: api/hospital
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hospital>>> GetHospitals()
        {
            var hospitals = await _hospitalService.GetHospitalsAsync();
            return Ok(hospitals);
        }

        // GET: api/hospital/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Hospital>> GetHospital(int id)
        {
            var hospital = await _hospitalService.GetHospitalByIdAsync(id);
            if (hospital == null)
            {
                return NotFound();
            }

            return Ok(hospital);
        }

        // POST: api/hospital
        [HttpPost]
        public async Task<ActionResult<Hospital>> CreateHospital(Hospital hospital)
        {
            try
            {
                var newHospital = await _hospitalService.AddHospitalAsync(hospital);
                return CreatedAtAction(nameof(GetHospital), new { id = newHospital.Id }, newHospital);
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }

        // PUT: api/hospital/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHospital(int id, Hospital hospital)
        {
            try
            {
                await _hospitalService.UpdateHospitalAsync(id, hospital);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        // DELETE: api/hospital/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHospital(int id)
        {
            try
            {
                await _hospitalService.DeleteHospitalAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}