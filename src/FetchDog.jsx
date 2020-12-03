import React, { Component } from 'react'

class FetchDog extends Component {
  constructor() {
    super()
    this.fetchDogImage = this.fetchDogImage.bind(this);
    this.state = {
      loading: true,
      fetchedUrl: '',
    }
  }

  async fetchDogImage() {
    const endpoint = 'https://dog.ceo/api/breeds/image/random';
    const result = await fetch(endpoint);
    const { message } = await result.json();
    this.setState({
      fetchedUrl: message,
      loading: false,
    });
  }
  
  handleTerrierFetch() {
    alert('Raça de cão não permitida, clique em nova imagem!');
    return false;
  }
  
  shouldComponentUpdate(_nextProps, { fetchedUrl }) {
    const shouldUpdate = (fetchedUrl.includes('terrier'))
      ? this.handleTerrierFetch()     
      : true;
    return shouldUpdate;
  }

  componentDidMount() {
    this.fetchDogImage();    
  }
  
  componentDidUpdate() {
    alert(this.state.fetchedUrl.match(/(?<=breeds\/)(.*?)(?=\/)/gm));
  }

  render() {
    const { loading, fetchedUrl} = this.state;
    const { fetchDogImage } = this;
    return (
      <div>
        { (loading) ? <h1 className="load-text">LOADING...</h1> : <img src={fetchedUrl} alt="Minha Figura" /> }
        <button type="button" onClick={fetchDogImage}>NOVA IMAGEM</button>
      </div>
    )
  }
}

export default FetchDog
