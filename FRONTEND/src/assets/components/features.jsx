import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import React from "react";
const Features = () => {
  const cards = [
    {
      head: "24x7 Customer Service",
      subPara: "A question? Please contact us at 123-456-7890",
      icon: React.createElement(SupportAgentOutlinedIcon, {
        style: {
            fontSize: "2rem"
        }
      }),
    },
    {
      head: "Secure Paymment",
      subPara: "Your payment information is processed securely",
      icon: React.createElement(ShieldOutlinedIcon, {
        style: {
            fontSize: "2rem"
        }
      }),
    },
    {
      head: "Return Policy",
      subPara: "We offer a 30 day return policy",
      icon: React.createElement(UndoOutlinedIcon, {
        style: {
            fontSize: "2rem"
        }
      }),
    },
    {
      head: "Free Shipping",
      subPara: "Get free shipping on orders above 999",
      icon: React.createElement(LocalShippingOutlinedIcon, {
        style: {
            fontSize: "2rem"
        }
      }),
    },
  ];
  return (
    <article className="flex gap-0 items-baseline px-20 py-5">
      {cards.map((card, i) => (
        <div key={i} className="w-[40rem] py-3 px-3">
          <div className="flex items-center gap-2 text-xl">
            <div>{card.icon}</div>
            <h1>{card.head}</h1>
          </div>
          <p>{card.subPara}</p>
        </div>
      ))}
    </article>
  );
};

export default Features;
