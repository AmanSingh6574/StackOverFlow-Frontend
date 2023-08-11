import React, { useEffect, useState } from "react";

function CardDescription({ title, description }) {
  return (
    <div className="card-description">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function CardBilling({ price }) {
  return (
    <div className="card-billing">
      <p>
        <strong style={{ fontSize: '24px', fontWeight: 'bold' }}>₹ {price}</strong>
        <strong style={{ fontSize: '16px' }}> / mo.</strong>
      </p>
      <p>
        <span style={{ fontSize: '14px' }}>
          Billed ₹{price}/monthly
        </span>
      </p>
    </div>
  );
}

function CardFeatures({ data }) {
  return (
    <div className="card-features">
      <ul>
        {data.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

function CardAction(props) {
  const KEY =
    "pk_test_51NauKcSAuUWZahbIRf5RrAfO7COscTDQyWGbIehzuIXUeBEDDxD8iHASGmlakSzOL6ABeqDj40XlKanbb3nbRkhx00dTjZX2xc";
  return (
    props.type === "basic" ? (
      <stripe-buy-button
        buy-button-id="buy_btn_1NauZaSAuUWZahbIIjuq8rHK"
        publishable-key={KEY} 
      >
        Buy Basic Plan
      </stripe-buy-button>
    ) : (
      <stripe-buy-button
        buy-button-id="buy_btn_1NaubGSAuUWZahbIa2cqJttV"
        publishable-key={KEY}

      >
        Buy Medium Plan
      </stripe-buy-button>
    )
  );
}

function PricingCard(props) {
  const { type, title, description, price, mostPopular, data } = props;

  return (
    <div className={`card pricing-card ${type}`}>
      {mostPopular ? <span className="most-popular">Most Popular</span> : null}
      <CardDescription title={title} description={description} />
      <CardBilling price={price} />
      <CardFeatures data={data} />
      <CardAction type={type} description={description} price={price} />
    </div>
  );
}

export default PricingCard;
