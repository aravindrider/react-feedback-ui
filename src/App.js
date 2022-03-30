import React, { useState, useEffect } from 'react';
import './App.css';
import FeedbackEdit from '../src/components/FeedbackEdit';

import Welcome from './components/Welcome';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import { Container, Row, Col } from 'react-bootstrap';
import FeedbackList from './components/FeedbackList';
import FeedbackGather from './components/FeedbackGather';
import FeedbackInfo from './components/FeedbackInfo';
import Login from './components/Login';
import Register from './components/Register';
import { LoginContext } from './components/LoginContext';
import FeedbackSuccess from './components/FeedbackSuccess';

function App() {
  const heading = 'Welcome to Feedback Guru';
  const quote = 'Feedback is the breakfast of Champions';
  const footer = 'Mark Twain';

  const [isLogin, setIsLogin] = useState(false);
  const [publicVal, setIsPublicVal] = useState(true);

  return (
    <Router>
      <LoginContext.Provider
        value={{ isLogin, setIsLogin, publicVal, setIsPublicVal }}
      >
        {console.log()}
        <NavigationBar />

        <Container>
          <Row>
            <Col lg={12} className={'margin-top'}>
              <Switch>
                <Route
                  path='/'
                  exact
                  component={() => (
                    <Welcome heading={heading} quote={quote} footer={footer} />
                  )}
                ></Route>
                <Route path='/list' exact component={FeedbackList}></Route>
                <Route path='/add' exact component={FeedbackEdit}></Route>
                <Route path='/edit/:id' exact component={FeedbackEdit}></Route>
                <Route
                  path='/view/feedback/:id'
                  exact
                  component={FeedbackInfo}
                ></Route>
                <Route
                  path='/public/:id'
                  exact
                  component={FeedbackGather}
                ></Route>
                <Route path='/login' exact component={Login}></Route>
                <Route path='/Register' exact component={Register}></Route>
                <Route
                  path='/success'
                  exact
                  component={FeedbackSuccess}
                ></Route>
                <Route
                  path='/success'
                  exact
                  component={FeedbackSuccess}
                ></Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </LoginContext.Provider>

      <Footer />
    </Router>
  );
}

export default App;
