using Hygiea.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hygiea.Core.Interfaces
{
    public interface IAppointmentRepository
    {
        Task<bool> AddAppointmentAsync(string userId , Appointment appointment);
        Task<bool> DeleteAppointmentAsync (string id);
        Task<IEnumerable<Appointment>> GetAllAppointmentAsync ();
        Task<bool> UpdateAppointment(Appointment appointment);
        Task<Appointment> GetAppointment (string id);
        Task<IEnumerable<Appointment>> ApprovedAppointment();
        Task<IEnumerable<Appointment>> GetUserAppointments(string userId);
        Task<bool> ApproveAdminAppointment(string id);
        Task<bool> ApproveUserAppointment(string id);
        Task<IEnumerable<Appointment>> GetDailyAppointment();
        Task<IEnumerable<Appointment>> PendingAppointment();
        

    }
}