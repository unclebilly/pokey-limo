import React from 'react';
import PropTypes from 'prop-types';
import Stack from 'react-bootstrap/Stack';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import validator from 'validator';

export default class UrlInput extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onSubmit: PropTypes.func,
  };

  state = {
    isInvalid: false,
    url: "",
  }

  handleChange = e => {
    let url = e.target.value;
    this.setState({isInvalid: !validator.isURL(url), url: url});
  }

  handleSubmit = e => {
    this.props.onSubmit(this.state.url);
  }

  render() {
    return (
      <Stack direction="horizontal" gap={3}>
        <FormControl type="url" className="me-auto" placeholder={this.props.placeholder} isInvalid={this.state.isInvalid} onChange={this.handleChange} />
        <Button variant="primary" onClick={this.handleSubmit} disabled={this.state.isInvalid}>Submit</Button>
      </Stack>
    )
  }
}