import "./App.css";
import Login from "./components/Login";
import {BrowserRouter, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Route exact path="/" component={Login}/>
    <Route path="/dashboard" component={Dashboard}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
