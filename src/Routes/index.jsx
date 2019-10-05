import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Loading from 'Components/Loading';

// Auth
import Login from 'Containers/User/Login';
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
import { Auth } from 'Client/Auth';
import AdminRoute from './Helper/AdminRoute';
import PrivateRoute from './Helper/PrivateRoute';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                {Auth.isAuthenticated ? <Dashboard /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/register" render={(routeProps) => <Register {...routeProps} />} />

            <AdminRoute exact path="/users" component={Users} />

            <PrivateRoute exact path="/dashboard" component={Dashboard} />

            <PrivateRoute exact path="/movies" component={MovieList} />
            <PrivateRoute exact path="/movie/:uuid" component={Movie} />

            <PrivateRoute exact path="/series" component={SeriesList} />
            <PrivateRoute exact path="/series/:uuid" component={Series} />
            <PrivateRoute exact path="/season/:uuid" component={Season} />
            <PrivateRoute exact path="/episode/:uuid" component={Episode} />

            <PrivateRoute exact path="/search/:value" component={Search} />
        </Switch>
    );
};

export default Routes;
