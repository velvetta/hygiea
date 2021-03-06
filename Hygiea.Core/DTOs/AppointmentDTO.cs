using System;
using System.Collections.Generic;
using System.Text;
using Hygiea.Core.Entities;

namespace Hygiea.Core.DTOs
{
    public class AppointmentDTO{
        public string Id {get;set;}
        public string DateofAppointment{get;set;}
        public bool IsAppointmentApprovedAdmin {get;set;}
        public bool IsAppointmentApprovedUser {get;set;}
        public string PurposeofAppointment {get;set;}
        public string DateAppointmentMade{get;set;}
        public User User {get;set;}
    }
}