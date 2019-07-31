using Hygiea.Core.Interfaces;
using Hygiea.Infrastructure.Utilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hygiea.Infrastructure.Service
{
    public class EmailService : IEmailSender
    {
        public async Task<bool> SendEmailAsync(string body, string subject, string to,string from = null)
        {
             return await Mailer.SendMailAsync(subject, body, to,from);
        }
    }
}