import React, { Component } from "react";
 
 
class HomePage extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
 
  componentDidMount() {
    const httpHeaders = { 
        'Content-Type' : 'application/x-www-form-urlencoded', 
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      }
     /*  console.log('httpHeaders')
      console.log(httpHeaders) */

      fetch("api/activities/",{method: 'get', headers: new Headers(httpHeaders)})
        .then(res => res.json())
        .then(items => {
            console.log('activities = ')
            console.log(items.activities)
            this.setState({
                items: items.activities,
                isLoaded: false
            })
    
        }
        )
        .catch(error => console.log('parsing failed', error))
    }
 
    render() {
      const {items } = this.state;
        return (
          <div className="container">
            <h1>Employee Activities</h1>
            {
              items ? items.map(item => {
              //const {_id, title, description, createdAt, status, username, firstname, lastname} = item;
               return (
 
               <div key={item._id} className="bgCircle">
                <center><img /* src={thumbnail} */ alt={item.user.firstName} className="circle"/> </center><br />
                <div className="ctr">
                    <b>{item.title}</b><br />
                    {item.description}<br />
                    by {item.user.firstname} {item.user.lastname}
                    </div>
    
                </div>
              );
            }) : null
          }
          </div>
        );
 
    }
  }
 
export default HomePage;