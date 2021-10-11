import '@styles';
import { useState, useEffect } from "react";
import { Login, Settings, Parcels, EditParcel } from "@pages";
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
  }, [auth])

  return (
    <>
      {
        !auth ?  
        <Login setAuth={setAuth} />
        : <Router>
            <div style={{display: 'flex'}}>
              <Sidenav 
                accountType={accountType}
              />
              <div style={{padding: '3rem', width: '100%'}}>
                {
                  accountType === 2 ?
                  ( <Switch>
                      <Route exact path="/parcels">
                        <Parcels />
                      </Route>
                      <Route path="/parcels/:id">
                        <EditParcel />
                      </Route>
                    </Switch> )
                  :( <Switch>
                      <Route path="/settings">
                        <Settings />
                      </Route>
                      <Route exact path="/parcels">
                        <Parcels />
                      </Route>
                      <Route path="/parcels/:id">
                        <EditParcel />
                      </Route>
                    </Switch> )
                }

              </div>
            </div>
          </Router> 
      }
    </>
  );
}

export default App;
