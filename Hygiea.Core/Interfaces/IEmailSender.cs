using Hygiea.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hygiea.Core.Interfaces
{
    public interface IEmailSender
    {
        Task<bool> SendEmailAsync(string body, string subject, string to,string from = null);
    }
}