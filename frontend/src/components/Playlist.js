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
      songId: [],
      resultButton: true,
      bpmBbutton: false,
      finishedBPM: false
    };
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:8888/v1/radiohead/playlist/${this.props.match.params.id}/${this.props.match.params.more}`
      )
      .then(res => {
        this.setState({ everyBody: res.data.data.items });
        if (this.state.everyBody.length === 0) {
          console.log("TIS GONE!!!");
          this.setState({ doesNotExist: true });
          console.log(this.state.doesNotExist);
        }
      });
  }

  onClick = e => {
    const clown = (e.target.value -= -100);

    axios
      .get(
        `http://localhost:8888/v1/radiohead/playlist/${this.props.match.params.id}/${clown}`
      )
      .then(res => {
        this.setState({ totalOfItems: res.data.data.total });
        var joinIt = this.state.everyBody.concat(res.data.data.items);
        // console.log(joinIt);

        this.setState({ everyBody: joinIt });

        if (this.state.everyBody.length === 0) {
          console.log("TIS GONE!!!");
          this.setState({ doesNotExist: true });
        }
        if (this.state.everyBody.length === this.state.totalOfItems) {
          console.log("ALL THERE!!! :)");
          this.setState({ bpmBbutton: true });
          this.setState({ resultButton: false });
          console.log(this.state.everyBody);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  getBPM = e => {
    //Chunking Based On TextContent
    const loadedImage = Array.from(document.getElementsByClassName("track-id"));
    const crap = loadedImage.map(item => item.textContent);

    var chunks = function(crap, size) {
      var results = [];
      while (crap.length) {
        results.push(crap.splice(0, size));
      }
      return results;
    };

    var injured = chunks(crap, 100);

    injured.forEach(el =>
      axios
        .get(`http://localhost:8888/v1/radiohead/song-info/${el}`)
        .then(res => {
          //Merges The Audio Details
          var joinIt = res.data.data.audio_features.concat(
            ...this.state.songId
          );
          this.setState({ songId: joinIt });

          if (this.state.songId.length === this.state.totalOfItems) {
            this.setState({ bpmBbutton: false }); //Sets the button's state back to false, which later helps prevents it from making another get request.
            console.log("MISSION COMPRETE!!!");
          }
          {
            var n = Array.from(document.getElementsByClassName("no"));
            var m = Array.from(document.getElementsByClassName("second"));

            n.forEach((num1, index) => {
              const num2 = m[index];
              num1.appendChild(num2);
            });
            //This will overwrite that 'second' variable to be placed into it
            n.forEach(num1 => {
              num1.innerHTML = num1.outerHTML;
            });

          }
        })
        .catch(error => {
          console.log(error);
        })
    );
  };

  // sortBPM = e => {
  //   const sortIt = this.state.songId.sort(function(a, b) {
  //     return a.energy - b.energy;
  //   });

  //   this.setState({ songId: sortIt });
  //   //  const daSorted = sortIt.sort();
  //   //  console.log(daSorted);

  //   //  const sortIt = this.state.songId.sort(item => item.energy)
  //   // console.log(sortIt);

  //   // this.setState({songId: daSorted});
  // };
  // sortLoudness = e => {
  //   const sortIt = this.state.songId.sort(function(a, b) {
  //     return a.loudness - b.loudness;
  //   });

  //   this.setState({ songId: sortIt });
  //   //  const daSorted = sortIt.sort();
  //   //  console.log(daSorted);

  //   //  const sortIt = this.state.songId.sort(item => item.energy)
  //   // console.log(sortIt);

  //   // this.setState({songId: daSorted});
  //   // console.log(this.state.songId)
  // };

  // sortSong = e => {
  //   // console.log(this.state.everyBody.map(a => a.track.name))

  //   const sortIt = this.state.everyBody.sort(function(a, b) {
  //     if (a.track.name > b.track.name) {
  //       return -1;
  //     }
  //     if (b.track.name < a.track.name) {
  //       return 1;
  //     }
  //     return 0;
  //   });

  //   this.setState({ everyBody: sortIt });
  // };

  sortBPM = e => {
    //Super creative way to sort based off a certain value within

      var pork = Array.from(document.getElementsByClassName("no"));

    //Grabs the Energy Cell
    const japan = pork.map(perk => perk.cells[5]);

    const son = japan.sort(function(a, b) {
      if (a.textContent < b.textContent) {
        return -1;
      } else {
        return 1;
      }
    });

    son.forEach((el, index) => {
      var second = pork[index]; //The First Array
      var lucky = el.parentElement;
      var time = lucky.cloneNode(true)
      console.log(time.innerHTML)
      second.replaceWith(time)
    });


  };

  render() {
    if (this.state.doesNotExist === false) {
      return (
        <div>
          {this.state.resultButton ? (
            <button onClick={this.onClick} value={0}>
              Load More Results
            </button>
          ) : (
            ""
          )}

          {/* Gives You The BPM Once Every Song Is Loaded, and then it disappears */}
          {this.state.bpmBbutton ? (
            <div>
              {" "}
              <h1>Get BPM</h1>
              <button onClick={this.getBPM}>Get BPM</button>
            </div>
          ) : (
            ""
          )}
          <button onClick={this.sortSong}>Sort Name</button>
          <button onClick={this.sortBPM}>Sort BPM</button>
          <button onClick={this.sortLoudness}>Sort Loudness</button>
          <button value={this.state.totalOfItems}>
            {this.state.totalOfItems}
          </button>
          <button onClick={this.combineIt}>PACKERS!!</button>

          <h1>Playlist</h1>
          <div id="entire-table">
            <table id="baron">
              <table cellPadding="10px">
                <tr>
                  <th>Track Number</th>
                  <th>Name</th>
                  <th>Artist</th>
                  <th>Song Id</th>
                  <th>Release Date</th>

                  <th>Energy</th>
                  <th>Loudness</th>
                  <th>Danceability</th>
                  <th>Tempo</th>
                </tr>

                {this.state.everyBody.map((item, index) => (
                  <tr className="no">
                    <td>{index + 1}</td>
                    <td align="center">{item.track.name}</td>
                    <td>{item.track.artists[0].name}</td>

                    <td className="track-id">{item.track.id}</td>
                    <td>{item.track.album.release_date}</td>
                  </tr>
                ))}
                {this.state.songId.map(item => (
                  <tr class="second">
                    <td className="track-energy">{item.energy}</td>
                    <td className="track-loudness">{item.loudness}</td>
                    <td>{item.danceability}</td>
                    <td>{item.tempo}</td>
                  </tr>
                ))}
              </table>

              {/* This deletes items...has nothing to do with code, beyond for study purposes

const removeElements = (elms) => elms.forEach(el => el.remove());

removeElements( document.querySelectorAll(".second") ); */}

              {/* 
              <table cellpadding="10px">
                  <tr>
                    <th>BPM</th>
                    <th>Loudness</th>
                    <th>Danceability</th>
                  </tr>
              </table> */}
            </table>
          </div>
        </div>
      );
    }
    if (this.state.doesNotExist === true) {
      return (
        <div>
          <h1>Nothing is Left!</h1>
        </div>
      );
    }
  }
}
