import React from 'react';
import MetaTags from 'react-meta-tags';
import ESN from '../assets/AZ_colour.png'
import "./Faq.css";

class Faq extends React.Component {
    render() {
        return (
            <div>
                <MetaTags>
                    <title>FAQ | ESN Azerbaijan Webshop</title>
                    <meta name="title" content="FAQ | ESN Azerbaijan Webshop" />
                    <meta name="description" content="Want exclusive, cool ESN products and feel the wave of esners? Then you are in the right place. Where discounted prices and coolest products meet." />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://webshop.esn.az" />
                    <meta property="og:title" content="FAQ | ESN Azerbaijan Webshop" />
                    <meta property="og:description" content="Want exclusive, cool ESN products and feel the wave of esners? Then you are in the right place. Where discounted prices and coolest products meet." />
                    <meta property="og:image" content={ESN} />

                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://webshop.esn.az" />
                    <meta property="twitter:title" content="FAQ | ESN Azerbaijan Webshop" />
                    <meta property="twitter:description" content="Want exclusive, cool ESN products and feel the wave of esners? Then you are in the right place. Where discounted prices and coolest products meet." />
                    <meta property="twitter:image" content={ESN} />
                </MetaTags>
                <h2 className="pageTitle">FAQ</h2>
                <div className="qAndAFaq">
                    <p className="faqQuestion"><span className="questionInner">How can I make a payment?</span></p>
                    <p className="faqAnswer">
                        <span className="answerInner">
                            <span>Currently, the payments can only be made through electronic payment systems, such as MilliÖn. The details of the bank account will be given in the mail, which is sent after filling up the form/</span>
                            <p>If you are wondering about how to proceed with payments on MilliÖn, check the following instructions:</p>
                            <ol>
                                <li>Select the “Banking Services” section on the terminal screen and choose the name of the bank. </li>
                                <li>On the following screen, select “Bank Transfer”.</li>
                                <li>Finally, enter the details of the bank account sent to you via email and finish the payment process. And Voilà!</li>
                            </ol>
                        </span>
                    </p>
                </div>
                <div className="qAndAFaq">
                    <p className="faqQuestion"><span className="questionInner">Can I get a discount?</span></p>
                    <p className="faqAnswer"><span className="answerInner">ESN cardholders can get discount.</span></p>
                </div>
                <div className="qAndAFaq">
                    <p className="faqQuestion"><span className="questionInner">When will I get my order?</span></p>
                    <p className="faqAnswer"><span className="answerInner">It will take at least a week for the product to be delivered.</span></p>
                </div>
                <div className="qAndAFaq">
                    <p className="faqQuestion"><span className="questionInner">Where can I get my order from??</span></p>
                    <p className="faqAnswer">
                        <span className="answerInner">You have two options on how to recieve your order:</span>
                        <ol>
                            <li>Take from our office.</li>
                            <li>Get a delivery to Metro stations (28 May or Ganjlik).</li>
                        </ol>    
                    </p>
                </div>
            </div>
        )
    }
}

export default Faq;