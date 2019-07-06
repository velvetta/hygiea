import React from 'react';
import { Table , Button } from 'react-bootstrap';
import {getTokenDetails} from './Utilities';
import AddAppointment from './AddAppointments';
class GetAppointments extends React.Component{


    state ={
        credentials:{
            Id:"",
            DateofAppointment:"",
            IsAppointmentApprovedAdmin:"",
            IsAppointmentApprovedUser:"",
            PurposeofAppointment:"",
            DateAppointmentMade:"",
            User:""
        },
        data :[],
        show:false,
        isUpdating: false,
        selectedAppointment: null,
        
    };

    componentDidMount(){
        if(getTokenDetails().AccountType === "RegularUser") {
            this.getUserAppointment()
        }
        else if (getTokenDetails().AccountType === "Administrator"){
            this.getAppointments()

        
        }
    }
    openModalHandler(){
        this.setState({
            show: true
        });
    }
    closeModalHandler(){
        this.setState({
            show: false,
            isUpdating: false
        });
    }

    async getAppointment(id){
        const result = await fetch("http://localhost:52161/api/appointment/getappointment/" + id,{
            method: "GET",
            headers: new Headers({
                "Accept": "application/json",
                "Content-Type": "application/json"
            })
        });

        if(result.ok){
            const data = await result.json();
            return data;
        }else{
            const error = await result.text();
            alert(error);
        }
    }

    async udpateAppointmentState(id){
        const gottenAppointment = await this.getAppointment(id);
        this.setState({isUpdating: true,show: true,selectedAppointment : gottenAppointment});
    }

    updateValues(event){
        const obj = {...this.state};
        obj.selectedAppointment[event.target.name.toLowerCase()] = event.target.value;
        this.setState(obj);
        console.log(this.state.selectedAppointment);
    }

        getAppointments(){
            fetch("http://localhost:52161/api/appointment/getappointments",{
                method: "GET",
                headers: new Headers({
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({data: data});
            })
            .catch(err => console.log(err));
        }
        
        getUserAppointment(){
            const userId = getTokenDetails().Id
            fetch("http://localhost:52161/api/appointment/getuserappointment/" + userId,{
                method: "GET",
                headers: new Headers({
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({data: data});
            })
            .catch(err => console.log(err));
        }

        deleteAppointment(id){
            fetch("http://localhost:52161/api/appointment/deleteappointment/" + id,{
                method: "DELETE",
                headers: new Headers({
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                })
            })
            .then(res => res.text())
            .then(res => console.log(res));
        }

    handleApproveAppointment(id){
            const obj = {IsAppointmentApprovedAdmin: this.state.credentials.IsAppointmentApprovedAdmin , IsAppointmentApprovedUser: this.state.credentials.IsAppointmentApprovedUser};
            fetch("http://localhost:52161/api/appointment/approveappointment" + id,{
                method: "POST",
                body: JSON.stringify(obj),
                headers: new Headers({
                    "Accept": "application/json",
                    "Content-Type": "application/json"
        })
    })

    .then(res => res.json())
    .then(data => {})
    .catch(err => alert("Error ocurred!"));

      console.log(obj);
        }
    
    
        renderAdminTable(){
            return (
                <div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th> 
                                <th>Date of Appointment</th>
                                <th>Purpose of Appointment</th>
                                <th>Date Appointment Made</th>       
                                <th>Approve</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data ? 
                                    this.state.data.map((value , key) => 
                                    (
                                        <tr key={key}>
                                            <td>{value.Id}</td>
                                            <td>{value.FirstName + value.LastName}</td>
                                            <td>{value.DateAppointmentMade}</td>
                                            <td>{value.DateofAppointment}</td>
                                            <td>{value.PurposeofAppointment}</td>
                                            {value.IsAppointmentApprovedAdmin === true  ? <td><Button onClick={()=>this.handleApproveAppointment(value.Id)}></Button></td> :null} 
                                            <td><button onClick={() => this.deleteAppointment(value.Id)}>Delete</button></td>
                                            <td><button onClick={async () => await this.udpateAppointmentState(value.id)}>Update</button></td>

                                        </tr>
                                    )
                                ) : null
                            }
                        </tbody>
                    </Table>
                </div>
            )
        }

        renderUserTable(){
            console.log(getTokenDetails().AccountType)
        
            return(
                <div>
                    <button onClick={() => this.openModalHandler()}>Add Appointment</button>
                    <AddAppointment OnUpdate={(event) => this.updateValues(event)} appointment={this.state.selectedAppointment}  updating={this.state.isUpdating} show={this.state.show} Close={() => this.closeModalHandler()}></AddAppointment>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date of Appointment</th>
                                <th>Purpose of Appointment</th>
                                <th>Date Appointment Made</th>       
                                <th>Approve</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data ? 
                                    this.state.data.map((value , key) => 
                                    (
                                        <tr key={key}>
                                            <td>{value.Id}</td>
                                            <td>{value.DateAppointmentMade}</td>
                                            <td>{value.DateofAppointment}</td>
                                            <td>{value.PurposeofAppointment}</td>
                                            {value.IsAppointmentApprovedAdmin === true  ? <td><Button onClick={()=>this.handleApproveAppointment(value.Id)}></Button></td> :null} 
                                            <td><button onClick={() => this.deleteAppointment(value.Id)}>Delete</button></td>

                                        </tr>
                                    )
                                ) : null
                            }
                        </tbody>
                    </Table>
                </div>
            )
        }

        render(){
            return(
                <div>
                    { getTokenDetails().RoleName === "Administrator" ? this.renderAdminTable() : this.renderUserTable() }
                </div>
            )
        }
}

export default GetAppointments

