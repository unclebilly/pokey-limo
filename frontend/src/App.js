import React from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import UrlInput from './components/UrlInput.js';

export default class App extends React.Component {
  onUrlSubmit = (url) => {
    const headers = {"Content-Type": "application/json"}
    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({"url": {"url": url}}),
    }
    let request = new Request('http://localhost:3000/api/urls');
    fetch(request, options).then(function(response) {
      console.log(response);
    });
  }

  render() {
    return (
      <Container fluid="sm">
        <Stack gap={3}>
          <h1 className="header">Pokey Limo</h1>
          <img src={process.env.PUBLIC_URL + '/pokeylimo.png'} alt="Pokey Limo" />
          <UrlInput placeholder="https://example.com" onSubmit={this.onUrlSubmit} />
        </Stack>
      </Container>
    );
  }
}