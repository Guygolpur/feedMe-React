import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import './Register.css'
export let Gmail = "barazouri24@gmail.com";
 
export default class Register extends Component {

  render() {

    const responseGoogle = (res) => {
      let email = res.w3.U3;
      console.log(email);
      Gmail = email;
      this.props.history.push("/home")

    const url = `https://feedme24.herokuapp.com/addProfile`;
    fetch(`${url}`,
      {method:'POST',
      body:`gmailAccount=${Gmail}`,                      //**** */
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
   }})
    .then(res => res.json())
      .catch(err => console.error(err));
    }

    return (
      <div className="register">
			  <h1>FeedMe</h1>
			  <p>Login with Google:</p>
			  <div className = "g-signin">
          <GoogleLogin
          className="gmailButton"
          clientId="319145740916-5io3dfcp3l1m4ksa1k0nfjsvgrlevvlf.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          />
        </div>
		  </div>
    );
  }
}