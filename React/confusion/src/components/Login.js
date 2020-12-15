import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup,
  Form, Label, Input} from 'reactstrap';
import { useHistory } from 'react-router-dom';

import  { Redirect } from 'react-router-dom'


class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
        isModalOpen: false
    }
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

    alert("Success");
    event.preventDefault()
    this.props.history.push('/home')

  }

  handleSignup(event){
    this.toggleModal();
    alert("Success");
    event.preventDefault();

  }

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
                  <img alt="" src="assets/images/logo-diarium-new.png" width="200px" align-self="center">
                  </img>
                  <p className="text-center">Diarium Next Version  </p>               
                </div>
            </center>
            <FormGroup>
                  <Label htmlFor="username">Username</Label>
                    <span  className="input-group-addon">
                      <img alt="" src="assets/images/username.png" width="16px">
                      </img>
                    </span>
                  <Input type="text" id="username" name="username"  innerRef={(input) => this.nik = input}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                    <span  className="input-group-addon">
                      <img alt="" src="assets/images/password-red.png" width="16px">
                      </img>
                     </span>
                  <Input type="text" id="password" name="password"  innerRef={(input) => this.password = input}/>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                      <Input type="checkbox" name="remember"
                       innerRef={(input) => this.remember = input}/>
                                Remember Me
                    </Label>
                </FormGroup>
            <Button type="submit" value="submit"color="primary" className="bg-primary pull-right"          
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

export default Login;
