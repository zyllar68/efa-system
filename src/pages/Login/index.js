import "./style.scss";
import logo from "@images/logo.jpg";
import { Input, Button } from "@components";

const Login = () => {
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
                />
                <Input 
                  type="password"
                  label="Password"
                />
                <p className="error-message">error message</p>
                <div className="Login__card-button">
                  <Button 
                    primary
                    title="Login"
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
