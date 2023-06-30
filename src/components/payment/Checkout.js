import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Logo from "../../assets/images/logo.jpg";
import { Link } from "react-router-dom";
import PayPalButton from "./PaypalCheckout";
import axios from "axios";
import "../../assets/css/package.css";

function Checkout() {
  const [swiperRef, setSwiperRef] = useState(null);
  const [packageall, setPackageall] = useState("");
  const [product, setProduct] = useState("");

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    let config = {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios.get("http://127.0.0.1:8000/api/recruiter/package",config).then((res) => {
      setPackageall(res.data);
      console.log(res.data);
    });
  }, []);
  const renPackage = () => {
    if (Object.keys(packageall).length > 0) {
      return Object.keys(packageall).map((key, item) => {
        return (
          <>
            <SwiperSlide key={item}>
              <div className="package_card" >
                <div className="card_content">
                  <div className="card_image">
                    <h1>{packageall[key]["price"]} USD</h1>
                  </div>
                  <div class="card_name">
                    <h4>{packageall[key]["package_name"]} Plan</h4>
                  </div>
                  <div className="card_title">
                    <p>{packageall[key]["package_description"]}</p>
                  </div>
                  <div className="card_time">
                    <p>{packageall[key]["exp_time"]} month</p>
                  </div>
                  <div style={{ marginTop: "15px" }}>
                    <PayPalButton
                      product={{
                        id: packageall[key]["package_id"],
                        description: packageall[key]["package_name"],
                        value: packageall[key]["price"],
                      }}
                    />
                    
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </>
        );
      });
    }
  };
  return (
    <>
      <section className="package">
        <div className="container">
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={3}
            centeredSlides={false}
            spaceBetween={20}
            pagination={{
              clickable: "true",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {renPackage()}
       
          </Swiper>
        </div>
      </section>
    </>
  );
} 
export default Checkout;
