import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import Repositories from './components/Repositories';

function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    let url = 'https://api.github.com/users/noncenze';
    axios.get(url).then(response => {
      setData(response.data);
    }).catch(error => {
      console.log('---------------- ERROR ----------------');
      console.log(error);
    });
  }, []);

  useEffect(() => {
    console.log('---------------- USER ----------------');
    console.log(data);
  }, [data]);

  return (
    <Router>
      <nav className="nav-bar">
        <img width="30px" height="30px" className="git-avatar" src="/github.png" alt="Github Logo"/>
        <img width="30px" height="30px" className="avatar" src={data.avatar_url} alt={data.login} /> 
      </nav>
      <div className="App">
        <Route exact path='/' render={(props) => <Dashboard {...props} data={data}/>} />
        <Route path='/repositories' render={(props) => <Repositories {...props} data={data}/>} />
      </div>
    </Router>
  );
}


export default App;