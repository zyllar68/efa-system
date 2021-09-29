import '@styles';
import { Login, Settings, Parcels } from "@pages";
import { Sidenav } from "@components";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div style={{display: 'flex'}}>
        <Sidenav />
        <div style={{padding: '3rem', width: '100%'}}>
          <Switch>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route exact path="/">
              <Parcels />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
