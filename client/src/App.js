import './App.css';
import Home from './components/home.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/landingPage';
import AddRecipe from './components/addRecipe';
import Detail from './components/details';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/home/recipe/:id' component={Detail}/>
          <Route exact path='/addRecipe' component={AddRecipe}/>
      </Switch>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
