
import react, { Component } from 'react';
import services from '../services/services';
import { Button,Modal} from 'react-bootstrap';
import ReactLoading from 'react-loading';
 class HomePage extends Component{
     constructor(props){
         super(props);
         this.state = {
             url: "",
             data: "",
             alreadyTaken: false,
             urlEmpty: false,
             loading: false,
             hasSlash: false
         };
         this.handleOnChangeTextarea = this.handleOnChangeTextarea.bind(this);
         this.handleOnChangeUrl = this.handleOnChangeUrl.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
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
     onSubmit = (e) =>{
        e.preventDefault();
        if(this.state.url.length === 0){
            this.setState({urlEmpty: true, alreadyTaken:false})
        }else{
            this.setState({urlEmpty: false, loading: true});
            services.get(this.state.url).then(
                (response)=>{
                console.log(response);
                    if(response.data && response.data._id.length > 0){
                        this.setState({alreadyTaken: true, loading: false});
                    }
                    else{
                        services.create(this.state).then(
                            (response) =>{
                                window.location.href = window.location.href + this.state.url;
                            }
                        );
                    }
                }
            );
        }
     }
     render() {
         return (
            <div className="homePage">
                
                <h2 className="headers">Text-Sharer</h2>
                <p className="para">Online Text Sharing App without login and no long URLs.</p>
                <form className="form">
                    <label className="url-label">Custom URL: text-sharer.netlify.com/</label><input type="text" className="url-input" value={this.state.url} onChange={this.handleOnChangeUrl} placeholder="->example" required="true" /><br></br>
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
                    <br></br><textarea className="textbox" value={this.state.data} onChange={this.handleOnChangeTextarea} placeholder="Copy your text here!!" ></textarea><br></br>
                    <button className="button" onClick={this.onSubmit} disabled={this.state.loading || this.state.hasSlash}>{this.state.loading? <ReactLoading type="bubbles" color="black" />: 'Submit!'}</button>
                   
                </form>
                <br></br>
                <div className="guide">
                    <h4>How to Use:</h4>
                    <ol>
                        <li>Enter the data you wish to share in the textbox.</li>
                        <li>Enter the URL you wish to have, replace "example" with "your-url".</li>
                        <li>Press submit and share the url:</li>
                        https://text-sharer.netlify.com/&lt;your-url&gt;
                    </ol>
                </div>
            </div>
         );
     }
 }
 export default HomePage;