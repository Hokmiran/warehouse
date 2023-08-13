import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import LogoCode from "../../assets/logocode.jpg";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      <section className="container hero">
        <div className="hero-image">
          <img src={LogoCode} alt="Inventory" />
          <div className="button-container">
            <ShowOnLogout>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </ShowOnLogout>
            <ShowOnLogin>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </ShowOnLogin>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
