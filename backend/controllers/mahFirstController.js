
const dotenv = require("dotenv");
const axios = require('axios');
dotenv.config({path: "./config/config.env"});
//The CLIENT_ID, CLIENT_SECRET is found on Spotify's For Developers (Main Dashboard) - You would also click Settings for the REDIRECT_URI


exports.GoToLogin = (req, res) => {
    //Brings Up Spotify's Login Screen
    var scopes = 'user-read-private user-read-email playlist-read-collaborative';
    res.redirect('https://accounts.spotify.com/authorize' + '?response_type=code' + '&client_id=' + process.env.CLIENT_ID + (scopes ? '&scope=' + encodeURIComponent(scopes) : '') + '&redirect_uri=' + encodeURIComponent(process.env.REDIRECT_URI));
}

exports.callBack = (res, req) => {
    //It worked...only when I swapped res and req...
    // Gives back the response when you make the GET request/
    axios({
        method: 'post',
        headers: {'Authorization': 'Basic ' + Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'),'Content-Type':  'application/x-www-form-urlencoded' },
        url: 'https://accounts.spotify.com/api/token' + '?grant_type=' + 'authorization_code' + '&code=' + res.query.code + '&redirect_uri=' + process.env.REDIRECT_URI, 
    })
    
       .then(function(response){

           axios({
               method: 'post',
               headers: {'Authorization': 'Basic ' + Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64') },
               url: 'https://accounts.spotify.com/api/token' + '?grant_type=' + 'refresh_token' + '&refresh_token=' + response.data.refresh_token,
           })
    
           .then(function(response){
                axios({
                    method: 'get',
                    headers: {'Authorization': 'Bearer ' + response.data.access_token},
                    url: 'https://api.spotify.com/v1/me'
                    })

                    if (response.status === 200){

                    axios.interceptors.request.use(function (config) {
                        // Do something before request is sent
                        //This will intercept future requests to use that refresh token!
                        config.headers['Authorization'] = JSON.stringify({'Authorization': 'Bearer ' + response.data.access_token});
                        return config;
                      }, function (error) {
                        // Do something with request error
                        return Promise.reject('This is the interceptor error' + error);
                      });

                    req.redirect('http://localhost:3000/spotify')
                    }
           })
           .catch(function(error){
               console.log(error);
           })
           .catch(function(error){
               console.log(error.response)
               req.send(error.response);
           })

       })
    .catch(function(error){
        console.log(error.response);
        console.log('THERE IS AN ERROR!!!!');
    })
}

exports.finally = (res, req) => {
    //Had to switch res, req to work
    axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me/playlists'
    })
    .then(function(response){
        req.json({message: "HEY!!!", data: response.data});
    })
    .catch(function(error){
        console.log(error)
        req.json({message: 'DOESNT WORK!!!!'})
    })
}

exports.heresHoping = (req, res) => {
    axios.get('http://api.spotify.com/v1/me')
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    })
}

exports.getTheRest = (res, req)=> {
    axios.get(`https://api.spotify.com/v1/playlists/${res.params.id}/tracks?offset=${res.params.offset}&limit=100`)
    .then(function(response){
    req.json({message: "MORE", data: response.data});
    })
    .catch(function(error){
        console.log(error);
    })
}