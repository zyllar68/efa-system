import '@styles';
import { Login } from "@pages";
import { Sidenav } from "@components";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div style={{display: 'flex'}}>
        <Sidenav />
        <Switch>
          <Route exact path="/">
            
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
