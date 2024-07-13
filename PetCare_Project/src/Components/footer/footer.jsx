import React from "react";
import "../../Styles/css/footer.css";

const Footer = () => {
  return (
    <footer>
      <div class="footer-upper-part">
        <div class="logo-part">
          <a href="#">
            <img src="../ assets/ footer-logo.png" alt="logo" />
          </a>
        </div>
        <div class="middle-part">
          <div class="signup-part">
            <div class="signup-text">
              <p>
                To get the latest on pet adoption and pet care, sign up for the
                PetCare newsletter.
              </p>
            </div>
            <div class="signup-button">
              <button>SIGN UP</button>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-lower-part">
        <div class="social-media">
          <ul>
            <li>
              <a href="#">
                <img src="../ assets/ facebook.png" alt="facebook.com" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../ assets/ twitter.png" alt="facebook.com" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../ assets/ instagram.png" alt="facebook.com" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../ assets/ youtube.png" alt="facebook.com" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../ assets/ pinterest.png" alt="facebook.com" />
              </a>
            </li>
          </ul>
        </div>
        <div class="brand">
          <p>©2024 PetCare.com</p>
        </div>
        <div class="rights">
          <p>
            All trademarks are owned by Société des Produits Nestlé S.A., or
            used with permission.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
