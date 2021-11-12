import React from 'react';
import Container from 'react-bootstrap/Container';
import ShortenedUrl from './components/ShortenedUrl.js';
import UrlInput from './components/UrlInput.js';

export default class App extends React.Component {
  state = {
    urlToShorten: null,
  }

  onUrlSubmit = (url) => {
    this.setState({urlToShorten: url});
  }

  onAnotherClicked = (e) => {
    this.setState({urlToShorten: null});
  }

  render() {
    return (
      <Container className="main-container">
        {this.state.urlToShorten ? (
          <ShortenedUrl urlToShorten={this.state.urlToShorten} onAnotherClicked={this.onAnotherClicked} />
        ) : (
          <UrlInput placeholder="https://example.com" onSubmit={this.onUrlSubmit} />
        )}
      </Container>
    );
  }
}