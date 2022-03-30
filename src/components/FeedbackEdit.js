import React, { Component } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import MyToast from './MyToast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faEdit,
  faList,
  faPlusSquare,
  faSave,
  faUndo,
  faMinusCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import '../index.css';
import feedbackValidation from '../validations/feedbackValidation';

export default class FeedbackEdit extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.submitFeeback = this.submitFeeback.bind(this);
    this.feedbackChange = this.feedbackChange.bind(this);
  }

  initialState = {
    id: '',
    title: '',
    description: '',
    status: false,
    expire_date: '',
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
            title: response.data.data.title,
            description: response.data.data.description,
            status: response.data.data.status,
            expire_date: response.data.data.expire_date,
            questions: response.data.data.questions,
          });
        }
      })
      .catch((error) => console.log('Error:' + error));
  };

  formchange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  feedbackChange = (index, event) => {
    const values = [...this.state.questions];
    values[index][event.target.name] = event.target.value;
    this.setState({ questions: values });
  };

  submitFeeback = (event) => {
    event.preventDefault();

    const feedback1 = {
      title: this.state.title,
      status: this.state.status,
      description: this.state.description,
      expire_date: this.state.expire_date,
      user_id: 1,
      questions: this.state.questions,
    };

    console.log(feedback1);

    axios
      .post(
        'http://laravelapi-env.eba-buc2trym.us-east-1.elasticbeanstalk.com/api/feedback',
        feedback1
      )
      .then((response) => {
        if (response.data != null) {
          this.resetFeedback();
          this.setState({ show: true, method: 'post' });

          setTimeout(() => this.setState({ show: false }), 3000);
        } else {
          this.setState({ show: false });
        }
      })
      .catch((err) => {
        this.setState(feedbackValidation(feedback1));
        console.log(err);
      });
  };

  updateFeeback = (event) => {
    event.preventDefault();

    const feedback1 = {
      title: this.state.title,
      status: this.state.status,
      description: this.state.description,
      expire_date: this.state.expire_date,
      questions: this.state.questions,
    };
    console.log(feedback1);
    axios
      .put(
        'http://laravelapi-env.eba-buc2trym.us-east-1.elasticbeanstalk.com/api/feedback/' +
          this.state.id,
        feedback1
      )
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true, method: 'put' });
          this.setState({
            questionErrors: [],
            titleError: '',
            expiredateError: '',
          });
          setTimeout(() => this.setState({ show: false }), 3000);
        } else {
          this.setState({ show: false });
        }
      })
      .catch((err) => {
        this.setState(feedbackValidation(feedback1));
        console.log(err);
      });
  };

  handleAddQuestion = () => {
    const values = [
      ...this.state.questions,
      {
        question: '',
        description: '',
        type: 'text',
        data: {},
      },
    ];
    this.setState({ questions: values });
  };

  handleRemoveQuestion = (index, event) => {
    const values = [...this.state.questions];
    values.splice(index, 1);
    this.setState({ questions: values });
  };

  resetFeedback = () => {
    this.setState(() => this.initialState);
    this.setState({
      questionErrors: [],
      titleError: '',
      expiredateError: '',
    });
    this.resetQuestion();
  };

  feedbackList = () => {
    return this.props.history.push('/list');
  };

  resetQuestion = () => {
    const values = [...this.state.questions];

    values.splice(0, values.length);

    this.setState({ questions: values });
    this.props.match.params.id &&
      this.findFeedbackById(this.props.match.params.id);
  };

  render() {
    const {
      title,
      description,
      expire_date,
      questions,
      status,
      questionErrors,
      titleError,
      expiredateError,
    } = this.state;

    return (
      <div style={{ marginTop: '30px' }}>
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
            <FontAwesomeIcon
              icon={this.props.match.params.id ? faEdit : faPlusSquare}
            />
            {this.props.match.params.id ? (
              <strong> Update New Feedback</strong>
            ) : (
              <strong> Add New Feedback</strong>
            )}
          </Card.Header>
          <Form
            onReset={this.resetFeedback}
            onSubmit={
              this.props.match.params.id
                ? this.updateFeeback
                : this.submitFeeback
            }
            id='FeedbackFormId'
          >
            <Card.Body>
              <Row>
                {titleError && (
                  <p className='error' style={{ marginTop: '15px' }}>
                    {' '}
                    <FontAwesomeIcon icon={faExclamationCircle} /> {titleError}
                  </p>
                )}
                <Form.Group as={Col} controlId='formGridTitle'>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    autoComplete='off'
                    type='text'
                    name='title'
                    value={title}
                    onChange={this.formchange}
                    className={'bg-dark text-white'}
                    placeholder='Enter Feedback Title'
                  />
                </Form.Group>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Form.Group as={Col} controlId='formGridDesc'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    autoComplete='off'
                    type='text'
                    name='description'
                    value={description}
                    onChange={this.formchange}
                    className={'bg-dark text-white'}
                    placeholder='Enter Description'
                  />
                </Form.Group>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                {expiredateError && (
                  <p className='error' style={{ marginTop: '15px' }}>
                    {' '}
                    <FontAwesomeIcon icon={faExclamationCircle} />{' '}
                    {expiredateError}
                  </p>
                )}
                <Form.Group as={Col} controlId='formGridDate'>
                  <Form.Label>Expire Date</Form.Label>
                  <Form.Control
                    autoComplete='off'
                    type='date'
                    name='expire_date'
                    value={expire_date}
                    onChange={this.formchange}
                    className={'bg-dark text-white'}
                    placeholder='Enter Date'
                  />
                </Form.Group>
              </Row>
              <Row style={{ marginTop: '14px' }}>
                <Form.Group as={Col} controlId='formGridStatus'>
                  <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                    <Form.Check
                      type='checkbox'
                      label='Active'
                      value={status}
                      onChange={() => this.setState({ status: !status })}
                    />
                  </Form.Group>
                </Form.Group>
              </Row>
              <strong style={{ fontSize: '22px' }}>Questions</strong>{' '}
              <FontAwesomeIcon
                onClick={this.handleAddQuestion}
                icon={faPlusSquare}
              />
              {questions.length > 0 ? (
                questions.map((question, index) => (
                  <div key={index}>
                    <Row style={{ marginTop: '10px' }}>
                      {Array.isArray(questionErrors) && questionErrors[index] && (
                        <p className='error' style={{ marginTop: '15px' }}>
                          {' '}
                          <FontAwesomeIcon icon={faExclamationCircle} />{' '}
                          {questionErrors[index]}
                        </p>
                      )}
                      <Form.Group as={Col} controlId='formGridQuestionText'>
                        <Form.Label>Question Text</Form.Label>
                        <Form.Control
                          autoComplete='off'
                          type='text'
                          name='question'
                          value={question.question}
                          onChange={(event) =>
                            this.feedbackChange(index, event)
                          }
                          className={'bg-dark text-white'}
                          placeholder='Enter question here'
                        />
                      </Form.Group>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                      <Form.Group as={Col} controlId='formGridQuestionDesc'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          autoComplete='off'
                          type='text'
                          name='description'
                          value={question.description}
                          onChange={(event) =>
                            this.feedbackChange(index, event)
                          }
                          className={'bg-dark text-white'}
                          placeholder='Enter Description'
                        />
                      </Form.Group>
                    </Row>

                    <Button
                      style={{ marginTop: '20px' }}
                      variant='danger'
                      onClick={(event) =>
                        this.handleRemoveQuestion(index, event)
                      }
                    >
                      Remove
                    </Button>
                  </div>
                ))
              ) : (
                <div style={{ marginTop: '10px' }}>
                  <strong style={{ fontSize: '22px', color: 'red' }}>
                    No Questions Added
                  </strong>
                </div>
              )}
              <div style={{ textAlign: 'right', marginBottom: '13px' }}>
                {' '}
                <Button size='sm' variant='success' type='submit'>
                  <FontAwesomeIcon icon={faSave} /> {''}
                  {this.props.match.params.id ? 'Update' : 'Save'}
                </Button>{' '}
                <Button size='sm' variant='info' type='reset'>
                  <FontAwesomeIcon icon={faUndo} /> {''}
                  Reset
                </Button>{' '}
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
            <Card.Footer style={{ textAlign: 'right' }}></Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}
