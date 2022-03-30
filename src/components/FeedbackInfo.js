import React, { Component } from 'react';
import axios from 'axios';
import { faEye, faUser } from '@fortawesome/free-solid-svg-icons';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faEdit,
  faList,
  faPlusSquare,
  faSave,
  faUndo,
  faMinusCircle,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    id: '',
    answers: [],
    values: '',
    questions: [
      {
        type: 'text',
        data: {},
      },
    ],
    response: [],
  };

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('token');
    const feedbackId = +this.props.match.params.id;
    if (feedbackId) {
      this.findFeedbackById(feedbackId);
      this.findAnswersById(feedbackId);
    }
  }

  findAnswersById = (feedbackId) => {
    axios
      .get(
        'http://laravelapi-env.eba-buc2trym.us-east-1.elasticbeanstalk.com/api/feedback/' +
          feedbackId +
          '/answer'
      )
      .then((response) => {
        if (response.data != null) {
          this.setState({
            response: response.data.response,
          });
          console.log(this.state.response);
        }
      })
      .catch((error) => console.log('Error:' + error));
  };

  findFeedbackById = (feedbackId) => {
    axios
      .get(
        'http://laravelapi-env.eba-buc2trym.us-east-1.elasticbeanstalk.com/api/feedback/' +
          feedbackId
      )
      .then((response) => {
        if (response.data != null) {
          this.setState({
            id: response.data.data.id,
            questions: response.data.data.questions,
          });
        }
      })
      .catch((error) => console.log('Error:' + error));
  };

  feedbackList = () => {
    return this.props.history.push('/list');
  };

  render() {
    const { questions, response } = this.state;

    return (
      <div style={{ marginTop: '20px' }}>
        <div style={{ display: this.state.show ? 'block' : 'none' }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === 'put'
                ? 'Feedback Updated Successfully'
                : 'Feedback Saved Successfully'
            }
            type={'success'}
          />
        </div>
        <Card className='border border-dark bg-dark text-white'>
          <Card.Header>
            <FontAwesomeIcon icon={faEye} /> <strong>View Feedback</strong>
          </Card.Header>

          <Card.Body style={{ marginBottom: '25px' }}>
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <div key={index}>
                  <Row style={{ marginTop: '10px' }}>
                    <strong>
                      <h3>{index + 1 + '. ' + question.question}</h3>
                    </strong>
                    {response.map((res, ind) => {
                      if (res.feedback_question_id === question.id) {
                        return (
                          <div>
                            <strong>
                              <p style={{ marginTop: '10px', color: 'red' }}>
                                {res.answer}
                              </p>

                              <p
                                style={{
                                  marginTop: '10px',
                                }}
                              >
                                <FontAwesomeIcon icon={faClock} />{' '}
                                {res.created_at}
                              </p>
                            </strong>
                          </div>
                        );
                      }
                    })}
                  </Row>
                </div>
              ))
            ) : (
              <div style={{ marginTop: '5px' }}>
                <strong style={{ fontSize: '22px', color: 'red' }}>
                  No Questions Added
                </strong>
              </div>
            )}
            <div
              style={{
                textAlign: 'right',
                marginBottom: '13px',
                marginRight: '20px',
              }}
            >
              {' '}
              <Button
                size='sm'
                variant='info'
                type='button'
                onClick={this.feedbackList.bind()}
              >
                <FontAwesomeIcon icon={faList} /> {''}
                Feedback List
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
