import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";

export default class Spotify extends Component {
    constructor(props){
        super();
        this.state = {
            everyOne: [],
            isWorking: false
        }
    }

componentDidMount(){
    axios.get('http://localhost:8888/v1/radiohead/finally')
    .then(response => {
        // console.log(response.data.data.items);
        this.setState({everyOne: response.data.data.items});
        console.log(this.state.everyOne);
        this.setState({ isWorking: true});
        console.log(this.state.isWorking);
    })
    .catch(error => {
        console.log(error);
        this.setState({isWorking: false});
        console.log(this.state.isWorking);
        this.setState({everyOne: null});
    })
}

    render() {
        if (this.state.isWorking === true ) {
            return (
                <div>
                    <h1>Your playlists.</h1>
                    <table cellpadding="15px">
                        <tr>
                                <th>Playlist Name</th>  
                                <th>Total Number</th>
                                <th>See More</th>
                        </tr>
                    {this.state.everyOne.map(item => 


                            <tr>
                        <td align="center">{item.name}</td>
                       <td align="center">{item.tracks.total}</td>
                       <td>                           
                        <Link to={`/playlist/${item.id}/0`}>
                        See Playlist!
                        </Link>
                        </td>
                        </tr>
                        )} 
                        
                    </table>
                </div>
            )
        } 
        if (this.state.isWorking === false){
            return (
                <h1>DOES NOT WORK!!!</h1>
            )
        }
    }
        
}
