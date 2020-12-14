import React, { Component } from "react";
import getPatientData from "../dummy";
import { v1 as uuidv1 } from "uuid";
export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: [],
      selectedId: [],
      search: "",
      id: "",
      name: "",
      mdn: "",
      address: "",
      hospital: "",
      phone: "",
      nameError:"",
      mdnError:"",
      addressError:"",
      hospitalError:"",
      phoneError:"",
      show: true,
      display: false,
    };
  }

  componentDidMount = () => {
    const data = getPatientData();
    this.setState({
      patient: data,
    });
  };
  addToSeletedId = (id) => {
    let newSelectedId = [...this.state.selectedId];
    if (!this.state.selectedId.includes(id)) {
      newSelectedId.push(id);
    } else {
      newSelectedId = newSelectedId.filter((ID) => ID !== id);
    }
    this.setState({
      selectedId: newSelectedId,
    });
  };
  deleteMultiple = () => {
    let newPatientData=[...this.state.patient];
    if(window.confirm('Are you sure , you want delete selected records?')){
    this.state.selectedId.forEach((Id)=>{
        newPatientData=newPatientData.filter((patient)=>patient._id!==Id)
    });}
    this.setState({
      patient:newPatientData,
      selectedId:[]
    })
  };
  handleAddPatient = (e) => {
    e.preventDefault();
    const patientData = [...this.state.patient];
    if (this.state.id) {
      const id = this.state.id;
      for (let key in patientData) {
        if (patientData[key]._id === id) {
          patientData[key].name = this.state.name;
          patientData[key].doctorId = this.state.mdn;
          patientData[key].address = this.state.address;
          patientData[key].Hospital = this.state.hospital;
          patientData[key].phone = this.state.phone;
        }
      }
    } else {
      const id = uuidv1();
      patientData.push({
        _id: id,
        name: this.state.name,
        doctorId: this.state.mdn,
        address: this.state.address,
        Hospital: this.state.hospital,
        phone: this.state.phone,
      });
    }
    this.setState({
      patient: patientData,
      name: "",
      mdn: "",
      address: "",
      hospital: "",
      phone: "",
    });
  };
  handleEditPatient = (id) => {
    const patient = this.state.patient.find((person) => person._id === id);
    this.setState({
      id: patient._id,
      name: patient.name,
      mdn: patient.doctorId,
      address: patient.address,
      hospital: patient.Hospital,
      phone: patient.phone,
    });
  };
  handleDeletePatient = (id) => {
    const patientData = this.state.patient.filter(
      (person) => person._id !== id
    );
    this.setState({
      patient: patientData,
    });
  };
  handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    this.props.history.push("/");
  };
  onhandleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const filteredData = this.state.patient.filter((person) => {
      return (
        person.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });

    return (
      <div className="container mt-5">
        <h1>
          Welcome to DashBoard
        </h1>
        <div className="text-right">
          <button
            type="button"
            className="btn btn-danger m-2"
            onClick={this.handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="p-5 border">
          <div className="text-right">
            <button
              type="button"
              className="btn btn-primary "
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Add New
            </button>

            {!this.state.display ? (
              <button
                type="button"
                className="btn btn-danger m-2"
                onClick={(e) => this.setState({ display: !this.state.display })}
              >
                Delete
              </button>
            ) : (
             
              <button
                type="button"
                className="btn btn-danger m-2"
                onClick={(e) => {
                  this.setState({ display: !this.state.display });
                  this.deleteMultiple();
                }}
              >
                Delete Selected
              </button>
            )}
            {this.state.display?<button
              type="button"
              className="btn btn-secondary m-2"
              onClick={(e) => {
                this.setState({ display: !this.state.display });
                this.setState({
                  selectedId:[]
                })
              }}
            >
              Cancel
            </button>:null}
            <div
              className="modal fade"
              id="exampleModal"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Enter Patient Details
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form className="mt-5 p-5 border rounded">
                      <div className="form-group">
                        <h5 className="text-left font-weight-bold">
                          Patient Name
                        </h5>
                        <input
                          type="text"
                          placeholder="Enter Username"
                          className="form-control"
                          id="name"
                          value={this.state.name}
                          onChange={this.onhandleChange}
                          required
                        ></input>
                        <p>{this.state.nameError}</p>
                      </div>
                      <div className="form-group">
                        <h5 className="text-left font-weight-bold ">MRN</h5>
                        <input
                          type="text"
                          placeholder="Enter MRN"
                          className="form-control"
                          value={this.state.mdn}
                          id="mdn"
                          pattern="[a-zA-Z0-9]+" 
                          required
                          onChange={this.onhandleChange}
                        ></input>
                        <p className="text-left">{this.state.mdnError}</p>
                      </div>
                      <div className="form-group">
                        <h5 className="text-left font-weight-bold">
                          Hospital Name
                        </h5>
                        <input
                          type="text"
                          placeholder="Enter Hospital Name"
                          className="form-control"
                          id="hospital"
                          onChange={this.onhandleChange}
                          value={this.state.hospital}
                          required
                        ></input>
                        <p className="text-left">{this.state.hospitalError}</p>
                      </div>
                      <div className="form-group">
                        <h5 className="text-left font-weight-bold">
                          Patient Address
                        </h5>
                        <input
                          type="text"
                          placeholder="Enter Patient Address"
                          className="form-control"
                          id="address"
                          value={this.state.address}
                          onChange={this.onhandleChange}
                          required
                        ></input>
                        <p className="text-left">{this.state.addressError}</p>
                      </div>
                      <div className="form-group">
                        <h5 className="text-left font-weight-bold">
                          Mobile Number
                        </h5>
                        <input
                          type="tel"
                          placeholder="Enter Mobile Number"
                          className="form-control"
                          id="phone"
                          value={this.state.phone}
                          onChange={this.onhandleChange}
                          required
                        ></input>
                        <p className="text-left">{this.state.phoneError}</p>
                      </div>
                      <button
                        type="button"
                        className="btn btn-success btn-lg btn-block"
                        data-dismiss="modal"
                        onClick={this.handleAddPatient}
                      >
                        Save
                      </button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h4 className="text-left">Patient Details</h4>
          <div className="row text-center">
            <div className="col">
              <input
                type="text"
                placeholder="Type here to search patient"
                className="form-control"
                id="search"
                value={this.state.search}
                onChange={this.onhandleChange}
              ></input>
            </div>
            <div className="col text-left ">
              <button type="button" className="btn btn-success ">
                Search
              </button>
            </div>
          </div>
        </div>
        <table className="table table-bordered p-2">
          <thead>
            <tr>
              <th scope="col">Patient Name</th>
              <th scope="col">MRN</th>
              <th scope="col">Hospital Name</th>
              <th scope="col">Patient Address</th>
              <th scope="col">Mobile Number</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((person) => {
              return (
                <tr key={person._id}>
                  <td>{person.name}</td>
                  <td>{person.doctorId}</td>
                  <td>{person.Hospital}</td>
                  <td>{person.address}</td>
                  <td>{person.phone}</td>
                  <td key={person._id}>
                    {!this.state.display?<div><i
                      type="button"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      className="btn btn-warning  material-icons"
                      onClick={(e) => {
                        e.preventDefault();
                        this.handleEditPatient(person._id);
                      }}
                    >
                      edit
                    </i>
                    <i
                      className="material-icons btn btn-danger"
                      type="button"
                      data-toggle="modal"
                      data-target="#exampleModal1"
                      onClick={(e) => {
                        if (
                          window.confirm(
                            `Are you sure , you want delete ${person.name}`
                          )
                        ) {
                          this.handleDeletePatient(person._id);
                        }
                      }}
                    >
                      delete_forever
                    </i></div>:null}
                    {this.state.display ? (
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <input
                            type="checkbox"
                            value={this.state.show}
                            aria-label="Checkbox for following text input"
                            onClick={(e) => {
                              this.setState({
                                show: !this.state.show,
                              });
                              this.addToSeletedId(person._id);
                            }}
                          ></input>
                        </div>
                      </div>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dashboard;
