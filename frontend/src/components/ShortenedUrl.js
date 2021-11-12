import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

export default class ShortenedUrl extends React.Component {
  static propTypes = {
    urlToShorten: PropTypes.string,
    onAnotherClicked: PropTypes.func,
  };

  state = {
    shortUrl: null,
    errorMessage: null,
    copyButtonText: "Copy"
  }

  async componentDidMount() {
    this.setState({errorMessage: null});
    const headers = {"Content-Type": "application/json"}
    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({"url": {"url": this.props.urlToShorten}}),
    }
    const request = new Request('/api/urls');
    try {
      const rawResult = await fetch(request, options);
      if(!rawResult.ok) {
        throw Error(rawResult.statusText);
      }
      const json = await rawResult.json();
      this.setState({shortUrl: json.url.shortened_url});
    } catch (err) {
      this.setState({errorMessage: "An error occurred. Please try again later."});
    }
  }

  handleCopyClicked = (e) => {
    navigator.clipboard.writeText(this.state.shortUrl);
    this.setState({copyButtonText: "Copied!"})
  }

  handleAnotherClicked = (e) => {
    this.props.onAnotherClicked(e);
  }

  render() {
    return (
      <Stack direction="horizontal" gap={3}>
        {this.state.errorMessage ? (
          <Alert variant="danger">{this.state.errorMessage}</Alert>
        ) : (
          <a href={this.state.shortUrl} target="_blank" rel="noreferrer" className="shortened-url">{this.state.shortUrl}</a>
        )}
        <Button variant="secondary" className="ms-auto" onClick={this.handleCopyClicked}>{this.state.copyButtonText}</Button>
        <Button variant="primary" onClick={this.handleAnotherClicked}>Shorten Another URL</Button>
      </Stack>

    )
  }
}