import react, { Component } from 'react';
import logo from '../app/assets/yellow-electric-lightning-bolt-icon.png';
import logo1 from '../app/assets/icon_1.png'
class Footer extends Component{
    render(){
        return (
        <div className="footer">
            <a className="logo" href="https://sreekar.netlify.app/"  target="_blank"><img src={logo1} width="100px"></img></a><br></br>
            <a href="http://localhost:3000/privacy_policy"  target="_blank" className="link">Privacy Policy</a>
        </div>
        );
    }
}

export default Footer;