/* eslint-disable */
import React, { Component } from 'react';
import logo from './logo.svg';
import './css/bootstrap.min.css';
import './App.css';
import { Router, Route, Link, IndexLink, hashHistory, IndexRoute } from 'react-router';
var moment = require('moment');
import * as firebase from "firebase";

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyBAgDvbxlXXnxwgbs8vnvQOck2wMoEElxs",
  authDomain: "group-meal-6166f.firebaseapp.com",
  databaseURL: "https://group-meal-6166f.firebaseio.com",
  storageBucket: "group-meal-6166f.appspot.com",
  messagingSenderId: "274117236432"
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("You're logged in");
    if(capture.props.location.pathname == "/login" || capture.props.location.pathname == "/signup"){
      hashHistory.push('/create');
    }
  } else {
    console.log("You're not logged in");
    hashHistory.push('/login');
  }
});

var App = React.createClass({ 
  render() {
    return (
      <div className="App">
        <Router history={hashHistory}>
          <Route component={AuthLayer}>
            <Route path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route component={MainLayout}>
              <Route component={Body}>
                <Route path="/home" component={Home} />
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
          </Route>
        </Router>
      </div>
    );
  }
})

var AuthLayer = React.createClass({
  render(){
    //console.log(this.props.location.pathname);
    return(
      <div>
      {this.props.children}
      </div>
    )
  }
})

var MainLayout = React.createClass({
  logout: function(){
    firebase.auth().signOut().then(function() {
      console.log("Signed Out");
      hashHistory.push("/login");
    }, function(error) {
      console.log(error);
    });
  },
  render(){
    return(
      <div className="app-wrapper">
        <div className="app-sidebar">
          <Link to="/create" className="nav create-nav" activeClassName="nav-active"><div className="new-plus">+</div>New Meal</Link>
          <Link to="/home" className="nav" activeClassName="nav-active">Home</Link>
          <Link to="/view" className="nav" activeClassName="nav-active">View</Link>
        </div>
        <div className="app-header">
          <a className="logout" onClick={this.logout}>Logout</a>
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
  getInitialState: function(){
    return{
      ingredients: [
        {
          id: 1,
          name: "Side Dish",
          num: 2
        },
        {
          id: 2,
          name: "Jello Salad",
          num: 1
        },
        {
          id: 3,
          name: "Stack O' Balogna",
          num: 4
        }
      ]
    }
  },
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
                {
                  this.state.ingredients.map(function(ingredient, i){
                    return <Ingredient ingredient={ingredient} key={i} />
                  })
                }
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

var Ingredient = React.createClass({
  render: function(){
    return(
      <div className="ingredient">
        <div className="ingredient-num">{this.props.ingredient.num}</div>
        {this.props.ingredient.name}
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

var Login = React.createClass({
  getInitialState: function(){
    return {
      email: "",
      password: ""
    }
  },
  handleChange: function(e){
    var id = e.target.id;
    this.setState({
      [id]: e.target.value
    })
  },
  auth: function(){
    hashHistory.push("/");
  },
  render: function(){
    return(
      <div className="login-wrapper">
        <div className="login-box">
          <form onSubmit={this.auth}>
            <label>email</label>
            <input type="text" className="email" id="email" onChange={this.handleChange} value={this.state.email}/>
            <label>Password</label>
            <input type="password" className="password" id="password" onChange={this.handleChange} value={this.state.password}/>
            <input type="submit" value="Login" />
            <Link className="signup" to="/signup">Signup</Link>
          </form>
        </div>
      </div>
    )
  }
})

var Signup = React.createClass({
  getInitialState: function(){
    return {
      email: "",
      password: "",
      confirm: "",
      matches: false,
      validEmail: false
    }
  },
  handleChange: function(e){
    var id = e.target.id;
    this.setState({
      [id]: e.target.value
    }, function(){
      if(id == "confirm"){
        this.confirmPassword();
      }
      if(id == "email"){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isEmail = re.test(this.state.email);
        if(isEmail){
          this.setState({
            validEmail: true
          })
        }else{
          this.setState({
            validEmail: false
          })
        }
      }
    })
  },
  confirmPassword: function(){
    if(this.state.password == this.state.confirm){
      this.setState({
        matches: true
      })
    }else{
      this.setState({
        matches: false
      })
    }
  },
  auth: function(){
    if(this.state.matches && this.state.validEmail){
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    }
    //hashHistory.push("/");
  },
  render: function(){
    return(
      <div className="login-wrapper">
        <div className="login-box signup-box">
          <form onSubmit={this.auth}>
            <label>email</label>
            <input type="text" className="email" id="email" onChange={this.handleChange} value={this.state.email}/>
            <label>Password</label>
            <input type="password" className="password" id="password" onChange={this.handleChange} value={this.state.password}/>
            <label>Confirm Password</label>
            <input type="password" className={"confirm " + (this.state.matches ? "valid " : "")} id="confirm" onChange={this.handleChange} value={this.state.confirm}/>
            <input type="submit" value="Signup with Email" />
            <button>Signup with Facebook</button>
            <button>Signup with Google</button>
          </form>
        </div>
      </div>
    )
  }
})

export default App;
