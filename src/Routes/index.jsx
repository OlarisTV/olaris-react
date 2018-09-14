import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Auth
import Login from 'Containers/User/Login';
import ForgotPassword from 'Containers/User/ForgotPassword';
import Register from 'Containers/User/Register';

// App
import Dashboard from 'Containers/Dashboard';

// Admin
import Users from 'Containers/Admin/Users';

// Movie
import MovieList from 'Containers/Media/MovieList';
import Movie from 'Containers/Media/Movie';

// Series
import SeriesList from 'Containers/Media/SeriesList';
import Series from 'Containers/Media/Series';
import Season from 'Containers/Media/Season';
import Episode from 'Containers/Media/Episode';

// Search Results
import Search from 'Containers/Media/Search';

// Auth
import { Auth, checkAuth } from 'Client/Auth';
import { isInitialSetup } from 'Helpers';
import AdminRoute from './Helper/AdminRoute';
import PrivateRoute from './Helper/PrivateRoute';

export default class Routes extends Component {
  componentWillMount() {
    checkAuth();
  }

  initialRender = () => {
    if (Auth.isAuthenticated) {
      return <Redirect to="/dashboard" />
    } else {
      if (isInitialSetup()) {
        return <Redirect to="/register" />
      } else {
        return <Redirect to="/login" />
      }
    }
  };

  render() {
    return (
      <Switch>
        <Route exact path="/" render={this.initialRender} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot" component={ForgotPassword} />
        <Route exact path="/register" component={Register} />

        <AdminRoute exact path="/users" component={Users} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />

        <PrivateRoute exact path="/movies" component={MovieList} />
        <PrivateRoute exact path="/movie/:uuid/:name" component={Movie} />

        <PrivateRoute exact path="/series" component={SeriesList} />
        <PrivateRoute exact path="/series/:uuid/:name" component={Series} />
        <PrivateRoute exact path="/season/:uuid/:name" component={Season} />
        <PrivateRoute exact path="/episode/:uuid/:name" component={Episode} />

        <PrivateRoute exact path="/search/:value" component={Search} />
      </Switch>
    );
  }
}