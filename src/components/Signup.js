import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import './Login.css';
import profile from "./../images/a.png";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth token to the local storage
      localStorage.setItem('token', json.authtoken);
      history.push("/");
      props.showAlert("Account Created Successfully", "success")

    }
    else {
      props.showAlert("Invalid detials", "danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='bg'>

      <div className='container mt-3 main ' style={{ width: '40%' }}>
        <div className='signup-sub-main'>

          {/* ///////////////////////////// */}
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" className="profile" />
            </div>
          </div>
          {/* ///////////////////////////// */}

          <h2 className='my-3'>Create an account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              {/* <label htmlFor="name">Full Name</label> */}
              <input type="text" className="form-control input1" id="name" name='name' aria-describedby="nameHelp" onChange={onChange} placeholder="Enter the full name" />
            </div>
            <div className="mb-3">
              {/* <label htmlFor="email">Email address</label> */}
              <input type="email" className="form-control input1" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="mb-3">
              {/* <label htmlFor="password">Password</label> */}
              <input type="password" className="form-control input1" id="password" name='password' onChange={onChange} minLength={5} required placeholder="Password" />
            </div>
            <div className="mb-3">
              {/* <label htmlFor="cpassword">Confirm Password</label> */}
              <input type="password" className="form-control input1" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required placeholder="Confirm Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup