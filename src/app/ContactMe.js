import react, { Component } from 'react';
class ContactMe extends Component{
    render(){
        return (
        <div className="contact-me">
            <div className="fcf-body">

                <div id="fcf-form">
                <h3 className="fcf-h3">Contact us</h3>

                <form id="fcf-form-id" className="fcf-form-class" method="post" action="https://formsubmit.co/gadasusreekar@gmail.com">
                    
                    <div class="fcf-form-group">
                        <label for="Name" className="fcf-label">Your name</label>
                        <div className="fcf-input-group">
                            <input type="text" id="Name" name="Name" className="fcf-form-control" required></input>
                        </div>
                    </div>

                    <div className="fcf-form-group">
                        <label for="Email" className="fcf-label">Your email address</label>
                        <div className="fcf-input-group">
                            <input type="email" id="Email" name="Email" className="fcf-form-control" required></input>
                        </div>
                    </div>

                    <div className="fcf-form-group">
                        <label for="Message" className="fcf-label">Your message</label>
                        <div className="fcf-input-group">
                            <textarea id="Message" name="Message" className="fcf-form-control" rows="6" maxlength="3000" required></textarea>
                        </div>
                    </div>

                    <div className="fcf-form-group">
                        <button type="submit" id="fcf-button" className="fcf-btn fcf-btn-primary fcf-btn-lg fcf-btn-block">Send Message</button>
                    </div>

                </form>
                </div>

            </div>
        </div>
        );
    }
}

export default ContactMe;