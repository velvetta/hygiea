using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Hygiea.Infrastructure.Encryption
{
    public class Encryption
    {
        public static string MD5Hash(string input)
        {
            if (string.IsNullOrEmpty(input))
                throw new ArgumentNullException(nameof(input));

            var md5 = MD5.Create();
            var bytes = md5.ComputeHash(Encoding.UTF8.GetBytes(input));
            return BitConverter.ToString(bytes);
        }
    }
}
