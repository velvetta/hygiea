import React from "react";
import { 
    Button,
    Modal,
    ControlLabel,
    FormControl,
    FormGroup } from "react-bootstrap";


class AddDrugs extends React.Component{
state = {
    credentials:{
        Name:"",
        Quantity:"",
        Price:"",
    }
};

handleAddDrugs(){
    const obj = {...this.state.credentials};
    fetch("http://localhost:52161/api/drug/adddrugs",{
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

handleUpdateDrugs(){
    const obj = {...this.props.drug};
    fetch("http://localhost:52161/api/drug/updatedrugs",{
    method: "PUT",
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

handleChange(event){
        const obj = {...this.state}
    if(event.target.name === "Name" ){
        obj.credentials.Name = event.target.value;
    }else if(event.target.name === "Quantity"){
        obj.credentials.Quantity = event.target.value;
    }else if(event.target.name === "Price"){
        obj.credentials.Price = event.target.value;
    }

    this.setState(obj);
    return;
}
  
render(){
    return(
        <Modal show={this.props.show} onHide={() => this.props.Close()}>
                <Modal.Header>
                    <Modal.Title>Add Drugs</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormGroup>
                    <ControlLabel>Name</ControlLabel>
                    <FormControl 
                    name="Name"
                    value={!this.props.updating ? this.state.credentials.Name : this.props.drug.name}
                    onChange={event => !this.props.updating ? this.handleChange(event) : this.props.OnUpdate(event)}
                    placeholder="Enter Drug Name"/>
                    </FormGroup>
                    <FormGroup>
                    <ControlLabel>Quantity</ControlLabel>
                    <FormControl 
                    name="Quantity"
                    value={! this.props.updating ? this.state.credentials.Quantity : this.props.drug.quantity}
                    onChange={event => !this.props.updating ? this.handleChange(event) : this.props.OnUpdate(event)}
                    placeholder="Enter Quantity"/>
                    </FormGroup>
                    <FormGroup>
                    <ControlLabel>Price</ControlLabel>
                    <FormControl 
                    name="Price"
                    value={! this.props.updating ? this.state.credentials.Price : this.props.drug.price}
                    onChange={event => !this.props.updating ? this.handleChange(event) : this.props.OnUpdate(event)}
                    placeholder="Enter Drug Price"/>
                    </FormGroup>
                   
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.props.Close()}>Close</Button>
                    {!this.props.updating ? <Button bsStyle="primary" onClick={()=>this.handleAddDrugs()}>Add Drug</Button> :
                    <Button bsStyle="primary" onClick ={()=>this.handleUpdateDrugs()}>Update Drug</Button>}
                </Modal.Footer>
            </Modal>
    )
}


}

export default AddDrugs;