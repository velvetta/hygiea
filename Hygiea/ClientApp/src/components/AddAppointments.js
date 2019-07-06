import React from "react";
import {
    Button,
    Modal,
    ControlLabel,
    FormControl,
    FormGroup,
} from "react-bootstrap";
import { getTokenDetails } from './Utilities'

class AddAppointment extends React.Component {
    state = {
        credentials: {
            DateofAppointment: "",
            PurposeofAppointment: "",
            User: ""
        }
    }

    handleAddAppointment() {
        const obj = { ...this.state.credentials }
        const userId = getTokenDetails().Id

        fetch(`http://localhost:52161/api/appointment/addappointment?userId=${userId}`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json"
            })
        })

            .then(res => res.json())
            .then(data => { })
            .catch(err => console.log(err));


        console.log(obj);
    }

    handleUpdateAppointment() {
        const obj = { ...this.props.appointment };
        fetch("http://localhost:52161/api/appointment/updateappointments", {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json"
            })
        })

            .then(res => res.json())
            .then(data => { })
            .catch(err => alert("Error ocurred!"));

        console.log(obj);
    }
    handleChange(event) {
        const obj = { ...this.state }
        if (event.target.name === "PurposeofAppointment") {
            obj.credentials.PurposeofAppointment = event.target.value;
        } else if (event.target.name === "DateofAppointment") {
            obj.credentials.DateofAppointment = event.target.value;
        }
        this.setState(obj)
        return
    }

    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={() => this.props.Close()}>
                    <Modal.Header>
                        <Modal.Title>Add Appointment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <ControlLabel>Purpose of Appointment</ControlLabel>
                            <FormControl
                                name="PurposeofAppointment"
                                onChange={event => this.handleChange(event)}
                                placeholder="Enter Purpose of Appointment"
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Date of Appointment</ControlLabel>
                            <FormControl
                                name="DateofAppointment"
                                onChange={event => this.handleChange(event)}
                                placeholder="Enter Date of Appointment"
                            />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.props.Close()}>Close</Button>
                        {!this.props.updating ? <Button bsStyle="primary" onClick={() => this.handleAddAppointment()}>Add Drug</Button> :
                            <Button bsStyle="primary" onClick={() => this.handleUpdateAppointment()}>Update Drug</Button>}
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}
export default AddAppointment