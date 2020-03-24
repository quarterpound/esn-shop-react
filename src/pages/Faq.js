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
                <div className="qAndAFaq">
                    <p className="faqQuestion"><span className="questionInner">Question 1</span></p>
                    <p className="faqAnswer"><span className="answerInner">Pariatur mollit proident exercitation laborum duis eiusmod laboris officia id labore. Do eiusmod aliquip in laboris. Fugiat tempor labore non id elit laborum laborum occaecat. Reprehenderit elit ut fugiat mollit velit voluptate reprehenderit officia deserunt officia est excepteur cillum. Aliquip labore consequat irure ex mollit ad esse pariatur qui excepteur eiusmod ea ipsum sint. Minim esse sit Lorem enim eu tempor ad commodo ut deserunt. Eiusmod elit commodo tempor labore ex ullamco ullamco deserunt fugiat voluptate reprehenderit pariatur deserunt.</span></p>
                </div>
                <div className="qAndAFaq">
                    <p className="faqQuestion"><span className="questionInner">Question 2</span></p>
                    <p className="faqAnswer"><span className="answerInner">Pariatur mollit proident exercitation laborum duis eiusmod laboris officia id labore. Do eiusmod aliquip in laboris. Fugiat tempor labore non id elit laborum laborum occaecat. Reprehenderit elit ut fugiat mollit velit voluptate reprehenderit officia deserunt officia est excepteur cillum. Aliquip labore consequat irure ex mollit ad esse pariatur qui excepteur eiusmod ea ipsum sint. Minim esse sit Lorem enim eu tempor ad commodo ut deserunt. Eiusmod elit commodo tempor labore ex ullamco ullamco deserunt fugiat voluptate reprehenderit pariatur deserunt.</span></p>
                </div>
                <div className="qAndAFaq">
                    <p className="faqQuestion"><span className="questionInner">Question 3</span></p>
                    <p className="faqAnswer"><span className="answerInner">Pariatur mollit proident exercitation laborum duis eiusmod laboris officia id labore. Do eiusmod aliquip in laboris. Fugiat tempor labore non id elit laborum laborum occaecat. Reprehenderit elit ut fugiat mollit velit voluptate reprehenderit officia deserunt officia est excepteur cillum. Aliquip labore consequat irure ex mollit ad esse pariatur qui excepteur eiusmod ea ipsum sint. Minim esse sit Lorem enim eu tempor ad commodo ut deserunt. Eiusmod elit commodo tempor labore ex ullamco ullamco deserunt fugiat voluptate reprehenderit pariatur deserunt.</span></p>
                </div>
            </div>
        )
    }
}

export default Faq;