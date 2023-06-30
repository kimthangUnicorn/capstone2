import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { json, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function PayPalButton(props) {
  const navigate = useNavigate();
  const { product } = props;
  console.log(product);
  let param1 = useLocation();
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [check, setCheck] = useState(false);
  const handleApprove = (orderId) => {
    setPaidFor(true);
  };
  if (check == true) {
  }
  // console.log(check);
  if (error) {
    alert("oke", error);
  }

  return (
    <PayPalScriptProvider>
      <PayPalButtons
        style={{ layout: "horizontal" }}
        onClick={async (data, actions) => {
          const hasAlready = false;
          if (hasAlready) {
            setError("You already bough this course");
            return actions.reject();
          } else {
            return actions.resolve();
          }
        }}
        createOrder={async (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  value: product.value,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          // console.log("order", order);

          handleApprove(data.orderID);
          let formData = new FormData();
          formData.append("package_id", product.id);
          formData.append("payment_id", order.id);
          formData.append("status", order.status);
          formData.append("payer_id", order.payer.payer_id);
          formData.append("payer_email", order.payer.email_address);

          let user = JSON.parse(localStorage.getItem("user"));
          let config = {
            headers: {
              Authorization: "Bearer " + user.token,
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          };

          let pakageCurrent = null;
          await axios
            .get("http://127.0.0.1:8000/api/recruiter/payment-history", config)
            .then((res) => {
              console.log(res.data);
              const today = new Date();
              res.data.forEach((history) => {
                let startDate = new Date(history.start_date);
                let endDate = new Date(history.end_date);

                if (today >= startDate && today <= endDate) {
                  pakageCurrent = history;
                }
              });
            });

          axios
            .post(
              "http://127.0.0.1:8000/api/recruiter/payment",
              formData,
              config
            )
            .then(async (res) => {
              // console.log(res.data);
              if (param1["pathname"].includes("packageRecruiter")) {
                if (pakageCurrent) {
                  alert("Gói sẽ có hiệu lực khi gói cũ hết hạn");
                } else {
                  alert("Thanh toán thành công");
                }
                navigate("/manageJob");
              } else {
                navigate("/addJob");
              }
            });
        }}
        onCancel={() => {}}
        onError={(err) => {
          setError(err);
          // console.log("Paypal error", err);
        }}
      />
    </PayPalScriptProvider>
  );
}
export default PayPalButton;
