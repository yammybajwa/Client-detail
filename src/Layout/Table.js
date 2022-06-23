import React, { useState, useEffect } from "react";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";

import 'bootstrap-icons/font/bootstrap-icons.css';

import "../Layout/Css/Form.css";


import axios from "axios";
import { toast } from "react-toastify";


function Table() {
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [userName, setUserName] = useState("");
  
  const [update, setupdate] = useState(0);
  const [flag, setflag] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [docForEdit, setDocForEdit] = useState({});

  const URL = "http://localhost:8000";
  useEffect(() => {
    axios
      .get(`${URL}/getUsers`)
      .then((res) => {
        // console.log(res.data)
        setDocuments(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChangeDocForEdit = e => {
    console.log(e.target.name)
    console.log(e.target.value)
    setDocForEdit(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const showModal = doc => {
    console.log(doc)
    setDocForEdit(doc)
    setflag(true);
  }

  const handleUpdate = (doc, index) => {
    console.log(doc, index);
    // const { _id } = doc;
    // console.log(_id)
    setupdate(index);
    setname(doc.name);
    setage(doc.age);
    setUserName(doc.userName);
    setflag(true);
  };

  const fromHandler = (e) => {
    e.preventDefault();
    const formData = {
      name,
      age,
      userName,
     
    };
    
  };

  const updateHandler = () => {
    console.log(docForEdit)
    // const formData = {
    //   name,
    //   age,
    //   userName,
    //   rollNo,
    // };
    let newData = documents.map((item, index) => {
      console.log(item._id)
      if (docForEdit._id === item._id) {
        return docForEdit;
      } else {
        return item;
      }
    });
    console.log(docForEdit._id)
    console.log(newData);
    setDocuments(newData);
    // setflag(false)

    axios
      .put(`${URL}/updateUser`, docForEdit)
      .then((res) => {
        console.log("message from server", res.data);
        alert("User has been successfully updated.");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (doc) => {
    console.log(doc);

    const { _id } = doc;

    axios
      .delete(`${URL}/deleteUser/${_id}`)
      .then((res) => {
        // console.log("User deleted");
        // console.log("message from server", res.data);
        // setDocuments(res.data)
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        // console.log("finally worked")
      });

      let filterDoc =documents.filter((doc)=>{
      return doc._id !==_id;

      });
      setDocuments(filterDoc)

  };
 
  return (
    <>
  
  <div className="container mt-5">
      <div className="row">
          <div className="col">
          <div
          className="modal fade"
          id="exampleModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{flag ? "Update" : "Edit"} New Student</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="row g-3 py-4 px-4 ">
                  <div className="col-md-12">
                    <label className="form-label text-uppercase ">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Name"
                      name="name"
                      value={docForEdit.name}
                      onChange={handleChangeDocForEdit}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label text-uppercase">Class</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="userName"
                      name="userName"
                      value={docForEdit.userName}
                      onChange={handleChangeDocForEdit}
                    />
                  </div>
                  <div className="col-md-12">
                    <label
                      htmlFor="inputPassword4"
                      className="form-label text-uppercase"
                    >
                      Age
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="Enter Your Age"
                      name="age"
                      value={docForEdit.age}
                      onChange={handleChangeDocForEdit}
                    />
                  </div>

                  
                  
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                {flag ? (
                  <button
                    type="submit"
                    className="btn text-white bg-primary"
                    data-bs-dismiss="modal"
                    onClick={updateHandler}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn text-white bg-primary"
                    data-bs-dismiss="modal"
                    onClick={fromHandler}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
          <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">UserName</th>
                    <th scope="col">Age</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc,i) => (
                      
                    <tr key={i}>

                      <td >{doc.name}</td>
                      <td>{doc.userName}</td>
                      <td>{doc.age}</td>
                      <td > <span><button className="btn btn-info sm-btn width "onClick={() => { showModal(doc) }} data-bs-toggle="modal" data-bs-target="#exampleModal"><i   className="bi bi-pencil-square hover"></i></button></span></td>
                      <td > <span><button className="btn btn-danger sm-btn width "onClick={() => { handleDelete(doc) }}><i  className="bi bi-x-octagon hover"></i></button></span></td>
                      
                    </tr>
                  ))}
                </tbody>
                
              </table>
          </div>
      </div>
  </div>
    </>
  );
}

export default Table;
