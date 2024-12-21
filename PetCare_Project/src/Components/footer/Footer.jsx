import React from "react";
import "../footer/footer.scss";
import footerlogo from "../../assets/Icons/ footer-logo.png"
import facebook from "../../assets/Icons/ facebook.png"
import twitter from "../../assets/Icons/ twitter.png"
import instagram from "../../assets/Icons/ instagram.png"
import youtube from "../../assets/Icons/ youtube.png"
import pinterest from "../../assets/Icons/ pinterest.png"

const Footer = () => {
  return (
    <footer>
      <div className="footer-upper-part">
        <div className="logo-part">
          <a href="#">
            <img
              src={footerlogo}
              alt="logo"
            />
          </a>
        </div>
        <div className="middle-part">
          <div className="signup-part">
            <div className="signup-text">
              <p>
                To get the latest on pet adoption and pet care, sign up for the
                PetCare newsletter.
              </p>
            </div>
            <div className="signup-button">
              <button>SIGN UP</button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-lower-part">
        <div className="social-media">
          <ul>
            <li>
              <a href="#">
                <img src={facebook} alt="facebook.com" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={twitter} alt="twitter.com" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={instagram} alt="instagram.com" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={youtube} alt="youtube.com" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={pinterest} alt="pinterest.com" />
              </a>
            </li>
          </ul>
        </div>
        <div className="brand">
          <p>©2024 PetCare.com</p>
        </div>
        <div className="rights">
          <p>
            Developed by Emil Tagiyev and Elgun Haqqverdiyev
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
