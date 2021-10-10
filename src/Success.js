import React from 'react';
import "./Success.css";
const Success = () => {
    return (
    <div className="card">
      <div className="divcontainer">
        <i className="checkmark">✓</i>
      </div>
        <h1 className="heading">Success</h1> 
        <p className="description">We received your data.<br/> we'll be in touch shortly!</p>
      </div>
    );
};

export default Success;