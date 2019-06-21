import React from 'react';
import { Route, Redirect } from 'react-router';
import Layout from './components/Layout';
import Registration from "./components/Registration";
import Login from "./components/Login";

export default () => (
  <Layout>
    {/* This is just temporary */}
    <Redirect path='/' to='/register'/>
    <Route path='/register' component={Registration} />
    <Route path='/login' component={Login} />
  </Layout>
);
