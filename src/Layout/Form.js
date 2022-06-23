import React, { useState } from "react";

import axios from "axios";

import "../Layout/Css/Form.css";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
function Form() {

    const [state, setState] = useState({
        name: "",
    age: "",
    userName: "",
      });

    

      const URL = "http://localhost:8000"

     
  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

      const handleSubmit = e => {
        e.preventDefault();
    
        let formData = { ...state }
        console.log(formData)
       
    
        axios.post(`${URL}/createUser`, formData)
          .then((res) => {
            console.log("A new user has been successfully added.")
            
         
          })
          .catch(err => {
            console.error(err)
           
          })
          toast.success('user Has Been Added ', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
           
           
         
       
      }
     

  return (
    <>
    <div className="container">
      <div className="row align-items-center mt-5">
        <div className="col-6 mx-auto">
          <div className="card">
            <div className="card-body d-flex flex-column align-items-center">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col">
                      <h6>Your Name:</h6>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      name="name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                  <h6>Your F'Name</h6>

                    <input
                      type="number"
                      className="form-control"
                      placeholder="F name"
                      name="age"
                      onChange={handleChange}
                    />
                  </div>
                  
                </div>
                <div className="col">
                      <h6>Email:</h6>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                     name="userName"
                      onChange={handleChange}
                    />
                  </div>
                 <div className="mt-2 btn">
                     <button className="btn btn-info" > Submit</button>
                 </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  );
}

export default Form;
