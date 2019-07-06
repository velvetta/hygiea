using Hygiea.Core.Entities;
using Hygiea.Core.Interfaces;
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
        public AppointmentRepository(Database.DataContext dataContext)
        {
            this.dataContext = dataContext;
        }
        public async Task<bool> AddAppointmentAsync(string userId , Appointment appointment)
        {
            if(userId == null) return false; 
            
            var appointmentUser = await dataContext.Appointments.Include(x=>x.User).SingleOrDefaultAsync(x=>x.Id == appointment.Id);
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
            
            
            await dataContext.Appointments.AddAsync(appointment);
            
            return await dataContext.SaveChangesAsync() == 1;

        }

        public async Task<IEnumerable<Appointment>> ApprovedAppointment()
        {
            return await dataContext.Appointments.Where(x => x.IsAppointmentApprovedAdmin == true && x.IsAppointmentApprovedUser == true).ToListAsync();
        }

        public async Task<bool> DeleteAppointmentAsync(string id)
        {
            if(id !=null){
                var find = await dataContext.Appointments.FindAsync(id);
                dataContext.Appointments.Remove(find);
                return await dataContext.SaveChangesAsync() == 1;
            }
            return false;
        }

        public async Task<IEnumerable<Appointment>> GetAllAppointmentAsync()
        {
            return await dataContext.Appointments.ToListAsync();
        }

        public async Task<IEnumerable<Appointment>> GetUserAppointments(string userId)
        {
            var getUserAppointment = await dataContext.Appointments.Include(x=>x.User.FirstName).Include(x=>x.User.LastName).Where(x=>x.User.Id == userId).ToListAsync();
            return getUserAppointment;
        }

        public async Task<bool> UpdateAppointment(Appointment appointment)
        {
            if(appointment == null) return false;
            var appointmentToUpdate = await dataContext.Appointments.SingleAsync(x=>x.Id == appointment.Id);
            appointment.DateofAppointment = appointmentToUpdate.DateofAppointment;
            return await dataContext.SaveChangesAsync() ==1;
        }
        

        public async Task<bool> ApproveAppointment(string id){
            if(id == null) return false;

            var appointment = await dataContext.Appointments.Include(x=>x.User).SingleOrDefaultAsync(x=>x.Id == id);
            
            if(appointment.User.AccountType == "Administrator") {
                appointment.IsAppointmentApprovedAdmin = true;
            }else if (appointment.User.AccountType == "RegularUser"){
                appointment.IsAppointmentApprovedUser = true;
            }
            return await dataContext.SaveChangesAsync()==1;
        }

        public async Task<Appointment> GetAppointment(string id){
            if(id == null) return null;

            var appointmentId = await dataContext.Appointments.SingleOrDefaultAsync(x=>x.Id == id);
            return appointmentId;
        }
        
    }
}