import React, { Component } from "react";
import "./App.css";
import NavBar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default class App extends Component {
pageSize=12;
apiKey=process.env.REACT_APP_NEWS_API;
  render() {
    return (
      <div>
        <Router>
  <NavBar />
  <Routes>  
    <Route exact path="/business" element={<News pageSize={this.pageSize} apiKey={this.apiKey} country="in" key="business" category="business" />} />
    <Route exact path="/" element={<News pageSize={this.pageSize} apiKey={this.apiKey} country="in" key="general" category="general" />} />
    <Route exact path="/entertainment" element={<News pageSize={this.pageSize} apiKey={this.apiKey} country="in" key="entertainment" category="entertainment" />} />
    <Route exact path="/general" element={<News pageSize={this.pageSize} apiKey={this.apiKey} country="in" key="general" category="general" />} />
    <Route exact path="/health" element={<News pageSize={this.pageSize} apiKey={this.apiKey} country="in" key="health" category="health" />} />
    <Route exact path="/science" element={<News pageSize={this.pageSize} apiKey={this.apiKey} country="in" key="sports" category="science" />} />
    <Route exact path="/sports"  element={<News pageSize={this.pageSize} apiKey={this.apiKey} country="in" key="sports" category="sports" />} />
    <Route exact path="/technology" element={<News pageSize={this.pageSize} apiKey={this.apiKey} country="in" key="technology" category="technology" />} />
  </Routes>
</Router>

      </div>
    );
  }
}
