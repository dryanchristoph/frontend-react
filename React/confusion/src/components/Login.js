import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup,
  Form, Label, Input} from 'reactstrap';

import { history } from '../helpers';
// import { useHistory } from 'react-router-dom';

// import  { Redirect } from 'react-router-dom'

// import /* APIKit, */ {setClientToken} from '../shared/APIKit';

const initialState = {
  username: '',
  password: '',
  errors: {},
  isAuthorized: false,
  isLoading: false,
};

class Login extends Component {
  constructor(props){
    super(props);
    this.state = initialState
    this.setState ({
        isModalOpen: false
    })
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);

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

    
    fetch('/api/users/login', {  method: 'POST', 
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ username: this.state.username, password: this.state.password })})
      .then((res) => {
        // return res.json()
        return res
    })
    .then((json) => {
      // Do something with the returned data.
      console.log(json.result);
      /* if(json.status===200)
        localStorage.setItem("user", json.result);
      else if(json)
        return false */
    });

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
    this.toggleModal();
    alert("Success");
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
                  <img alt="" src="assets/images/logo-diarium-new.png" width="150px" align-self="center">
                  </img>
                  <p className="text-center">Diarium Next Generation - Team VSCode</p>
                </div>
            </center>
            <FormGroup>
                  <Label htmlFor="username">Username</Label>
                    <span  className="input-group-addon">
                      <img alt="" src="assets/images/username.png" width="16px">
                      </img>
                    </span>
                  <Input type="text" id="username" name="username" onChange={(e) => this.setState({ username : e.target.value })}  innerRef={(input) => this.setState ( {username : input})}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                    <span  className="input-group-addon">
                      <img alt="" src="assets/images/password-red.png" width="16px">
                      </img>
                     </span>
                  <Input type="password" id="password" name="password" onChange={(e) => this.setState({ password : e.target.value })} innerRef={(input) => this.setState({ password : input }) }/>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                      <Input type="checkbox" name="remember"
                       innerRef={(input) => this.remember = input}/>
                                Remember Me
                    </Label>
                </FormGroup>
            <Button type="submit" value="submit"color="primary" className="bg-danger btn-block mt-2 mb-2"          
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
                        <FormGroup>
                            <Label htmlFor="nik">NIK</Label>
                            <Input type="text" id="nik" name="nik"
                                innerRef={(input) => this.nik = input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="firstName">Email</Label>
                            <Input type="text" id="firstName" name="firstName"
                                innerRef={(input) => this.firstName = input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="lastName">Nomer Telepon</Label>
                            <Input type="text" id="lastName" name="lastName"
                                innerRef={(input) => this.lastName = input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username"
                                innerRef={(input) => this.username = input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password"
                            innerRef={(input) => this.password = input}/>
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
export { Login }
