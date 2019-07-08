using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Hygiea.Core.DTOs;
using Hygiea.Core.Entities;
using Hygiea.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hygiea.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentRepository appointmentRepository;
        private readonly IMapper mapper;
        public AppointmentController(IAppointmentRepository appointmentRepository,IMapper mapper)
        {
            this.appointmentRepository = appointmentRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        // [Authorize]
        [Route("addappointment")]
        public async Task<IActionResult> AddAppointment(string userId, [FromBody] AppointmentDTO appointmentDTO){
            if (!ModelState.IsValid)
                return BadRequest();

            if(userId == null) return BadRequest("No User Id");
            var appointment = mapper.Map<AppointmentDTO, Appointment>(appointmentDTO);
            await appointmentRepository.AddAppointmentAsync(userId , appointment);
            return Ok("Success");
        }

        [HttpDelete]
        [Route("deleteappointment/{id}")]
        // [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteAppointment(string id){
            if (!ModelState.IsValid)
                return BadRequest();
            
            if(id != null){
                await appointmentRepository.DeleteAppointmentAsync(id);
                return Ok("Success");
            }
            return BadRequest();
        }

        [HttpGet]
        // [Authorize(Roles = "Administrator")]
        [Route("getappointments")]
        public async Task<IEnumerable<AppointmentDTO>> GetAppointments(){
             if (!ModelState.IsValid)
                return null;

            var allAppointment = await appointmentRepository.GetAllAppointmentAsync();
           
            var appointmentCollection = new List<AppointmentDTO>();
            allAppointment.ToList().ForEach(x=>appointmentCollection.Add(mapper.Map<Appointment, AppointmentDTO>(x)));
            return appointmentCollection;
        }

        [HttpGet]
        [Route("getuserappointment")]
        // [Authorize]
        public async Task<IEnumerable<AppointmentDTO>> GetUserAppointment(string userId){
            if (!ModelState.IsValid)
                return null;

            var userAppointment = await appointmentRepository.GetUserAppointments(userId);
            var appointmentCollection = new List<AppointmentDTO>();
            userAppointment.ToList().ForEach(x=>appointmentCollection.Add(mapper.Map<Appointment, AppointmentDTO>(x)));
            return appointmentCollection;
        }
        
        [HttpGet]
        [Authorize(Roles = "Administration")]
        [Route("getdailyappointment")]
        public async Task<IEnumerable<AppointmentDTO>> GetDailyAppointment(){
            if (!ModelState.IsValid)
                return null;
            var dailyAppointment = await appointmentRepository.GetDailyAppointment();
               var appointmentCollection = new List<AppointmentDTO>();
            dailyAppointment.ToList().ForEach(x=>appointmentCollection.Add(mapper.Map<Appointment, AppointmentDTO>(x)));
            return appointmentCollection;
        }

        [HttpGet]
        [Route("approvedappointment")]
        public async Task<IEnumerable<AppointmentDTO>> ApprovedAppointment(){
            if (!ModelState.IsValid)
                return null;
            var approvedAppointment = await appointmentRepository.ApprovedAppointment();
            var appointmentCollection = new List<AppointmentDTO>();
            approvedAppointment.ToList().ForEach(x=>appointmentCollection.Add(mapper.Map<Appointment, AppointmentDTO>(x)));
            return appointmentCollection;
        }

        
        [HttpPost]
        [Route("approveadminappointment/{id}")]
        public async Task<IActionResult> ApproveAdminAppointment(string id){
            if (!ModelState.IsValid)
                return null;

            if(id !=null){
                await appointmentRepository.ApproveAdminAppointment(id);
                return Ok("Success");
            }
            return BadRequest("Not Successful");
        }
         
        [HttpPost]
        [Route("approveuserappointment/{id}")]
        public async Task<IActionResult> ApproveUserAppointment(string id){
            if (!ModelState.IsValid)
                return null;

            if(id !=null){
                await appointmentRepository.ApproveUserAppointment(id);
                return Ok("Success");
            }
            return BadRequest("Not Successful");
        }
        
        [HttpPut]
        [Route("updateappointments")]
        public async Task<IActionResult> UpdateAppointment (AppointmentDTO appointmentDTO){
            if (!ModelState.IsValid)
                return null;
            if(appointmentDTO != null){
                var appointment = mapper.Map<AppointmentDTO, Appointment>(appointmentDTO);
                await appointmentRepository.UpdateAppointment(appointment);
                return Ok("Success");
            }
            return BadRequest("Not Successful");
        }

        [Route("getappointment/{id}")]
        [HttpGet]
        public async Task<AppointmentDTO> GetAppointment (string id){
            if (!ModelState.IsValid)
                return null;
            if(id != null){
                var appointment = await appointmentRepository.GetAppointment(id);
                var appointmentDto = mapper.Map<Appointment, AppointmentDTO>(appointment);
                return appointmentDto;
            }
            return null;
        }

       
    
    }
}