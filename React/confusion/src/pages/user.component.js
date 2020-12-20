import React, {Component} from 'react';
import { Navbar, NavbarBrand,  NavbarToggler,  Jumbotron, 
        Button, Modal, ModalHeader, ModalBody, FormGroup,
        Form, Label, Input} from 'reactstrap';
import { history } from '../helpers';


class User extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          user: []
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
    
        };
        
        fetch('/api/users/getUser')
          .then(res => res.json())
          .then(json => {
            this.setState({
              counters: json
            });
          });
      }

    render() {
        return(
          <div>
              <Navbar dark expand="md">
                <div className="container">
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand className="mr-auto" href="/">
                    <img src="public/assets/images/logo.png" height="30"
                            alt="Diarium" />
                    </NavbarBrand>
                    <NavbarBrand className="mr-auto" href="/">
                    <Form id="search-box" className="search-box" action="">
                                <input autoComplete="off" title="Find friends, new people e.t.c"   type="text" name="term"  placeholder="Find friends, new people e.t.c"/>
                            </Form>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleModal} />
                    <NavbarBrand className="mr-auto"  onClick={this.toggleModal} >
                                <span className="fa-check-square-o "></span>Check IN
                    </NavbarBrand>
                    <NavbarToggler onClick={this.handleLogout} />
                    <NavbarBrand className="mr-auto"  onClick={this.handleLogout}>
                                 <span className="fa fa-sign-out "></span>Log Out
                    </NavbarBrand>
                    
                </div>
            </Navbar>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader  className="text-center" toggle={this.toggleModal}>Checkin</ModalHeader>
                <ModalBody>
                    <Form >
                        <center>
                            <a onClick={this.toggleModalLocation}>
                                <img  value="sehat" border="0" alt="Sehat" src="assets/images/sehat.png" width="100" height="100"/>
                                    <span className="caption">Sehat</span>                                
                                <img border="0" alt="Kurang Sehat" src="assets/images/kurang-sehat.png" width="100" height="100"/>
                                    <span className="caption">Kurang Sehat</span>                                
                                <img border="0" alt="Sakit" src="assets/images/sakit.png" width="100" height="100"/>
                                    <span className="caption">Sakit</span>                                
                            </a>
                        </center>
               
                    </Form>
                </ModalBody>
            </Modal>
            <Modal isOpen={this.state.isModalOpenLocation} toggle={this.toggleModalLocation}>
                <ModalHeader  className="text-center" toggle={this.toggleModalLocation}>Location</ModalHeader>
                <ModalBody>
                    <Form >
                        <center>
                            <a onClick={this.toggleModalAddActivity}>
                                <img  value="sehat" border="0" alt="Office" src="assets/images/office.png" width="100" height="100"/>
                                    <span className="caption">Office</span>                                
                                <img border="0" alt="Home" src="assets/images/home.png" width="100" height="100"/>
                                    <span className="caption">Home</span>                                
                                <img border="0" alt="Satelit" src="assets/images/satelit.png" width="100" height="100"/>
                                    <span className="caption">Satelit</span>                                
                            </a>
                        </center>
               
                    </Form>
                </ModalBody>
            </Modal>
            <Modal isOpen={this.state.isModalOpenAddActivity} toggle={this.toggleModalAddActivity}>
                <ModalHeader toggle={this.toggleModalAddActivity}>Tambah Aktivitas</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleCheckin}>
                        <FormGroup>
                            <Label htmlFor="activities">Activity</Label>
                            <Input type="text" id="activities" name="activities"
                                innerRef={(input) => this.activities = input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="date">Tanggal</Label>
                            <Input type="date" id="date" name="date"
                            innerRef={(input) => this.date = input}/>
                        </FormGroup>
                        <Button type="submit" value="submit"color="primary" className="bg-primary right-button">Save</Button>
                    </Form>
                </ModalBody>
            </Modal>
            <Modal isOpen={this.state.isModalCheckout} toggle={this.toggleModalCheckOut}>
                <ModalHeader  className="text-center" toggle={this.toggleModalCheckOut}>CheckOut</ModalHeader>
                <ModalBody>
                    <Form >
                        <center>
                            <a onClick={this.toggleModalLocationCheckOut}>
                                <img  value="sehat" border="0" alt="Sehat" src="assets/images/sehat.png" width="100" height="100"/>
                                    <span className="caption">Sehat</span>                                
                                <img border="0" alt="Kurang Sehat" src="assets/images/kurang-sehat.png" width="100" height="100"/>
                                    <span className="caption">Kurang Sehat</span>                                
                                <img border="0" alt="Sakit" src="assets/images/sakit.png" width="100" height="100"/>
                                    <span className="caption">Sakit</span>                                
                            </a>
                        </center>
               
                    </Form>
                </ModalBody>
            </Modal>
            <Modal isOpen={this.state.isModalOpenLocationCheckOut} toggle={this.toggleModalLocationCheckOut}>
                <ModalHeader  className="text-center" toggle={this.toggleModalLocationCheckOut}>Location</ModalHeader>
                <ModalBody>
                    <Form >
                        <center>
                            <a onClick={this.toggleModalEditAnRemoveActivity}>
                                <img  value="sehat" border="0" alt="Office" src="assets/images/office.png" width="100" height="100"/>
                                    <span className="caption">Office</span>                                
                                <img border="0" alt="Home" src="assets/images/home.png" width="100" height="100"/>
                                    <span className="caption">Home</span>                                
                                <img border="0" alt="Satelit" src="assets/images/satelit.png" width="100" height="100"/>
                                    <span className="caption">Satelit</span>                                
                            </a>
                        </center>
               
                    </Form>
                </ModalBody>
            </Modal >
            <Modal isOpen={this.state.isModalOpenEditAndRemoveActivity} toggle={this.toggleModalEditAnRemoveActivity}>
                <ModalHeader toggle={this.toggleModalEditAnRemoveActivity}>Edit And Remove Activities </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleCheckOut}>
                        <Button type="submit" value="submit"color="primary" className="bg-primary">Save</Button>
                    </Form>
                </ModalBody>
            </Modal>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Welcome Back</h1>
                            <p>Stay connected with your coworkers within TelkomGroup.</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
          </div>
        )
    }
}

export default User;