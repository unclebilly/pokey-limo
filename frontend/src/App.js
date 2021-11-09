import React from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
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
      <Container fluid="sm">
        <Stack gap={3}>
          <h1 className="header">Pokey Limo</h1>
          <img src={process.env.PUBLIC_URL + '/pokeylimo.png'} alt="Pokey Limo" />
          {this.state.urlToShorten ? (
            <ShortenedUrl urlToShorten={this.state.urlToShorten} onAnotherClicked={this.onAnotherClicked} />
          ) : (
            <UrlInput placeholder="https://example.com" onSubmit={this.onUrlSubmit} />
          )}
        </Stack>
      </Container>
    );
  }
}