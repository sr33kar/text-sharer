import react, { Component } from 'react';
import HomePage from './HomPage';
import TextPage from './TextPage';
import './style.css';
import Privacy_policy from './Privacy_policy';
class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){
        var url = window.location.href;
        url = url.split('/');
        console.log(url.length);
        const urlIndex =3;
        if(url.length===4 && url[url.length-1].length!==0 || url.length===5 && url[url.length-1].length===0){
            url = url[urlIndex];
            if(url==='privacy_policy'){
                return (
                    <div className="privacy_policy">
                        <Privacy_policy></Privacy_policy>
                    </div>
                );
            }
            return (
                <div className="Home">
                    <TextPage className="Home" url={url} />
                </div>
            );
        }
        else if(url.length===3 || url.length===4 && url[url.length-1].length===0){
            return (
                <div className="Home">

                    <HomePage className="Home" />

                </div>
            );
        }
        else{
            return (
                <div>
                    Wrong URL! Go back!!
                </div>
            );
        }
    }
}

export default Home;