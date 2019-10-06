import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

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
            <Route exact path="/register">
                <Register />
            </Route>

            <AdminRoute exact path="/users">
                <Users />
            </AdminRoute>

            <PrivateRoute exact path="/dashboard">
                <Dashboard />
            </PrivateRoute>
            <PrivateRoute exact path="/movies">
                <MovieList />
            </PrivateRoute>
            <PrivateRoute exact path="/movie/:uuid">
                <Movie />
            </PrivateRoute>
            <PrivateRoute exact path="/series">
                <SeriesList />
            </PrivateRoute>
            <PrivateRoute exact path="/series/:uuid">
                <Series />
            </PrivateRoute>
            <PrivateRoute exact path="/season/:uuid">
                <Season />
            </PrivateRoute>
            <PrivateRoute exact path="/episode/:uuid">
                <Episode />
            </PrivateRoute>
            <PrivateRoute exact path="/search/:value">
                <Search />
            </PrivateRoute>
        </Switch>
    );
};

export default Routes;
