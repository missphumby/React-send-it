import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {
  LinkButtons,
  
  SubmitButtons,
  registerButton,
  homeButton,
  forgotButton,
  inputStyle,
  HeaderBar,
} from '../container';

const title = {
  pageTitle: 'Forgot Password Screen',
};

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
      showNullError: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = async (e) => {
    const url = "https://send-it-app.herokuapp.com"
    e.preventDefault();
    const { email } = this.state;
    console.log("got here>>>>", email)
    if (email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
        showNullError: true
      });
    } else {
      fetch(`${url}/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({email})
      })
      .then(res => res.json())
      .then(response => {
        console.log("response", response)
        if (response.message === 'recovery email sent') {
          this.setState({
            showError: false,
            messageFromServer: 'recovery email sent',
            showNullError: false,
          });
        }
      })
      .catch(err => {
        this.setState({
          showError: true,
          messageFromServer: '',
          showNullError: false,
        });
      })
    }
  };

  render() {
    const {
      email, messageFromServer, showNullError, showError
    } = this.state;

    return (
      <div>
        <HeaderBar title={title} />
        <div className="forgot" style={{ height: "200px" }}>
          <form className="profile-form" onSubmit={this.sendEmail}>
            <TextField
              style={inputStyle}
              id="email"
              label="email"
              value={email}
              onChange={this.handleChange('email')}
              placeholder="Email Address"
            />
            <SubmitButtons
              buttonStyle={forgotButton}
              buttonText="Send Password Reset Email"
            />
          </form>
        </div>
        {showNullError && (
          <div>
            <p>The email address cannot be null.</p>
          </div>
        )}
        {showError && (
          <div>
            <p>
              That email address isn&apos;t recognized. Please try again or
              register for a new account.
            </p>
            <LinkButtons
              buttonText="Register"
              buttonStyle={registerButton}
              link="/register"
            />
          </div>
        )}
        {messageFromServer === 'recovery email sent' && (
          <div>
            <h3>Password Reset Email Successfully Sent!</h3>
          </div>
        )}
        <LinkButtons buttonText="Go Home" buttonStyle={homeButton} link="/" />
      </div>
    );
  }
}

export default ForgotPassword;
