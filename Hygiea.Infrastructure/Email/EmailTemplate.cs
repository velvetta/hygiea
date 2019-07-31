using System;
using System.Collections.Generic;
using System.Text;

namespace Hygiea.Infrastructure.Email
{
    public class EmailTemplate
    {
        public static string AddAppointmentEmailTemplate = @"
            <div>
                <p>Appointment Id : </p>
                {0}
                <br />
                <p>Date of Appointment : </p>
                {1}
                <br />
                <p>Purpose of Appointment :</p>
                {2}
                <br />
                <p>Date Appointment Made : </p>
                {3}
                <br />
                <p> User </p>
                {4} {5}
            </div>
        ";

        public static string AddAppointmentUserEmailTemplate = @"
            <div>
                <p>Your Appointment {0} has been added successfully . Please wait for approval from the Administrator. </p>
            </div>
        ";
        
        public static string ApproveAppointmentUserEmailTemplate =@"
            <div>
                <p>Dear {0} {1} please log on to your portal to confirm appointment {3}. </p>
            </div>
        ";
        
        public static string UpdateAppointmentUserEmailTemplate =@"
            <div>
                <p>Dear {0} {1} appointment {2} date has been rescheduled. Please log on to the portal to apporve the change or delete the appointment</p>
            </div>
        ";

        public static  string RegistrationSuccessEmailTemplate =@"
            <div>
                <p>Dear {0} {1} registration was successful. Log on to the portal with registered details to gain access. </p>
            </div>
        ";

        public static string WarningDrugsEmailTemplate =@"
           <div>
                <p>Admin, Drug {0} named {1} is about to be finish. Please check and restock. </p>
            </div>
        ";
        public static string FinishedDrugsEmailTemplate =@"
            <div>
                <p>Alert !!!!! </p>
                <p>Admin, Drug {0} named {1} has finish. Please check and restock. </p>
            </div>
        ";
    }
}