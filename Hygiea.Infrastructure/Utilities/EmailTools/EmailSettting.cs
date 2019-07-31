using System;
using System.Collections.Generic;
using System.Text;

namespace Hygiea.Infrastructure.Utilities
{
   public class EmailSetting
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
    }
}