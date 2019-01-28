import React from 'react';
import { Col, Row } from 'antd';
import { Route } from 'react-router-dom';
import Header from './../../components/Header';
import NavLeft from './../../components/Navleft';
import Welcome from './../welcome'
import Category from './../category';
import Article from './../article';
import './index.less';

export default class Admin extends React.Component {
    render() {
        return(
            <div className='amdin-page'>
                <Row>
                    <Col span={24}>
                        <Header />
                        <Row>
                            <Col span={3}>
                                <NavLeft />
                            </Col>
                            <Col span={21}>
                                <Route path='/admin/welcome' component={Welcome} />
                                <Route path='/admin/category' component={ Category } />
                                <Route path='/admin/article' component={ Article } />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}