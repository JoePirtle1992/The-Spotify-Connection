import React, { Component } from 'react'
import axios from 'axios'

export default class SeeProfile extends Component {
    constructor(props){
        super();
        this.state = {
            everyOne: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8888/v1/radiohead/heresHoping')
        .then(response =>{
            console.log(response)
            this.setState({everyOne: response})
        })
        .catch(error => {
            console.log(error)
        })
    }
    render() {
        return (
            <div>
                <h1>SUP!?</h1>
            </div>
        )
    }
}
