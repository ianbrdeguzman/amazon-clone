import React from 'react';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path='/login' component={LoginPage} />
                    <Route path='/register' component={RegisterPage} />
                    <Layout>
                        <Route exact path='/' component={HomePage} />
                        <Route path='/product/:id' component={ProductPage} />
                        <Route
                            path='/cart/:id?/:quantity?'
                            component={CartPage}
                        />
                    </Layout>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
