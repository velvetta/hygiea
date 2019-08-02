import React from "react";
import { Table } from "react-bootstrap";
import AddDrugs from "./AddDrug/AddDrug";
import styles from "./Drugs.module.css";

class Drugs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        Id: "",
        Name: "",
        Quantity: "",
        DateAdded: "",
        Price: ""
      },
      show: false,
      isUpdating: false,
      selectedDrug: null,
      data: []
    };
  }
  a;
  componentDidMount() {
    this.getDrugs();
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

  getDrugs() {
    fetch("http://localhost:52161/api/drug/getdrugs", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ data: data });
        console.log("Hit!");
      })
      .catch(err => console.log(err));

    const data = [
      {
        name: "Attesunate",
        quantity: "3000 units",
        dateAdded: "3rd AUgust 2019",
        price: "₦3,000"
      },
      {
        name: "Paractamol",
        quantity: "160 units",
        dateAdded: "3rd AUgust 2019",
        price: "₦2,500"
      }
    ];
    this.setState({ data: data });
  }

  deleteDrug(id) {
    fetch("http://localhost:52161/api/drug/deletedrug/" + id, {
      method: "DELETE",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
    })
      .then(res => res.text())
      .then(res => console.log(res));
  }

  async getDrug(id) {
    const result = await fetch(
      "http://localhost:52161/api/drug/getdrug/" + id,
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

  async udpateDrugState(id) {
    const gottenDrug = await this.getDrug(id);
    this.setState({ isUpdating: true, show: true, selectedDrug: gottenDrug });
  }

  updateValues(event) {
    const obj = { ...this.state };
    obj.selectedDrug[event.target.name.toLowerCase()] = event.target.value;
    this.setState(obj);
    console.log(this.state.selectedDrug);
  }

  render() {
    return (
      <div>
        <button
          className={styles["add-btn"]}
          onClick={() => this.openModalHandler()}
        >
          Add Drug
        </button>
        <AddDrugs
          OnUpdate={event => this.updateValues(event)}
          drug={this.state.selectedDrug}
          updating={this.state.isUpdating}
          show={this.state.show}
          Close={() => this.closeModalHandler()}
        />
        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>DateAdded</th>
              <th>Price</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data
              ? this.state.data.map((value, key) => (
                  <tr key={key}>
                    <td>{value.name}</td>
                    <td>{value.quantity}</td>
                    <td>{value.dateAdded}</td>
                    <td>{value.price}</td>
                    <td>
                      <button
                        className={styles["delete-btn"]}
                        onClick={() => this.deleteDrug(value.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles["update-btn"]}
                        onClick={async () =>
                          await this.udpateDrugState(value.id)
                        }
                      >
                        Update
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
}

export default Drugs;
