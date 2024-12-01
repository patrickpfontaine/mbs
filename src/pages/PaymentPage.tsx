import React, { useState } from "react";
import { styled } from "@mui/material/styles";

const PaymentContainer = styled("div")({
  background: `linear-gradient(180deg, rgb(74, 50, 209) 0%, black 100%)`,
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
  justifyContent: `center`,
  minHeight: `100vh`,
  padding: `20px`,
  color: `white`,
});

const WhiteCanvas = styled("div")({
  backgroundColor: `white`,
  borderRadius: `20px`,
  padding: `40px`,
  width: `100%`,
  maxWidth: `500px`,
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
  boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.3)`,
});

const PaymentOption = styled("button")({
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "rgba(74, 50, 209, 1)",
  color: "white",
  cursor: "pointer",
  marginBottom: "10px",
  width: "100%",
  "&:hover": {
    backgroundColor: "rgba(74, 50, 209, 0.8)",
  },
});

const Input = styled("input")({
  width: "100%",
  padding: "10px",
  marginBottom: "20px",
  borderRadius: "5px",
  border: "1px solid #ccc",
});

const SectionTitle = styled("h3")({
  color: "rgb(74, 50, 209)",
  fontFamily: "Montserrat, sans-serif",
  marginBottom: "10px",
});

const PaymentPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paypalEmail: "",
  });

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = () => {
    alert(`Payment successful using ${paymentMethod}`);
  };

  return (
    <PaymentContainer>
      <WhiteCanvas>
        <h2>Select Payment Method</h2>
        <PaymentOption onClick={() => setPaymentMethod("PayPal")}>
          Pay with PayPal
        </PaymentOption>
        <PaymentOption onClick={() => setPaymentMethod("Credit Card")}>
          Pay with Credit Card
        </PaymentOption>
        <PaymentOption onClick={() => setPaymentMethod("Debit Card")}>
          Pay with Debit Card
        </PaymentOption>
        {paymentMethod && (
          <>
            <SectionTitle>Billing Information</SectionTitle>
            <Input
              name="name"
              value={billingInfo.name}
              onChange={handleBillingChange}
              placeholder="Full Name"
              required
            />
            <Input
              name="address"
              value={billingInfo.address}
              onChange={handleBillingChange}
              placeholder="Address"
              required
            />
            <Input
              name="city"
              value={billingInfo.city}
              onChange={handleBillingChange}
              placeholder="City"
              required
            />
            <Input
              name="state"
              value={billingInfo.state}
              onChange={handleBillingChange}
              placeholder="State"
              required
            />
            <Input
              name="zip"
              value={billingInfo.zip}
              onChange={handleBillingChange}
              placeholder="ZIP Code"
              required
            />

            {paymentMethod === "PayPal" && (
              <>
                <SectionTitle>PayPal Information</SectionTitle>
                <Input
                  name="paypalEmail"
                  value={paymentInfo.paypalEmail}
                  onChange={handlePaymentChange}
                  placeholder="PayPal Email"
                  required
                />
              </>
            )}

            {(paymentMethod === "Credit Card" ||
              paymentMethod === "Debit Card") && (
              <>
                <SectionTitle>{paymentMethod} Information</SectionTitle>
                <Input
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                  placeholder="Card Number"
                  required
                />
                <Input
                  name="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={handlePaymentChange}
                  placeholder="Expiry Date (MM/YY)"
                  required
                />
                <Input
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentChange}
                  placeholder="CVV"
                  required
                />
              </>
            )}

            <PaymentOption onClick={handlePayment}>
              Submit Payment
            </PaymentOption>
          </>
        )}
      </WhiteCanvas>
    </PaymentContainer>
  );
};

export default PaymentPage;