import React from 'react';

class GetUsers extends React.Component{
    state = {
        credentials: {
          Id: "",
          FirstName: "",
          LastName: "",
          EmailAddress: "",
          Gender: "",
          Phonenumber: "",
          DateOfBirth: "",
          Address: "",
        },
        student: {
          Faculty: "",
          Department: "",
          MatricNumber: "",
          ParentPhoneNumber: "",
          ParentAddress: "",
          YearofEntry: ""
        },
        staff: {
          YearofEmployment: "",
          NextofKin: "",
          NextofKinAddress: "",
          NextofKinPhoneNumber: ""
        },
        AccountType: "student",
      };
}


export default GetUsers