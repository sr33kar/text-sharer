
import react, { Component } from 'react';
import services from '../services/services';
 class HomePage extends Component{
     constructor(props){
         super(props);
         this.state = {
             url: "",
             data: "",
             alreadyTaken: false
         };
         this.handleOnChangeTextarea = this.handleOnChangeTextarea.bind(this);
         this.handleOnChangeUrl = this.handleOnChangeUrl.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
     }
     handleOnChangeTextarea = (e) =>{
         this.setState({
             data: e.target.value
         });
     }
     handleOnChangeUrl = (e) =>{
         this.setState({
             url: e.target.value
         });
         
     }
     onSubmit = (e) =>{
        e.preventDefault();
        services.get(this.state.url).then(
            (response)=>{
            console.log(response);
                if(response.data && response.data._id.length > 0){
                    this.setState({alreadyTaken: true});
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
     render() {
         return (
            <div>
                <h2 className="headers">Text-Sharer</h2>
                <form className="form">
                    <label className="url-label">URL: text-sharer.com/</label>
                    <input type="text" className="url-input" value={this.state.url} onChange={this.handleOnChangeUrl} placeholder="example" /><br></br>
                    {
                        this.state.alreadyTaken ? <div><br></br><label className="error-label">URL already taken. </label></div>: ""
                    }
                    <br></br><textarea className="textbox" value={this.state.data} onChange={this.handleOnChangeTextarea} placeholder="Copy your text here!!" ></textarea><br></br>
                    <button className="button" onClick={this.onSubmit} >Submit!</button>
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