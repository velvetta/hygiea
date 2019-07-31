using System;
using System.Collections.Generic;
using System.Text;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;
using System.Diagnostics;


namespace Hygiea.Infrastructure.Utilities
{

    public class Mailer
    {
        private static EmailSetting emailSetting = null;

        //Should be called before sending a mail
        //username and password are for network credentials, host and port are the transport agent
        public static void Configure(string host, int port, string username, string password)
        {
            try
            {
                emailSetting = new EmailSetting
                {
                    Host = host,
                    Port = port,
                    Username = username,
                    Password = password
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async static Task<bool> SendMailAsync(string subject,string body, string to, string from = null)
        {
            try
            {
                if (from == null)
                    from = emailSetting.Username;

                var From = new MailAddress(from);
                var MailMessage = new MailMessage
                {
                    From = From,
                    Subject = subject,
                    Body = body
                };
                MailMessage.To.Add(new MailAddress(to));
                MailMessage.IsBodyHtml = true;

                var credentials = new NetworkCredential(emailSetting.Username, emailSetting.Password);
                var mailer = new SmtpClient(emailSetting.Host, emailSetting.Port)
                {
                    UseDefaultCredentials = false,
                    Credentials = credentials,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network
                };

                await mailer.SendMailAsync(MailMessage);
                Debug.WriteLine("Sent");
                return true;
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"ERROR! : {ex.Message}"); return false;
            }
        }

       
    }
}
