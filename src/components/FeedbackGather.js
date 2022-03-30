import React, { Component } from 'react';
import axios from 'axios';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faEdit,
  faList,
  faPlusSquare,
  faSave,
  faUndo,
  faExclamationCircle,
  faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import { LoginContext } from './LoginContext';
import answerValidation from '../validations/answerValidation';

export default class extends Component {
  static contextType = LoginContext;

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
  };

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('token');
    const feedbackId = +this.props.match.params.id;
    if (feedbackId) {
      this.findFeedbackById(feedbackId);
    }
  }

  feedbackList = () => {
    return this.props.history.push('/list');
  };

  handleAnswer = (questionCount) => {
    for (let i = 0; i < questionCount; i++) {
      const values = [...this.state.answers, {}];
      this.setState({ answers: values });
    }
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

          this.handleAnswer(this.state.questions.length);
        }
      })
      .catch((error) => console.log('Error:' + error));
  };

  submitFeedback = (event) => {
    event.preventDefault();

    let sum = {};
    for (let i = 0; i < this.state.answers.length; i++) {
      sum = { ...this.state.answers[i], ...sum };
    }

    this.setState({
      values: sum,
    });

    setTimeout(() => {
      const answers = {
        answers: this.state.values,
      };

      axios
        .post(
          'http://laravelapi-env.eba-buc2trym.us-east-1.elasticbeanstalk.com/api/feedback/' +
            this.state.id +
            '/answer',
          answers
        )
        .then((response) => {
          if (response.data != null) {
            this.setState({ show: true, method: 'post' });
            setTimeout(() => {
              this.setState({ show: false });
              return this.props.history.push('/success');
            }, 3000);
          } else {
            this.setState({ show: false });
          }
        })
        .catch((err) => {
          this.setState(answerValidation(answers));
          console.log(err);
        });
    }, 300);

    setTimeout(() => {
      this.setState({
        answerEmptyError: '',
      });
    }, 3000);
  };

  handleChange = (index, event, questionId) => {
    const values = [...this.state.answers];
    values[index][event.target.name] = event.target.value;
    this.setState({ answers: values });
  };

  render() {
    const { questions, answerEmptyError } = this.state;

    return (
      <div style={{ marginTop: '40px' }}>
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
            <FontAwesomeIcon icon={faUser} /> <strong>Provide Feedback</strong>
          </Card.Header>

          <Form onSubmit={this.submitFeedback} id='FeedbackFormId'>
            <Card.Body>
              {answerEmptyError && (
                <p className='error' style={{ marginTop: '15px' }}>
                  {' '}
                  <FontAwesomeIcon icon={faExclamationCircle} />{' '}
                  {answerEmptyError}
                </p>
              )}
              {questions.length > 0 ? (
                questions.map((question, index) => (
                  <div key={index}>
                    <Row style={{ marginTop: '17px' }}>
                      <strong>
                        <h4>{index + 1 + '. ' + question.question}</h4>
                      </strong>
                      <strong>
                        {' '}
                        <p style={{ marginTop: '3px' }}>
                          {question.description}
                        </p>
                      </strong>

                      <Form.Group as={Col} controlId='formGridQuestionAns'>
                        <Form.Control
                          style={{ fontSize: '20px' }}
                          autoComplete='off'
                          type='text'
                          name={question.id}
                          onChange={(event) =>
                            this.handleChange(index, event, question.id)
                          }
                          className={'bg-dark text-white'}
                        />
                      </Form.Group>
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
              <Button
                style={{ marginTop: '20px' }}
                size='sm'
                variant='success'
                type='submit'
              >
                <FontAwesomeIcon icon={faSave} /> {''}
                Submit
              </Button>{' '}
            </Card.Body>
          </Form>
        </Card>
      </div>
    );
  }
}
