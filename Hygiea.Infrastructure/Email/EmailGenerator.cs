using System;
using System.Collections.Generic;
using System.Text;

namespace Hygiea.Infrastructure.Email
{
    public class EmailGenerator
    {
       
       public static string GenerateAddAppointmentEmailTemplate(string appointmentId, string dateOfAppointment, string purposeOfAppointment, string dateOfAppointmentMade, string firstName, string lastName ){
           
           var addappointmenttemplate = string.Format(EmailTemplate.AddAppointmentEmailTemplate, appointmentId, dateOfAppointment,purposeOfAppointment, dateOfAppointment, firstName, lastName);
           return addappointmenttemplate;
        }

        public static string GenerateAddAppointmentUserEmailTemplate(string appointmentId){
            var addappointmentUsertemplate = string.Format(EmailTemplate.AddAppointmentUserEmailTemplate, appointmentId);
            return addappointmentUsertemplate;
        }
        
        public static string GenerateApproveUserEmailTemplate(string firstName, string lastName, string appointmentId){

            var approveUsertemplate = string.Format(EmailTemplate.ApproveAppointmentUserEmailTemplate, firstName, lastName, appointmentId);
            return approveUsertemplate;
        }
        

        public static string GenerateUpdateAppointmentUserEmailTemplate (string firstName, string lastName, string appointmentId)
        {
            var updateAppointmentUserTemplate = string.Format(EmailTemplate.UpdateAppointmentUserEmailTemplate, firstName,lastName,appointmentId);
            return updateAppointmentUserTemplate;
        }

        public static string GenerateRegistrationSuccessEmailTemplate (string firstName, string lastName){
        
            var registrationSuccessTemplate = string.Format(EmailTemplate.RegistrationSuccessEmailTemplate, firstName ,lastName);
            return registrationSuccessTemplate;
        }

        public static string GenerateWarningDrugsEmailTemplate(string drugId, string drugName){

            var warningDrugsTemplate = string.Format(EmailTemplate.WarningDrugsEmailTemplate, drugId, drugName);
            return warningDrugsTemplate;
        }

        public static string GenerateFinishedDrugsEmailTemplate (string drugId, string drugName){

            var finishedDrugsEmailTemplate = string.Format(EmailTemplate.FinishedDrugsEmailTemplate, drugId, drugName);
            return finishedDrugsEmailTemplate;
        }
    }
}