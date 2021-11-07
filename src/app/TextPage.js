import react, { Component } from 'react';
import copyImage from "./assets/copy.png";
import services from '../services/services';
 class TextPage extends Component{
     constructor(props){
         super(props);
         this.state = {
            url: this.props.url,
            data: "",
            urlCopied:false,
            dataCopied:false
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
        services.update(this.state).then(
            (res)=>{
                if(res.status === 200){
                    window.location.href = window.location.href;
                }
            }
        );
     }
     onDelete = (e) =>{
         e.preventDefault();
         services.delete(this.state.url).then(
             (res)=>{
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
                    <label className="url-label">URL: text-sharer.netlify.com/{this.props.url}</label>
                    <div className="icon" onClick={() => {this.copyURLToClipboard(); this.setState({urlCopied: true, dataCopied:false})}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;<img src={copyImage} width="20px" /> {this.state.urlCopied? "Copied!": ''}
                    </div>
                    <br></br>
                    <br></br>
                    
                    <textarea className="textbox" value={this.state.data} onChange={this.handleOnChangeTextarea} placeholder="Copy your text here!!" ></textarea><br></br>
                    
                    <button className="button" onClick={(e) => {e.preventDefault();this.copyDataToClipboard(); this.setState({dataCopied: true, urlCopied:false})}}>
                        <img src={copyImage} width="10px" /> {this.state.dataCopied? "Copied!": 'Copy!'}
                    </button>&nbsp;
                    <button className="button" onClick={this.onSubmit}>Update!</button> <button className="deleteButton" onClick={this.onDelete}>Delete me!</button>
                </form>
            </div>
         );
     }
 }
 export default TextPage;