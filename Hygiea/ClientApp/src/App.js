import React from 'react';
import { Route, Redirect } from 'react-router';
import Layout from './components/Layout';
import Registration from "./components/Registration";

export default () => (
  <Layout>
    {/* This is just temporary */}
    <Redirect path='/' to='/register'/>
    <Route path='/register' component={Registration} />
  </Layout>
);
