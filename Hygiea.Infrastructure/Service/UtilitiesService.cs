using Hygiea.Core.Entities;
using Hygiea.Core.Interfaces;
using Hygiea.Infrastructure.Email;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hygiea.Infrastructure.Service
{
    public class UtilitiesService : IUtilitiesServices
    {
        private readonly IEmailSender emailSender; 
        private readonly Database.DataContext dataContext;

        public UtilitiesService(IEmailSender emailSender, Database.DataContext dataContext)
        {
            this.emailSender =emailSender;
            this.dataContext =dataContext;
        }
        public async Task<bool> AddAppointmentEmail(Appointment  appointment)
        {
            if(appointment == null) return false;

            var user = appointment.User;

            var sendUserBody =  EmailGenerator.GenerateAddAppointmentUserEmailTemplate(appointment.Id);
            var sendAdminBody = EmailGenerator.GenerateAddAppointmentEmailTemplate(appointment.Id, appointment.DateofAppointment.ToString(), appointment.PurposeofAppointment, appointment.DateAppointmentMade.ToString(), user.FirstName, user.LastName);

            await emailSender.SendEmailAsync(sendUserBody, "Appointment Added", user.EmailAddress);
            await emailSender.SendEmailAsync(sendAdminBody, "User Added Appointment", "eagle_ex2009@yahoo.com");
            return true;
        }

        public async Task<bool> ApproveUserEmail(string id ){

            if(id != null){

                var currentAppointment = await dataContext.Appointments.Include(x=>x.User).SingleOrDefaultAsync(x=>x.Id == id);
                var user = currentAppointment.User;

                var sendUserBody = EmailGenerator.GenerateApproveUserEmailTemplate(user.FirstName , user.LastName , currentAppointment.Id);
                await emailSender.SendEmailAsync(sendUserBody, "Approve Appointment" ,user.EmailAddress);
                return true;
            }
            return false;
        }

       public async Task<bool> UpdateAppointmentEmail(string id){

           if(id == null) return false;
        
            var currentAppointment = await dataContext.Appointments.Include(x=>x.User).SingleOrDefaultAsync(x=>x.Id == id);

            var user = currentAppointment.User;
            var sendUserBody = EmailGenerator.GenerateUpdateAppointmentUserEmailTemplate(user.FirstName , user.LastName, currentAppointment.Id);
            await emailSender.SendEmailAsync(sendUserBody, "Updated Scheduled Appointment", user.EmailAddress);
            return true;
       }

       public async Task<bool> RegistrationSuccessEmail (string id){
           if(id != null){
               var user = await dataContext.Users.SingleOrDefaultAsync(x=>x.Id == id);
               var sendUserBody = EmailGenerator.GenerateRegistrationSuccessEmailTemplate(user.FirstName , user.LastName);
               await emailSender.SendEmailAsync(sendUserBody, "Registration Successful", user.EmailAddress);
               return true;
           }

           return false;
       }

        public async Task<bool> WarningDrugsEmail (string id){
            if(id==null) return false; 
            var drug = await dataContext.Drugs.SingleOrDefaultAsync(x=>x.Id == id);
            var sendAdminBody = EmailGenerator.GenerateWarningDrugsEmailTemplate(drug.Id, drug.Name);
            await emailSender.SendEmailAsync(sendAdminBody, "Drug About to Finish !!!", "eagle_ex2009@yahoo.com");
            return true;
        }

        public async Task<bool> FinishedDrugsEmail (string id){
            if(id == null) return false;

            var drug = await dataContext.Drugs.SingleOrDefaultAsync(x=>x.Id == id);
            var sendAdminBody = EmailGenerator.GenerateFinishedDrugsEmailTemplate(drug.Id, drug.Name);
            await emailSender.SendEmailAsync(sendAdminBody, "Finshed Drug !", "eagle_ex2009@yahoo.com");
            return true;
        }
    }
}