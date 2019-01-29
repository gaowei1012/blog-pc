import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import Login from './pages/login';
import Admin from './pages/admin';
import Register from './pages/register';
// import Category from './pages/category';
// import Article from './pages/article';

// 登录权限
/**
 * 此项目先使用session维护， 后期会改成token 使用 jwt 改
 */
history.listen(location => {
    if (location.pathname === '/admin' & !sessionStorage.getItem('username')) {
        history.push('/')
    }
})

export default class ERoute extends React.Component {
    render() {
        return(
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Register} />
                    {/* 这块稍后会进行改造 */}
                    <Route path="/admin" component={Admin} />
                    {/* <Route path="/admin/category" component={ Category } />
                    <Route path="admin/article" component={ Article } /> */}
                </Switch>
            </Router>
        )
    } 
}