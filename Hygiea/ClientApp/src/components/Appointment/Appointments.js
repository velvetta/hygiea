import React from "react";
import { Table, Button } from "react-bootstrap";
import { getTokenDetails } from "../../utils";
import AddAppointment from "./AddAppointment/AddAppointment";
import styles from "./Appointments.module.css";

class GetAppointments extends React.Component {
  state = {
    credentials: {
      Id: "",
      DateofAppointment: "",
      IsAppointmentApprovedAdmin: "",
      IsAppointmentApprovedUser: "",
      PurposeofAppointment: "",
      DateAppointmentMade: "",
      User: ""
    },
    data: [],
    show: false,
    isUpdating: false,
    selectedAppointment: null
  };

  componentDidMount() {
    // if (!getTokenDetails()) return;
    // if (getTokenDetails().RoleName === "RegularUser") {
    this.getUserAppointment();
    // } else if (getTokenDetails().RoleName === "Administrator") {
    this.getAppointments();
    // }
  }

  openModalHandler() {
    this.setState({
      show: true
    });
  }

  closeModalHandler() {
    this.setState({
      show: false,
      isUpdating: false
    });
  }

  async getAppointment(id) {
    const result = await fetch(
      "http://localhost:52161/api/appointment/getappointment/" + id,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
      }
    );

    if (result.ok) {
      const data = await result.json();
      return data;
    } else {
      const error = await result.text();
      alert(error);
    }
  }

  async udpateAppointmentState(id) {
    const gottenAppointment = await this.getAppointment(id);
    console.log(gottenAppointment);
    this.setState({
      isUpdating: true,
      show: true,
      selectedAppointment: gottenAppointment
    });
  }

  updateValues(event) {
    const obj = { ...this.state };
    obj.selectedAppointment[event.target.name] = event.target.value;
    this.setState(obj);
    console.log(this.state.selectedAppointment[event.target.name]);
  }

  getAppointments() {
    console.log("Fetching...");
    // fetch("http://localhost:52161/api/appointment/getappointments", {
    //   method: "GET",
    //   headers: new Headers({
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //     this.setState({ data: data });
    //   })
    //   .catch(err => console.log(err));

    const data = [
      {
        id: "06dd162f-f80a-4587-8cdc-670839c6a22f",
        emailAddress: "soem@shuhsu.com",
        dateAppointmentMade: "20th JUNE 2019",
        dateofAppointment: "21st JULY 2019",
        purposeofAppointment: "Medical Checkup"
      },
      {
        id: "06dd162f-f80a-4587-8cdc-670839c6a22f",
        emailAddress: "snskskdp@shuhsu.com",
        dateAppointmentMade: "20th FEB. 2019",
        dateofAppointment: "21st JULY 2019",
        purposeofAppointment: "Cancer Surgery"
      }
    ];
    this.setState({ data: data });
  }

  getUserAppointment() {
    // const userId = getTokenDetails().Id;
    // fetch(
    //   `http://localhost:52161/api/appointment/getuserappointment?userId=${userId}`,
    //   {
    //     method: "GET",
    //     headers: new Headers({
    //       Accept: "application/json",
    //       "Content-Type": "application/json"
    //     })
    //   }
    // )
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //     this.setState({ data: data });
    //   })
    //   .catch(err => console.log(err));

    return [
      {
        id: "06dd162f-f80a-4587-8cdc-670839c6a22f",
        emailAddress: "soem@shuhsu.com",
        dateAppointmentMade: "20th JUNE 2019",
        dateofAppointment: "21st JULY 2019",
        purposeofAppointment: "Medical"
      }
    ];
  }

  deleteAppointment(id) {
    fetch("http://localhost:52161/api/appointment/deleteappointment/" + id, {
      method: "DELETE",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
    })
      .then(res => res.text())
      .then(res => console.log(res));
  }

  handleApproveAdminAppointment(id) {
    const obj = {
      IsAppointmentApprovedAdmin: this.state.credentials
        .IsAppointmentApprovedAdmin,
      IsAppointmentApprovedUser: this.state.credentials
        .IsAppointmentApprovedUser
    };
    fetch(
      "http://localhost:52161/api/appointment/approveadminappointment/" + id,
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
      }
    )
      .then(res => res.json())
      .then(data => {})
      .catch(err => alert("Error ocurred!"));

    console.log(obj);
  }

  handleApproveUserAppointment(id) {
    const obj = {
      IsAppointmentApprovedAdmin: this.state.credentials
        .IsAppointmentApprovedAdmin,
      IsAppointmentApprovedUser: this.state.credentials
        .IsAppointmentApprovedUser
    };
    fetch(
      "http://localhost:52161/api/appointment/approveuserappointment/" + id,
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
      }
    )
      .then(res => res.json())
      .then(data => {})
      .catch(err => alert("Error ocurred!"));

    console.log(obj);
  }

  renderAdminTable() {
    return (
      <div>
        <AddAppointment
          OnUpdate={event => this.updateValues(event)}
          appointment={this.state.selectedAppointment}
          updating={this.state.isUpdating}
          show={this.state.show}
          Close={() => this.closeModalHandler()}
        />

        <Table responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date of Appointment</th>
              <th>Purpose of Appointment</th>
              <th>Date Appointment Made</th>
              <th>Action</th>
              <th>Action</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data
              ? this.state.data.map((value, key) => (
                  <tr key={key}>
                    <td>{value.id}</td>
                    <td>{value.emailAddress}</td>
                    <td>{value.dateAppointmentMade}</td>
                    <td>{value.dateofAppointment}</td>
                    <td>{value.purposeofAppointment}</td>
                    <td>
                      <button
                        className={styles["delete-btn"]}
                        onClick={() => this.deleteAppointment(value.id)}
                      >
                        Delete ms
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={async () =>
                          await this.udpateAppointmentState(value.id)
                        }
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <Button
                        onClick={() =>
                          this.handleApproveAdminAppointment(value.id)
                        }
                      >
                        Approve
                      </Button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </div>
    );
  }

  renderUserTable() {
    return (
      <div>
        <button
          className={styles["add-btn"]}
          onClick={() => this.openModalHandler()}
        >
          ADD APPOINTMENT
        </button>
        <AddAppointment
          OnUpdate={event => this.updateValues(event)}
          appointment={this.state.selectedAppointment}
          updating={this.state.isUpdating}
          show={this.state.show}
          Close={() => this.closeModalHandler()}
        />
        <Table responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date of Appointment</th>
              <th>Date Appointment Made</th>
              <th>Purpose</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data
              ? this.state.data.map((value, key) => (
                  <tr key={key}>
                    <td>{value.id}</td>
                    <td>{value.dateAppointmentMade}</td>
                    <td>{value.dateofAppointment}</td>
                    <td>{value.purposeofAppointment}</td>
                    <td>
                      <button
                        className={styles["delete-btn"]}
                        onClick={() => this.deleteAppointment(value.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </div>
    );
  }

  render() {
    return <div>{this.renderUserTable()}</div>;
  }
}

export default GetAppointments;
