import react, { Component } from 'react';
import copyImage from "./assets/copy.png";
import services from '../services/services';
import { Button,Modal} from 'react-bootstrap';
import ReactLoading from 'react-loading';
 class TextPage extends Component{
     constructor(props){
         super(props);
         this.state = {
            url: this.props.url,
            data: "",
            urlCopied:false,
            dataCopied:false,
            loading: false,
            deleting: false
        };
        services.get(this.state.url).then(
            (response) =>{
                console.log(response);
                this.setState({
                    data: response.data.data
                });
            }
        )
        this.handleOnChangeTextarea = this.handleOnChangeTextarea.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
     }
     
    baseURL="https://text-sharer.netlify.com/"
     handleOnChangeTextarea = (e) =>{
        this.setState({
            data: e.target.value
        });
    }
    onSubmit = (e) =>{
        e.preventDefault();
        this.setState({loading: true});
        services.update(this.state).then(
            (res)=>{
                this.setState({loading: false});
                if(res.status === 200){
                    window.location.href = window.location.href;
                }
            }
        );
     }
     onDelete = (e) =>{
         e.preventDefault();
         this.setState({deleting: true});
         services.delete(this.state.url).then(
             (res)=>{
                 this.setState({deleting: false})
                 if(res.status===200){
                    var currURL = window.location.href;
                    window.location.href = currURL.substr(0, currURL.length - this.state.url.length);
                 }
             }
         );

     }
     copyURLToClipboard= () => {
        var textField = document.createElement('textarea')
        textField.innerText = this.baseURL+this.state.url;
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
      }
      copyDataToClipboard= () => {
        var textField = document.createElement('textarea')
        textField.innerText = this.state.data;
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
      }

     render() {
         return (
            <div>
                <h2 className="headers">Text-Sharer</h2>
                <form className="form">
                    <label className="url-label">Custom URL: text-sharer.netlify.com/{this.props.url}</label>
                    <div className="icon" onClick={() => {this.copyURLToClipboard(); this.setState({urlCopied: true, dataCopied:false})}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;<img src={copyImage} width="20px" /> {this.state.urlCopied? "Copied!": ''}
                    </div>
                    <br></br>
                    <br></br>
                    
                    <textarea className="textbox" value={this.state.data} onChange={this.handleOnChangeTextarea} placeholder="Copy your text here!!" ></textarea><br></br>
                    
                    <button className="button" onClick={(e) => {e.preventDefault();this.copyDataToClipboard(); this.setState({dataCopied: true, urlCopied:false})}}>
                        <img src={copyImage} width="10px" /> {this.state.dataCopied? "Copied!": 'Copy!'}
                    </button>&nbsp;
                    <button className="button" onClick={this.onSubmit} disabled={this.state.loading}>{this.state.loading? <ReactLoading type="bubbles" color="black" height={'30px'} width={'50px'} />: 'Update!'}</button> <button className="deleteButton" onClick={this.onDelete} disabled={this.state.deleting}>{this.state.deleting? <ReactLoading type="bubbles" color="black" />: 'Delete me!'}</button>
                </form>
            </div>
         );
     }
 }
 export default TextPage;