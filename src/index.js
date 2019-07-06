import React from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <div>
        <Favicon url='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAADpElEQVR4nO3avU5UQRiH8Wks1MbEwi9gxhvQBiUSEkxsbCyMtZfgDVhi1MJaDczsbiQaDDSWVkaMIvGDaDRAo6I0WsycXQMWaLI2kqwCuxjOOXPOvs+b/PsH5gchYZXqcLriT/W5cE27MGNcWDIuNFmht6RteKZtuNrjGic7ve+WZ6rJsLbhfQG+ILazvTHVxsC2H75nsrlbu3CvAOEsxWmX2M4/9bXEaOfnY8eyrBCEOVNbObjp4x8ebe4x1i/EjmQZI7DhtRpt7toAQFs/FTuO5YTAhVt/P/5Ycj52FMt5rX8YGhe+RA9iuU67MPfn8f3Z2DEszo5WkuNKu3AzdgiLM23DZWVseBs7hEWa9Q+Vsf5b9BAWaX5RxY9gsaatXwWA8AFA+AAgfAAQPgAIHwCEDwDCBwDhA4DwAUD4ACB8ABA+AAhf6gCml9eaRb6R56ulbH/59ScA0jgAAKCU7QBI6QAAgFK2AyClAwAAStkOgJQOAAAoZTsAUjoAAKCU7QBI6QAAgFK2iwBwZfZH88xUPdMdG09K2T44Ue9+AJcerWTyRUpoB4DwdgAIbweA8HYACG8HgPB2AAhvB4DwdgAIbweA8HYACG8HgPB2AAhvB4DwdgAIbweA8HYACG8HgPD2rgAw7381p5fXUl//3a0/BpZWe1Y3dD+bj4IVEkBWt91vYpnbAdDmAACArm8HQJsDAAC6vh0AbQ4AAOj6dgC0OQAAoOvbAdDmAACArm8HQJvLA0Ds/2N0BYDY/1ErczsAhLcDQHg7AIS3A0B4OwCEtwNAeDsAhLcDQHg7AIS3A0B4OwCEtwNAeDsAhLcDQHg7AIS3A0B4OwCEtwNAeDsAIrdn9ZnA1p2eTP8DogBIqT2PO/egAQAAAAAAAAAAAAAAgCK153EAAAAAAAAAAAAAAAAAAACK1J7HlQIAK9cAIHwAED4ACB8AhA8AwgcA4QOA8AFA+AAgfAAQPgAIHwCETxkXlmJHsDjTLnxQ2oWnsUNYpNnwWBkbrkcPYVGmrR9RfZUwFDuExVnvWOOEUkopbcPH2DEs32nn59X69bnkYuwgljOASv2Caj1tw6vYUSy3Tat/78id7/uNDZ8LEMcynV80tWTfBgBKKWVqidEuvIsfyTKZ9S/06OqhTR9//Q6MN/caFyaix7KUHz/cbvvwG34bVJNhY/1C9HC2w/lZU20M/Nfjt54e84PahRvahRn+RijFPhkbnmjrR3or9f5O7/sbUwXkGMWSBzcAAAAASUVORK5CYII=' />
        <App />
    </div>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
