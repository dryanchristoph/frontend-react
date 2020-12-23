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
            <div class="pull-left">
            <h1>Employee Activities</h1>
            <hr />
            {
              items ? items.map(item => {
              //const {_id, title, description, createdAt, status, username, firstname, lastname} = item;
               return (
                <div class="panel panel-default row">
                  <div class="panel-body">
                  <section class="post-heading">
                    <div class="row">
                        <div class="col-md-11">
                            <div class="media">
                            <div class="media-left">
                              <a href="#">
                                  <img class="media-object photo-profile" src="http://0.gravatar.com/avatar/38d618563e55e6082adf4c8f8c13f3e4?s=40&d=mm&r=g" width="40" height="40" alt="..." />
                                </a>
                              </div>
                              <div class="media-body">
                                <a href="#" class="anchor-username"><h4 class="media-heading">{item.user.firstname} {item.user.lastname}</h4></a> 
                                <a href="#" class="anchor-time">51 mins</a>
                              </div>
                            </div>
                        </div>
                         <div class="col-md-1">
                             <a href="#"><i class="glyphicon glyphicon-chevron-down"></i></a>
                         </div>
                    </div>             
               </section>
               <section class="post-body">
                 <p><b>{item.title}</b></p>
                   <p>{item.description}.</p>
               </section>
               <section class="post-footer">
                   <hr />
                   <div class="post-footer-option container">
                        <ul class="list-unstyled">
                            <li><a href="#"><i class="glyphicon glyphicon-thumbs-up"></i> Like</a></li>
                            <li><a href="#"><i class="glyphicon glyphicon-comment"></i> Comment</a></li>
                            <li><a href="#"><i class="glyphicon glyphicon-share-alt"></i> Share</a></li>
                        </ul>
                   </div>
                   <div class="post-footer-comment-wrapper">
                       <div class="comment-form">
                           
                       </div>
                       <div class="comment">
                            <div class="media">
                              {/* <div class="media-left">
                                <a href="#">
                                  <img class="media-object photo-profile" src="http://0.gravatar.com/avatar/38d618563e55e6082adf4c8f8c13f3e4?s=40&d=mm&r=g" width="32" height="32" alt="..." />
                                </a>
                              </div>
                              <div class="media-body">
                                <a href="#" class="anchor-username"><h4 class="media-heading">Media heading</h4></a> 
                                <a href="#" class="anchor-time">51 mins</a>
                              </div> */}
                            </div>
                       </div>
                   </div>
               </section>
                  
  
                  {/* <div key={item._id} className="bgCircle">
                    <center><img src={thumbnail} alt={item.user.firstName} className="circle"/> </center><br />
                    <div className="ctr">
                        <b>{item.title}</b><br />
                        {item.description}<br />
                        by {item.user.firstname} {item.user.lastname}
                        </div>
        
                    </div> */}
                  </div>
                </div>
              );
            }) : null
          }
          </div>
          </div>
        );
 
    }
  }
 
export default HomePage;