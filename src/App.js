import '@styles';
import { useState, useEffect } from "react";
import { Login, Settings, Parcels, EditParcel, Print } from "@pages";
import { Sidenav } from "@components";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {

  const [auth, setAuth] = useState(false);
  const [accountType, setAccountType] = useState();
  useEffect(() => {
    const token = localStorage.getItem("efa_token");
    setAccountType(localStorage.getItem("account_type"));

    if(token !== null){
      setAuth(true);
    }else{
      setAuth(false);
    }
  }, [auth]);

  const logOut = () => {
    window.localStorage.removeItem('efa_token');
    window.localStorage.removeItem('account_type');
    window.localStorage.removeItem('account_name');
    setAuth(false);
  }

  return (
    <Router>
      {
        !auth ?  
          <Route>
            <Login setAuth={setAuth} />
          </Route>
        : <div style={{display: 'flex'}}>
            <Sidenav 
              accountType={accountType}
              logOut={logOut}
            />
            <div style={{padding: '3rem', width: '100%', maxHeight: '100vh', overflow: 'auto'}}>
              {
                accountType === 2 ?
                ( <Switch>
                    <Route exact path="/" component={Parcels} />
                    <Route path="/print/:id" component={Print} />
                    <Route path="/:id" component={EditParcel} />
                  </Switch> )
                :( <Switch>
                    <Route path="/settings" component={Settings} />
                    <Route exact path="/" component={Parcels} />
                    <Route path="/print/:id" component={Print} />
                    <Route path="/:id" component={EditParcel} />
                  </Switch> )
              }
            </div>
          </div>
      }
    </Router> 
  );
}

export default App;
