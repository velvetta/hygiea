using Hygiea.Core.Entities;
using Hygiea.Core.Interfaces;
using Hygiea.Infrastructure.Service;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hygiea.Infrastructure.Repository
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly Database.DataContext dataContext;
        private readonly IUtilitiesServices utilitiesServices; 
       
        public AppointmentRepository(Database.DataContext dataContext, IUtilitiesServices utilitiesServices)
        {
            this.dataContext = dataContext;
            this.utilitiesServices = utilitiesServices;
            
        }
        public async Task<bool> AddAppointmentAsync(string userId , Appointment appointment)
        {
            if(userId == null) return false; 
            
            var user = await dataContext.Users.SingleOrDefaultAsync(x=>x.Id == userId);

            var appointments = new Appointment{
                Id =  $"HYGA - {new Random().Next(1111111,9999999)}",
                IsAppointmentApprovedAdmin = false,
                IsAppointmentApprovedUser = false,
                DateAppointmentMade = DateTime.Now,
                User = user,
                PurposeofAppointment = appointment.PurposeofAppointment,
                DateofAppointment = Convert.ToDateTime(appointment.DateofAppointment)
            };
            
            
            await dataContext.Appointments.AddAsync(appointments);
            await utilitiesServices.AddAppointmentEmail(appointments);
            
            return await dataContext.SaveChangesAsync() == 1;

        }

        public async Task<IEnumerable<Appointment>> ApprovedAppointment()
        {
            return await dataContext.Appointments.Where(x => x.IsAppointmentApprovedAdmin == true && x.IsAppointmentApprovedUser == true).ToListAsync();
        }

        public async Task<bool> DeleteAppointmentAsync(string id)
        {
            if(id !=null){
                var find = await dataContext.Appointments.SingleOrDefaultAsync(x=>x.Id == id);
                dataContext.Appointments.Remove(find);
                return await dataContext.SaveChangesAsync() == 1;
            }
            return false;
        }

        public async Task<IEnumerable<Appointment>> GetAllAppointmentAsync()
        {
            return await dataContext.Appointments.Include(x=>x.User).ToListAsync();
        }

        public async Task<IEnumerable<Appointment>> GetUserAppointments(string userId)
        {
            var getUserAppointment = await dataContext.Appointments.Include(x=>x.User).Where(x=>x.User.Id == userId).ToListAsync();
            return getUserAppointment;
        }

        public async Task<bool> UpdateAppointment(Appointment appointment)
        {
            if(appointment == null) return false;
            
            dataContext.Appointments.Update(appointment);
            await dataContext.SaveChangesAsync();
            await utilitiesServices.UpdateAppointmentEmail(appointment.Id);
            return true;
            
           
        }
        

        
        public async Task<bool> ApproveAdminAppointment(string id){
            if(id == null) return false;
            var appointment = await dataContext.Appointments.SingleOrDefaultAsync(x=>x.Id == id);
            appointment.IsAppointmentApprovedAdmin = true;
            await dataContext.SaveChangesAsync();
            
            return true;
        }
         public async Task<bool> ApproveUserAppointment(string id){
            if(id == null) return false;
            var appointment = await dataContext.Appointments.SingleOrDefaultAsync(x=>x.Id == id);
            appointment.IsAppointmentApprovedUser = true;
            await dataContext.SaveChangesAsync();
            await utilitiesServices.ApproveUserEmail(id);
            return true;
        }

        public async Task<Appointment> GetAppointment(string id){
            if(id == null) return null;

            var appointmentId = await dataContext.Appointments.SingleOrDefaultAsync(x=>x.Id == id);
            return appointmentId;
        }

        public async Task<IEnumerable<Appointment>> GetDailyAppointment(){

            var dailyAppointment = await dataContext.Appointments.Where(x=>x.DateofAppointment.Date == DateTime.Now.Date).ToListAsync();
            return dailyAppointment;
        }

        public async Task<IEnumerable<Appointment>> PendingAppointment()
        {
            var pendingAppointment = await dataContext.Appointments.Where(x=>x.IsAppointmentApprovedAdmin == false && x.IsAppointmentApprovedUser == true ||
            x.IsAppointmentApprovedAdmin == true && x.IsAppointmentApprovedUser== false).ToListAsync();

            return pendingAppointment;
        }
    }
}