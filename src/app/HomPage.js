
import react, { Component } from 'react';
import services from '../services/services';
import { Button,Modal} from 'react-bootstrap';
import ReactLoading from 'react-loading';
import Footer  from './Footer';
import Header from './Header';
import ContactMe from './ContactMe';
import image1 from '../app/assets/3885.png';
import textSharerLogo from '../app/assets/text-sharer-logo.png';
import * as CryptoJS from 'crypto-js';
 class HomePage extends Component{
     constructor(props){
         super(props);
         this.state = {
             url: "",
             data: "",
             password: "",
             alreadyTaken: false,
             urlEmpty: false,
             loading: false,
             hasSlash: false,
             showPassword: false 
         };
         this.handleOnChangeTextarea = this.handleOnChangeTextarea.bind(this);
         this.handleOnChangeUrl = this.handleOnChangeUrl.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
         this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
         this.toggleShowPassword = this.toggleShowPassword.bind(this);
     }
     handleAlreadyTakenModal(){  
        this.setState({alreadyTaken:!this.state.alreadyTaken})  
      } 
      handleURLEmptyModal(){
          this.setState({urlEmpty: !this.state.urlEmpty})
      }
     handleOnChangeTextarea = (e) =>{
         this.setState({
             data: e.target.value
         });
     }
     handleOnChangeUrl = (e) =>{
         if(e.target.value.includes('/')){
             this.setState({hasSlash: true});
         }
         else{
             this.setState({hasSlash: false});
         }
         this.setState({
             url: e.target.value
         });
         
     }
     handleOnChangePassword= (e) =>{
        this.setState({password: e.target.value});
     }
     onSubmit = (e) =>{
        e.preventDefault();
        if(this.state.url.length === 0){
            this.setState({urlEmpty: true, alreadyTaken:false})
        }
        else if(this.state.url === 'privacy_policy'){
            
            this.setState({urlEmpty: false, alreadyTaken:true})

        }
        else{
            this.setState({urlEmpty: false, loading: true});
            services.get(this.state.url).then(
                (response)=>{
                    if(response.data && response.data._id.length > 0){
                        this.setState({alreadyTaken: true, loading: false});
                    }
                    else{
                        var encrypted = this.state.data;
                        if(this.state.password.length!==0){
                            encrypted =CryptoJS.AES.encrypt(this.state.data, this.state.password).toString();
                        }
                        services.create({url: this.state.url, data: encrypted}).then(
                            (response) =>{
                                window.location.href = window.location.href + this.state.url;
                            }
                        );
                    }
                }
            );
        }
     }
     toggleShowPassword(){
        this.setState({showPassword: !this.state.showPassword});
     }
     render() {
         return (
            <div className="homePage">
            <Header />
                <img src={textSharerLogo} className="text-sharer-logo"></img>
                <p className="para">Free Online Text Sharing App without login and no long URLs.</p>
                <form className="form">
                    <label className="url-label">Custom URL: text-sharer.netlify.com/</label><input type="text" className="url-input" value={this.state.url} onChange={this.handleOnChangeUrl} placeholder="example01" required="true" /><br></br>
                    {
                        this.state.hasSlash? <label className="error-label">'/' are not allowed in the URL.</label> : ''
                    }
                    <Modal show={this.state.alreadyTaken} onHide={()=>this.handleAlreadyTakenModal()}>  
                        <Modal.Header closeButton>Already Taken :(</Modal.Header>  
                        <Modal.Body>This URL is already taken. Please retry with other URL.</Modal.Body>  
                    </Modal>  
                    <Modal show={this.state.urlEmpty} onHide={()=>this.handleURLEmptyModal()}>  
                        <Modal.Header closeButton>Empty URL</Modal.Header>  
                        <Modal.Body>Please enter the custom URL.</Modal.Body>  
                    </Modal>
                    Password: <input type={this.state.showPassword? "text": "password"} className='password-input' placeholder="Password" id="myInput" value={this.state.password} onChange={this.handleOnChangePassword}/><br></br>
                    <input type="checkbox" onChange={this.toggleShowPassword} className='checkbox' />  Show Password
                    <br></br><textarea className="textbox" value={this.state.data} onChange={this.handleOnChangeTextarea} placeholder="Copy your text here!!" ></textarea><br></br>
                    <button className="button" onClick={this.onSubmit} disabled={this.state.loading || this.state.hasSlash}>{this.state.loading? <ReactLoading type="bubbles" color="black" />: 'Submit!'}</button>
                   
                </form>
                <br></br>
                <div className="guide" id="guide">
                <br></br><br></br><br></br><br></br>
                    <img className="image1" src={image1}></img>
                    <div className="howToUse">
                        <h4>How to Use:</h4>
                        <ul>
                            <li>Enter the data you wish to share in the textbox.</li>
                            <li>Enter the URL you wish to have, replace "example" with "your-url".</li>
                            <li>Press submit and share the url:</li>
                            https://text-sharer.netlify.com/&lt;your-url&gt;
                        </ul>
                    </div>
                </div>
                <ContactMe className="contact-me" id="contact-me" />
                <Footer></Footer>
            </div>
         );
     }
 }
 export default HomePage;