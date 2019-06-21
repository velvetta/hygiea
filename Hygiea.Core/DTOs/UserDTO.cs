using System;
using System.Collections.Generic;
using System.Text;

namespace Hygiea.Core.DTOs
{
    public class UserDTO
    {
        //gereral informatoin 
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string Gender { get; set; }
        public int Phonenumber { get; set; }
        public string DateOfBirth { get; set; }
        public string Address { get; set; }
        public string PasswordHash { get; set; }
        public string AccountType { get; set; }

        //student informaton 
        public string Faculty { get; set; }
        public string Department { get; set; }
        public string MatricNumber { get; set; }
        public int ParentPhoneNumber { get; set; }
        public string ParentAddress { get; set; }
        public int YearofEntry { get; set; }

        //staff information 
        public int YearofEmployment { get; set; }
        public string NextofKin { get; set; }
        public string NextofKinAddress { get; set; }
        public string NextofKinPhoneNumber { get; set; }
    }
}
