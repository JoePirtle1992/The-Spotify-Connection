import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      everyBody: [],
      doesNotExist: false,
      totalOfItems: 0,
    };
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:8888/v1/radiohead/playlist/${this.props.match.params.id}/${this.props.match.params.more}`
      )
      .then(res => {
        console.log(res);
        this.setState({ everyBody: res.data.data.items });
        if (this.state.everyBody.length === 0){
            console.log('TIS GONE!!!')
            this.setState({doesNotExist: true});
            console.log(this.state.doesNotExist);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  onClick = e => {
    //   console.log(e.target.innerText);
    const clown = e.target.value -=-100;

    axios
    .get(
      `http://localhost:8888/v1/radiohead/playlist/${this.props.match.params.id}/${clown}`
    )
    .then(res => {
    this.setState({totalOfItems: res.data.data.total});
      var joinIt = this.state.everyBody.concat(res.data.data.items);
      console.log(joinIt);

      this.setState({ everyBody: joinIt })

      if (this.state.everyBody.length === 0){
          console.log('TIS GONE!!!')
          this.setState({doesNotExist: true});
      }
      if (this.state.everyBody.length === this.state.totalOfItems){
          console.log('ALL THERE!!! :)');
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

incrementMe = e => {
    const clown = e.target.value -=-100;
    //   console.log(e.target.value++ * 100)
    console.log(clown);
  }

  render() {

    if (this.state.doesNotExist === false) {
        return (
          <div>
              {/* <button onClick={this.onClick}>{100}</button>
              <button onClick={this.onClick}>{200}</button>
              <button onClick={this.onClick}>{300}</button>
              <button onClick={this.onClick}>{400}</button> */}
            {/* <Link to={`/playlist/${this.props.match.params.id}/${0 + 100}`}>100</Link> */}
              <button onClick={this.onClick} value={0}>Load More Results</button>
    
            <h1>Playlist</h1>
            <div id="entire-table">
            <table cellpadding="10px">
              <tr>
                <th>Name</th>
                <th>Artist</th>
              </tr>
              {this.state.everyBody.map(item => (
                // <div id="item">
                //     <div className="info">
                //     <h1>{item.track.name}</h1>
                //     <p>{item.track.artists[0].name}</p>
                //     </div>
                //     <div className="image">
                //     <img src={item.track.album.images[1].url} alt=""/>
                //     </div>
                //     </div>
                <tr>
                  <td align="center">{item.track.name}</td>
                  <td>{item.track.artists[0].name}</td>
                </tr>
              ))}
            </table>
            </div>
          </div>
        );
    }
    if (this.state.doesNotExist === true){
        return (
            <div>
                <h1>Nothing is Left!</h1>
            </div>
        )
    }
  }
}
