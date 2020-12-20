import React, {Component, useState} from 'react';
import { Navbar, NavbarBrand,  NavbarToggler,  Jumbotron, 
        Button, Modal, ModalHeader, ModalBody, FormGroup,
        Form, Label, Input} from 'reactstrap';
import { history } from '../helpers';


class HeaderHome extends Component {

    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isModalCheckout: false,
            isModalOpenLocation: false,
            isModalOpenAddActivity: false,
            isModalOpenLocationCheckOut: false,
            isModalOpenEditAndRemoveActivity: false,
            isLoggedIn: localStorage.getItem('username'),
            condition: false,
            location: false,
            isCheckIn: this.isCheckin
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleModalCheckOut = this.toggleModalCheckOut.bind(this);
        this.toggleModalAddActivity = this.toggleModalAddActivity.bind(this);
        this.toggleModalLocation = this.toggleModalLocation.bind(this);
        this.toggleModalLocationCheckOut = this.toggleModalLocationCheckOut.bind(this);
        this.toggleModalEditAnRemoveActivity = this.toggleModalEditAnRemoveActivity.bind(this);
        this.handleCheckin = this.handleCheckin.bind(this);
        this.handleCheckOut = this.handleCheckOut.bind(this);
        this.handleLogout = this.handleLogout.bind(this)
        this.handleAddActivity = this.handleAddActivity.bind(this)

    }


    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    toggleModalAddActivity() {
        this.setState({
            isModalOpenLocation: false,
            isModalOpenAddActivity: !this.state.isModalOpenAddActivity
        })
    }
    toggleModalLocation() {
        this.setState({
            isModalOpenLocation: !this.state.isModalOpenLocation,
            isModalOpen: false

        })
    }
    toggleModalLocationCheckOut() {
        this.setState({
            isModalCheckout:false,
            isModalOpenLocationCheckOut: !this.state.isModalOpenLocationCheckOut
        })
    }
    toggleModalEditAnRemoveActivity() {
        this.setState({
            isModalOpenLocationCheckOut : false,
            isModalOpenEditAndRemoveActivity: !this.state.isModalOpenEditAndRemoveActivity
        })
    }
    toggleModalCheckOut() {
        this.setState({
            isModalCheckout: !this.state.isModalCheckout
        })
    }

    setCondition(condition){
        this.setState({condition: condition})
        console.log('condition = '+condition)
    }

    setLocation(){
        this.setState({location: location})
        console.log('location = '+location)
    }

    handleAddActivity(event){
        event.preventDefault();

        console.log('adding new activity')
        console.log(this.activityTitle)
        console.log(this.activityDesc)
        const httpHeaders = { 
            'Content-Type' : 'application/json', 
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
          }

          const requestOptions = {
              method: 'POST',
              headers: new Headers(httpHeaders),
              body: JSON.stringify({ title: this.activityTitle, description: this.activityDesc })
      
          };
    
        fetch("api/activities/add",requestOptions)
        .then(res=>res.clone().json())
        .then( json => {
            console.log(json)
          if(json.success==true){
              console.log('success add actiity')
              window. location. reload()
                this.toggleModalAddActivity()
          } else if(json.status) this.setState({isCheckIn: true})
            else
            history.push('/')
          history.push('/')
        })
    }

    handleCheckin(event){
        this.toggleModalLocation();
        const httpHeaders = { 
            'Content-Type' : 'application/json', 
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
          }

          const requestOptions = {
              method: 'POST',
              headers: new Headers(httpHeaders),
              body: JSON.stringify({ check_in: 1, condition: this.state.condition, workplace: this.state.location })
      
          };
    
        fetch("api/activities/checkin",requestOptions)
        .then(res=>res.clone().json())
        .then( json => {
          if(json.status===200){
            console.log(json)
            this.setState({isCheckIn: true})
          }
          if(json.message){
            alert(json.message);
          }
        else if(json)
          return false
        })

        
        event.preventDefault();
    }

    componentDidMount(){
        this.isCheckin()
    }

    isCheckin(){
        const httpHeaders = { 
            'Content-Type' : 'application/json', 
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
          }

          const requestOptions = {
              method: 'POST',
              headers: new Headers(httpHeaders),
              body: JSON.stringify({ check_in: 1, condition: this.state.condition, workplace: this.state.location })
      
          };
    
        fetch("api/activities/checkin/1",requestOptions)
        .then(res=>res.clone().json())
        .then( json => {
          if(json.status===200){
            this.setState({isCheckIn: false})
            console.log('not checked in')
          }
          else if(json){            
            this.setState({isCheckIn: true})
          }
        else
          return false
        }).catch(err => {
            console.error(err)
            console.log(err.message)
        });
    }

    handleCheckOut(event){
        //this.toggleModalEditAnRemoveActivity();
        this.toggleModalLocationCheckOut();
        const httpHeaders = { 
            'Content-Type' : 'application/json', 
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
          }

          const requestOptions = {
              method: 'POST',
              headers: new Headers(httpHeaders),
              body: JSON.stringify({ check_in: 1, condition: this.state.condition, workplace: this.state.location })
      
          };
    
        fetch("api/activities/checkout",requestOptions)
        .then(res=>res.clone().json())
        .then( json => {
          if(json.status===200){
            console.log(json)
            this.setState({isCheckIn: false})
            alert("Anda Sudah Berhasil Check Out");
          }
          if(json.message){
            alert(json.message);
          }
        else if(json)
          return false
        }).catch(err => {
            console.error(err)
            console.log(err.message)
        });

        
        event.preventDefault();
    }

    handleLogout(event){
        history.push('/login')
        localStorage.removeItem('username')
        this.setState({isLoggedIn: 0})
        console.log('state is logged in changed to : ')
        console.log(this.state.isLoggedIn)
        //event.preventDefault();
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        this.isCheckin
        console.log('isLoggedIn = ')
        console.log(isLoggedIn)
        return(
          <div>
              { isLoggedIn ? (
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
                    <NavbarBrand className="mr-auto"  onClick={this.state.isCheckIn ? this.toggleModalCheckOut : this.toggleModal} >
                                <span className="fa-check-square-o "></span>{this.state.isCheckIn ? 'Check Out' : 'Check In' }
                    </NavbarBrand>
                    <NavbarBrand className="mr-auto"  onClick={this.toggleModalAddActivity} >
                                <span className="fa-check-square-o "></span>Add Activity
                    </NavbarBrand>
                    <NavbarToggler/>
                    <NavbarBrand className="mr-auto"  onClick={this.handleLogout}>
                                 <span className="fa fa-sign-out "></span>Log Out
                    </NavbarBrand>                    
                </div>
            </Navbar>
              ) : null }
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader  className="text-center" toggle={this.toggleModal}>Checkin</ModalHeader>
                <ModalBody>
                    <Form >
                        <center>
                            <a onClick={this.toggleModalLocation}>
                                <img  value="sehat" onClick={() => this.setCondition('sehat')} border="0" alt="Sehat" src="public/assets/images/sehat.png" width="100" height="100"/>
                                    <span className="caption">Sehat</span>
                                <img onClick={() => this.setCondition('kurang sehat')} border="0" alt="Kurang Sehat" src="public/assets/images/kurang-sehat.png" width="100" height="100"/>
                                    <span className="caption">Kurang Sehat</span>
                                <img onClick={() => this.setCondition('sakit')} border="0" alt="Sakit" src="public/assets/images/sakit.png" width="100" height="100"/>
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
                            <a onClick={this.handleCheckin}>
                                <img  value="sehat" onClick={() => this.setLocation('wfo')} border="0" alt="Office" src="public/assets/images/office.png" width="100" height="100"/>
                                    <span className="caption">Office</span>                                
                                <img onClick={() => this.setLocation('wfh')} border="0" alt="Home" src="public/assets/images/home.png" width="100" height="100"/>
                                    <span className="caption">Home</span>                                
                                <img onClick={() => this.setLocation('wfs')} border="0" alt="Satelit" src="public/assets/images/satelit.png" width="100" height="100"/>
                                    <span className="caption">Satelit</span>                                
                            </a>
                        </center>
               
                    </Form>
                </ModalBody>
            </Modal>
            <Modal isOpen={this.state.isModalOpenAddActivity} toggle={this.toggleModalAddActivity}>
                <ModalHeader toggle={this.toggleModalAddActivity}>Tambah Aktivitas</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleAddActivity}>
                        <FormGroup>
                            <Label htmlFor="activities">Aktivitas</Label>
                            <Input type="text" id="activities" name="title"
                                onChange={(e) => this.activityTitle= e.target.value }/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="activities">Deskripsi</Label><br />
                            <textarea class="form-control" type="text" id="activityDesc" name="description"
                                onChange={(e) => this.activityDesc= e.target.value }></textarea>
                        </FormGroup>
                        {/* <FormGroup>
                            <Label htmlFor="date">Tanggal</Label>
                            <Input type="date" id="date" name="date"
                            innerRef={(input) => this.date = input}/>
                        </FormGroup> */}
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
                                <img onClick={() => this.setCondition('sehat')} value="sehat"  border="0" alt="Sehat" src="public/assets/images/sehat.png" width="100" height="100"/>
                                    <span className="caption">Sehat</span>                                
                                <img onClick={() => this.setCondition('kurang sehat')} border="0" alt="Kurang Sehat" src="public/assets/images/kurang-sehat.png" width="100" height="100"/>
                                    <span className="caption">Kurang Sehat</span>                                
                                <img onClick={() => this.setCondition('sakit')} border="0" alt="Sakit" src="public/assets/images/sakit.png" width="100" height="100"/>
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
                            <a onClick={this.handleCheckOut}>
                                <img onClick={() => this.setLocation('wfo')} value="sehat" border="0" alt="Office" src="public/assets/images/office.png" width="100" height="100"/>
                                    <span className="caption">Office</span>                                
                                <img onClick={() => this.setLocation('wfh')} border="0" alt="Home" src="public/assets/images/home.png" width="100" height="100"/>
                                    <span className="caption">Home</span>                                
                                <img onClick={() => this.setLocation('wfs')} border="0" alt="Satelit" src="public/assets/images/satelit.png" width="100" height="100"/>
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

export default HeaderHome;