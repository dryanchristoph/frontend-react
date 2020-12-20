import React from 'react';
/* import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap'; */
import HeaderHome from '../Header-home';
import HomePageController from './HomePage';


function HomePage() {
    console.log('localstorage =')
    console.log(localStorage.getItem('username'))
    return(
        <div>
            <HeaderHome>
            </HeaderHome>
            <HomePageController />
        </div>
    );
}

//export default Home;
export { HomePage }