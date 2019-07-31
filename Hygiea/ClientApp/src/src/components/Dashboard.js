import React from "react";
import { Link } from 'react-router-dom';
import "../styles/Sidebar.css";
import { Col, Grid, Row,Navbar } from 'react-bootstrap';
import NavMenu from './NavMenu';

class Dashboard extends React.Component{


      render(){
          return(
            <Grid fluid>
            
            <Row>
              <Col sm={3}>
                <NavMenu />
              </Col>
              <Col sm={9}>
                content
              </Col>
            </Row>
          </Grid>
          )
      }
       // <div className="dash-container">
            //   <div className="dash-sidebar">
            //   <div className="sideBar">
            //   <div>
            //     <p>Dashboard</p>
            //     </div>
            //   <hr></hr>
            //     <div>
            //       <p>Drug</p>
                
            //       <ul>
            //       <li><Link to ="">All Drugs</Link></li>
            //       <li><Link to ="">Finished Drugs</Link></li>
            //       <li><Link to ="">Warning Drugs</Link></li>
            //       </ul>
                  
            //     </div>
            //     <hr></hr>
            //     <div>
            //       <p>Appointment</p>
                  
            //       <ul>
            //       <li><Link to ="">All Appointment</Link></li>
            //       <li><Link to ="">Pending Appointment</Link></li>
            //       <li><Link to ="">Approved Appointment</Link></li>
            //       </ul>
                  
            //     </div>
            // </div>
            //   </div>
            //   <div className="dash-content">
            //     rtyuiopflkjhgfsyuicolf,mnsfcyuiofp;lksjhgfxyu
            //   </div>
            // </div>
         
}

export default Dashboard