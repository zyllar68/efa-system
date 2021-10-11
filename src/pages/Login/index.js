import "./style.scss";
import { useState } from "react";
import logo from "@images/logo.jpg";
import { Input, Button } from "@components";
import { authUser } from "@api/user_account";
import { useHistory } from 'react-router-dom';

const Login = ({
  setAuth
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const onSubmit = async () => {
    if(username === '' || password === ''){
      setErrorMessage('Please input your username/password!');
    }else{
      try {

        const payload = {username, password};
        const res = await authUser(payload);

        window.localStorage.setItem('efa_token', res.data.user_info.token);
        window.localStorage.setItem('account_type', res.data.user_info.account_type);
        setAuth(true);
      } catch (error) {
        console.log(`message: ${error}`);
        setErrorMessage(`${error}`);
      }
    }
  }

  return (
    <div className="Login">
      <div className="Login__card">
        <div className="row">
          <div className="col col-span-6">
            <div className="Login__card-logo">
              <img src={logo} alt="logo"/>
            </div>
          </div>
          <div className="col col-span-6">
            <div className="Login__card-title">
              <h2>Login</h2>
              <form>
                <Input 
                  label="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <Input 
                  type="password"
                  label="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="Login__card-button">
                  <Button 
                    primary
                    title="Login"
                    onClick={onSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
