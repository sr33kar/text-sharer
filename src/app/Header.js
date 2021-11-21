import react, { Component } from 'react';
import logo from '../app/assets/yellow-electric-lightning-bolt-icon.png';
import logo1 from '../app/assets/icon_1.png';
import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import textSharerLogo from '../app/assets/text-sharer-logo.png';

class Header extends Component{
    scrollToTop() {
    scroll.scrollToTop();
    }
    scrollToBottom() {
        scroll.scrollToBottom();
    }
    scrollTo() {
        scroll.scrollTo(500);
    }
    scrollMore() {
        scroll.scrollMore(1000);
    }
    handleSetActive(to) {
        console.log(to);
    }
    render(){
        
        return (
        <div className="header">
            <a className="logo" href="http://text-sharer.netlify.com/"  target="_blank"><img src={textSharerLogo} width="100px"></img></a>
            <button className="nav-links" onClick={this.scrollMore}>Contact Us</button>
            <button className="nav-links" onClick={this.scrollTo}>How to use?</button>
        </div>
        );
    }
}

export default Header;