using Hygiea.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hygiea.Core.Interfaces
{
    public interface IUtilitiesServices
    {
        Task<bool> AddAppointmentEmail (Appointment appointment); 
        Task<bool> ApproveUserEmail(string id );
        Task<bool> UpdateAppointmentEmail(string id);
        Task<bool> RegistrationSuccessEmail (string id);
        Task<bool> WarningDrugsEmail (string id);
        Task<bool> FinishedDrugsEmail (string id);
    }
}