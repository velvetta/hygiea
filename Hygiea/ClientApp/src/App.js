import React from 'react';
import { Route, Redirect } from 'react-router';
import Layout from './components/Layout';
import Registration from "./components/Registration";
import Login from "./components/Login";
import AddDrugs from './components/AddDrugs';
import Dashboard from './components/Dashboard';
import GetDrugs from './components/GetDrugs';
import GetAppointments from './components/GetAppointments';


export default () => (
  <Layout>
    {/* This is just temporary */}
    {/* <Redirect path='/' to='/register'/> */}
    <Route path='/register' component={Registration} />
    <Route path='/login' component={Login} />
    <Route path='/adddrugs' component={AddDrugs}/>
    <Route path='/dashboard' component = {Dashboard}/>
    <Route path='/getdrugs' component = {GetDrugs}/>
    <Route path='/getappointments' component= {GetAppointments}/>
  </Layout>
);
