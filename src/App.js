import './App.scss';
import { Navbar } from "./components/navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; 
import React from 'react';
import { Spin, Result, Button } from "antd";
import routes from './routes';



function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar Link={Link}/>
          <React.Suspense fallback={
              <div className="loading"><Spin size="large"/></div>
            }>
            <Switch>
              {routes.map((route, idx) => {
                return (
                  route.component && (
                    <Route 
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                    >
                      <route.component />
                    </Route>
                  )
                )
              })}
              <Route 
                name="404 Page"
                >
                  <Result 
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Link to="/"><Button type="primary" size="large">Back to Home</Button></Link>}
                  />
                </Route>
            </Switch>
          </React.Suspense>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
