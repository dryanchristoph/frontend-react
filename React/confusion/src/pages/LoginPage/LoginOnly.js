import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup,
  Form, Label, Input} from 'reactstrap';

import config from 'config'
import { history } from '../../helpers';
// import { useHistory } from 'react-router-dom';

// import  { Redirect } from 'react-router-dom'

// import /* APIKit, */ {setClientToken} from '../shared/APIKit';

const initialState = {
  username: '',
  password: '',
  regNik: '',
  regFirstname: '',
  regLastname: '',
  regUsername: '',
  regPassword: '',
  errors: {},
  isAuthorized: false,
  isLoading: false,
  alertMessage: null,
  alertMessageSignup: null
};

class LoginOnly extends Component {
  constructor(props){
    super(props);
    this.state = initialState
    this.setState ({
        isModalOpen: false
    })
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }

  toggleModal() {
    this.setState({
        isModalOpen: !this.state.isModalOpen
    })
  }


  handleLogin(event){
    event.preventDefault()
    const {username, password} = this.state;
    const payload = {username, password};
    console.log('payload = ')
    console.log(payload);

    /* const onSuccess = ({data}) => {
      // Set JSON Web Token on success
      setClientToken(data.token);
      console.log('login successful')
      console.log(data)
      this.setState({isLoading: false, isAuthorized: true});
    }; */

    /* const onFailure = error => {
      console.log(error && error.response);
      console.log('login failed')
      console.log(error)
      this.setState({errors: error, isLoading: false});
    }; */

    // Show spinner when call is made
    this.setState({isLoading: true});

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.state.username, password: this.state.password })

    };

    fetch('/api/users/login', requestOptions)
        .then(res=>res.clone().json())
        .then( json => {

          console.log('result = ')
          console.log(json)
          if(json.status)
          if(json.status===200){
            console.log(json)
            localStorage.setItem("username", json.result.username);
            localStorage.setItem("token", json.result.token);
            localStorage.setItem("user_id", json.result.user_id);
            history.push('/')
          } else {
            console.log('gagal')
            this.setState({alertMessage: 'Login Authentication Failed.'})
          }
          this.setState({alertMessage: 'Login Authentication Failed.'})
        }).catch(err => {
          this.setState({alertMessage: 'Login Authentication Failed.'})
          console.error(err)
          console.log(err.message)
      });
    /* .then((json) => {
      // Do something with the returned data.
      console.log('result = ')
      console.log(json.body);
      if(json.status===200)
        localStorage.setItem("user", JSON.stringify(json.result));
      else if(json)
        return false
    })
    .then(response => {
      console.log(response);
    }) */

    //axios rollback
    /* APIKit.post('/users/login', payload, {
      headers: { 
      "Content-Type": "application/x-www-form-urlencoded"
    }, mode: 'no-cors'})
      .then(onSuccess)
      .catch(onFailure); */

    /* alert("Success");
    this.props.history.push('/home') */
  }

  handleSignup(event){
    //this.toggleModal();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nik: this.state.regNik, firstname: this.state.regFirstname, lastname: this.state.regLastname, username: this.state.regUsername, password: this.state.regPassword })

    };

    fetch('/api/users/signup', requestOptions)
      .then(res=>res.clone().json())
      .then( json => {
        if(json.status===200){
          console.log(json)             
          this.setState({alertMessageSignup: json.message})
          this.setState({alertMessage: json.message})
          this.toggleModal();
        }
      else if(json){
        this.setState({alertMessageSignup: json.message})
      }
      }).catch(err => {
        console.error(err)
        console.log(err.message)
    });
        
    //alert("Success");
    event.preventDefault();

  }

  onUsernameChange = username => {
    //console.log(username.target.value);
    this.setState({username: username.target.value});
    console.log(username.target.value)
    console.log('state username')
    console.log(this.state.username)
  };

  onPasswordChange = password => {
    this.setState({password: password.target.value});
  };

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className="col-md-8">
          < div className="container-fluid big-bg">
          </div>
          </div>
          <div className="col-md-4 page-login">
          <Form onSubmit={this.handleLogin}>
             <center>
               <div>
                  <img alt="" src="public/assets/images/logo-diarium-new.png" width="150px" align-self="center">
                  </img>
                  <p className="text-center">Diarium Next Generation - Team VSCode</p>
                </div>
            </center>
                {this.state.alertMessage ? (
                <div class="alert alert-danger">{this.state.alertMessage}</div>
                ) : null }
                <FormGroup>
                  <Label htmlFor="username">Username</Label>
                    <span  className="input-group-addon">
                      <img alt="" src="public/assets/images/username.png" width="16px">
                      </img>
                    </span>
                  <Input type="text" id="username" name="username" onChange={(e) => this.setState({ username : e.target.value })}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                    <span  className="input-group-addon">
                      <img alt="" src="assets/images/password-red.png" width="16px">
                      </img>
                     </span>
                  <Input type="password" id="password" name="password" onChange={(e) => this.setState({ password : e.target.value })}/>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                      <Input type="checkbox" name="remember"
                       innerRef={(input) => this.remember = input}/>
                                Remember Me
                    </Label>
                </FormGroup>
            <Button type="submit" value="submit" color="primary" className="bg-danger btn-block mt-2 mb-2"          
             style={{ marginright: "auto" }} >Login</Button>
           <div>
              <Label>
								Don't Have an Account ? <a href="#" onClick={this.toggleModal}>Register</a> 
								{/* <span class="checkmark"></span> */}
							</Label>   
           </div>
                  
           </Form>
       </div>
       </div>
           <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Register</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSignup}>
                        {this.state.alertMessageSignup ? (
                          <div class="alert alert-danger">{this.state.alertMessageSignup}</div>
                          ) : null }
                        <FormGroup>
                            <Label htmlFor="nik">NIK</Label>
                            <Input type="text" id="nik" name="nik" onChange={(e) => this.setState({ regNik : e.target.value })}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="firstName">Nama Depan</Label>
                            <Input type="text" id="firstName" name="firstName" onChange={(e) => this.setState({ regFirstname : e.target.value })}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="lastName">Nama Belakang</Label>
                            <Input type="text" id="lastName" name="lastName" onChange={(e) => this.setState({ regLastname : e.target.value })}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username" onChange={(e) => this.setState({ regUsername : e.target.value })}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password" onChange={(e) => this.setState({ regPassword : e.target.value })}/>
                        </FormGroup>
                        <Button type="submit" value="submit"color="primary" className="bg-primary">Register</Button>
                    </Form>
                </ModalBody>
            </Modal>
      </div>
      
    );
  }
}

//export default Login;
export default LoginOnly
