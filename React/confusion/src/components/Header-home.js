import React, {Component} from 'react';
import { Navbar, NavbarBrand,  NavbarToggler,  Jumbotron, 
        Button, Modal, ModalHeader, ModalBody, FormGroup,
        Form, Label, Input} from 'reactstrap';


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
            isModalOpenEditAndRemoveActivity: false
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


    handleCheckin(event){
        this.toggleModalLocation();
        console.log(this.condition)
        console.log(this.location)
        alert("Anda Sudah Berhasil Checkin");
        event.preventDefault();
    }

    handleCheckOut(event){
        this.toggleModalLocation();
        alert("Anda Sudah Berhasil Check Out");
        event.preventDefault();
    }

    render() {
        return(
          <div>
              <Navbar dark expand="md">
                <div className="container">
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand className="mr-auto" href="/">
                    <img src="assets/images/logo.png" height="30"
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
                    <NavbarToggler onClick={this.toggleModalCheckOut} />
                    <NavbarBrand className="mr-auto"  onClick={this.toggleModalCheckOut}>
                                 <span className="fa fa-sign-out "></span>Check Out
                    </NavbarBrand>
                    
                </div>
            </Navbar>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader  className="text-center" toggle={this.toggleModal}>Checkin</ModalHeader>
                <ModalBody>
                    <Form >
                        <center>
                            <a onClick={this.toggleModalLocation}>
                                <img onClick={this.condition='sehat' } value="sehat" border="0" alt="Sehat" src="assets/images/sehat.png" width="100" height="100"/>
                                    <span className="caption">Sehat</span>                                
                                <img onClick={this.condition='kurang sehat'} border="0" alt="Kurang Sehat" src="assets/images/kurang-sehat.png" width="100" height="100"/>
                                    <span className="caption">Kurang Sehat</span>                                
                                <img onClick={this.condition='sakit'} border="0" alt="Sakit" src="assets/images/sakit.png" width="100" height="100"/>
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
                                <img onClick={this.location='wfo'} value="sehat" border="0" alt="Office" src="assets/images/office.png" width="100" height="100"/>
                                    <span className="caption">Office</span>                                
                                <img onClick={this.location='wfh'} border="0" alt="Home" src="assets/images/home.png" width="100" height="100"/>
                                    <span className="caption">Home</span>                                
                                <img onClick={this.location='wfs'} border="0" alt="Satelit" src="assets/images/satelit.png" width="100" height="100"/>
                                    <span className="caption">Satelit</span>                                
                            </a>
                        </center>
               
                    </Form>
                </ModalBody>
            </Modal>
            {/* <Modal isOpen={this.state.isModalOpenAddActivity} toggle={this.toggleModalAddActivity}>
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
            </Modal> */}
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

export default HeaderHome;