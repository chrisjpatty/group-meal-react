import React, { Component } from 'react';
import logo from './logo.svg';
import './css/bootstrap.min.css';
import './App.css';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'

var App = React.createClass({ 
  render() {
    return (
      <div className="App">
        <Router history={hashHistory}>
          <Route component={MainLayout}>
            <Route component={Body}>
              <Route path="/" component={Home} />
            </Route>
          </Route>
          <Route component={MainLayout}>
            <Route component={Body}>
              <Route path="/create" component={Create} />
            </Route>
          </Route>
          <Route component={MainLayout}>
            <Route component={Body}>
              <Route path="/view" component={View} />
            </Route>
          </Route>
        </Router>
      </div>
    );
  }
})

var MainLayout = React.createClass({
  render(){
    return(
      <div className="app-wrapper">
        <div className="app-sidebar">
          <Link to="/create" className="nav create-nav" activeClassName="nav-active"><div className="new-plus">+</div>New Meal</Link>
          <Link to="/" className="nav" activeClassName="nav-active">Home</Link>
          <Link to="/view" className="nav" activeClassName="nav-active">View</Link>
        </div>
        <div className="app-header">

        </div>
        {this.props.children}
      </div>
    )
  }
})

var Body = React.createClass({
  render(){
    return(
      <div className="app-body">
        {this.props.children}
      </div>
    )
  }
})

var Home = React.createClass({
  render(){
    return(
      <div>
        Home
      </div>
    )
  }
})

var Create = React.createClass({
  render(){
    return(
      <div className="body-wrapper">
        <div className="container-fluid">
          <div className="row info-row">
            <div className="col-sm-3">
              <div className="photo-upload-wrapper">
                <input type="file" id="photo-upload" accept="image/*" />
                <label htmlFor="photo-upload">Upload A File</label>
              </div>
            </div>
            <div className="col-sm-5">
              <label htmlFor="meal-name" className="create-label" >Name Your Meal:</label>
              <input type="text" id="meal-name" className="create-input" />
            </div>
            <div className="col-sm-4">
              <div className="row">
                <label className="date-wrapper-label">When is your event?</label>
                <div className="col-xs-6">
                  <label htmlFor="meal-date" className="create-label create-date-label" >Date:</label>
                  <input type="text" id="meal-date" className="create-input create-date" />
                </div>
                <div className="col-xs-6">
                  <label htmlFor="meal-time" className="create-label create-date-label" >Time:</label>
                  <input type="text" id="meal-time" className="create-input create-date" />
                </div>
              </div>
            </div>
          </div>
          <div className="row description-row">
            <div className="col-xs-12">
              <label className="create-label desc-label">Describe Your Event:</label>
              <textarea id="create-desc" className="create-desc" placeholder="Come for food and friends..."></textarea>
            </div>
          </div>
          <div className="row recipe-row">
            <div className="col-sm-6 create-recipe">
              <label className="create-label recipe-label">What items do you want your guests to bring?</label>
              <div className="ingredient-list">
                <div className="ingredient"><div className="ingredient-num">1</div>Side Dish</div>
              </div>
            </div>
            <div className="col-sm-6 create-invites">
              <label className="create-label recipe-label">Who should be invited?</label>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

var View = React.createClass({
  render(){
    return(
      <div>
      View
      </div>
    )
  }
})

export default App;
