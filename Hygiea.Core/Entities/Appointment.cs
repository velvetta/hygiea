using System;
using System.Collections.Generic;
using System.Text;

namespace Hygiea.Core.Entities
{
    public class Appointment {
        public string Id {get;set;}
        public DateTime DateofAppointment{get;set;}
        public bool IsAppointmentApprovedAdmin {get;set;}
        public bool IsAppointmentApprovedUser {get;set;}
        public string PurposeofAppointment {get;set;}
        public DateTime DateAppointmentMade{get;set;}
        public virtual User User {get;set;}
    }
}