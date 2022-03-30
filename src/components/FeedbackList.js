import React, { Component } from 'react';
import '../index.css';
import {
  Card,
  Table,
  Image,
  ButtonGroup,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faList,
  faEye,
  faTrash,
  faUsers,
  faEdit,
  faTimes,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import { Link } from 'react-router-dom';

export default class FeedbackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: [],
      search: '',
      sortToggle: true,
      sortName: {},
    };
  }

  sortData = () => {
    this.setState((state) => ({
      sortToggle: !state.sortToggle,
    }));
    this.findAllFeedbacks(this.state.currentPage);
  };

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('token');
    this.findAllFeedbacks(this.state.currentPage);
  }

  findAllFeedbacks() {
    console.log('token work check');

    axios
      .get(
        'http://laravelapi-env.eba-buc2trym.us-east-1.elasticbeanstalk.com/api/feedback'
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({ feedbacks: data.data });
        console.log(this.state.feedbacks);
      })
      .catch((err) => console.log(err));
  }

  deleteFeedback = (feedbackId) => {
    axios
      .delete(
        'http://laravelapi-env.eba-buc2trym.us-east-1.elasticbeanstalk.com/api/feedback/' +
          feedbackId
      )
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);
          this.setState({
            feedbacks: this.state.feedbacks.filter(
              (feedback) => feedback.id !== feedbackId
            ),
          });
        } else {
          this.setState({ show: false });
        }
      });
  };

  searchChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  cancelSearch = () => {
    this.setState({
      search: '',
    });
    this.findAllFeedbacks();
  };

  searchData = () => {
    console.log(this.state.search);

    axios
      .get(
        'http://laravelapi-env.eba-buc2trym.us-east-1.elasticbeanstalk.com/api/feedback/search/' +
          this.state.search
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          feedbacks: data.response,
        });
      });
  };

  render() {
    const { search, feedbacks } = this.state;

    return (
      <div style={{ marginTop: '50px' }}>
        <div style={{ display: this.state.show ? 'block' : 'none' }}>
          <MyToast
            show={this.state.show}
            message={'Feedback Deleted Successfully'}
            type={'danger'}
          />
        </div>
        <Card className='border border-dark bg-dark text-white'>
          <Card.Header>
            <div style={{ float: 'left' }}>
              <strong>
                <FontAwesomeIcon icon={faList} /> Feedback List
              </strong>
            </div>
            <div style={{ float: 'right' }}>
              <InputGroup size='sm'>
                <FormControl
                  autoComplete='off'
                  placeholder='search'
                  name='search'
                  value={search}
                  onChange={this.searchChange}
                  className={'info-border bg-dark text-white'}
                />
                <ButtonGroup>
                  <Button
                    size='sm'
                    variant='outline-info'
                    type='button'
                    onClick={this.searchData}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                  <Button
                    size='sm'
                    variant='outline-danger'
                    type='button'
                    onClick={this.cancelSearch}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </ButtonGroup>
              </InputGroup>
            </div>
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant='dark'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Created At</th>
                  <th>Expire Date</th>
                  <th>Public Link</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.length === 0 ? (
                  <tr align='center'>
                    <td colSpan='7'>No Feedback Available.</td>
                  </tr>
                ) : (
                  feedbacks.map((feedback) => (
                    <tr key={feedback.id}>
                      <td>{feedback.title}</td>
                      <td>{feedback.status ? 'Active' : 'Inactive'}</td>
                      <td>{feedback.description}</td>
                      <td>{feedback.created_at.slice(0, 10)}</td>
                      <td>{feedback.expire_date}</td>
                      <td>
                        <Link to={'public/' + feedback.id} target='_blank'>
                          <Button size='sm' variant='info' type='button'>
                            {' '}
                            <FontAwesomeIcon icon={faUsers} /> {''}
                            Public Link
                          </Button>
                        </Link>
                      </td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={'edit/' + feedback.id}
                            className='btn btn-sm btn-outline-primary'
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{' '}
                          <Button
                            size='sm'
                            variant='outline-danger'
                            onClick={() => this.deleteFeedback(feedback.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                          <Link
                            to={'/view/feedback/' + feedback.id}
                            className='btn btn-sm btn-outline-secondary'
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </Link>{' '}
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
