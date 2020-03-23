import React from 'react';
import I from './Icon';
import './Footer.css';
import insta from '../assets/instagram.svg'
import fb from '../assets/facebook.svg';
import git from '../assets/github.svg';
import mail from '../assets/mail.svg';

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="footerInner">
                    <ul className="socialLinks">
                        <li><a href="https://www.facebook.com/esnazerbaijan/"><I width={"20px"} src={insta} /></a></li>
                        <li><a href="https://www.facebook.com/esnazerbaijan/"><I width={"20px"} src={fb} /></a></li>
                        <li><a href="https://github.com/quarterpound/esn-shop-react"><I width={"20px"} src={git} /></a></li>
                        <li><a href="mailto:nmammadova@esn.az"><I width={"20px"} src={mail} /></a></li>
                    </ul>
                    <p className="copyright">ESN Azerbaijan Webshop is made by the <a href="https://github.com/quarterpound">webmaster</a> of ESN Azerbaijan and is an open <a href="https://github.com/quarterpound/esn-shop-react">source</a> project</p>
                </div>
            </div>
        )
    }
}

export default Footer;