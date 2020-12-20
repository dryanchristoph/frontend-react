import React from 'react';
/* import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap'; */
import HeaderHome from '../Header-home';
import LoginOnly from './LoginOnly';


function LoginPage(props) {
    return(
        <div>
        <HeaderHome />
        <LoginOnly />
        </div>
    );
}

//export default Home;
export { LoginPage }