import React from "react";
import foot from "./Footer.module.css";
import { FaFacebook, FaPinterest, FaDribbble } from "react-icons/fa";
function Footer() {
  return (
    <div className={foot.footercontainer}>
      <div className={foot.foote}>
        <footer className={foot.footer}>
          <div className={foot.lfooter}>
            <h1>E-Store</h1>
            <p className={foot.lfooterp}>
              E-store first made waves in Pakistan’s e-commerce market. Our
              vision is to provide a safe, efficient online marketplace platform
              for vendors and customers across the country to come together.
              E-Store prides itself on not being just another ecommerce venture
              in Asia. We work tirelessly to make sure that we provide users
              with the best online online shopping experience and value for
              their purchases.
            </p>
            <div className={foot.socials}>
              <a href="#" className={foot.socialsa}>
                <i className={foot.socialsai}>
                  <FaFacebook></FaFacebook>
                </i>
              </a>
              <a href="#" className={foot.socialsa}>
                <i className={foot.socialsai}>
                  <FaPinterest></FaPinterest>
                </i>{" "}
              </a>
              <a href="#" className={foot.socialsa}>
                <i className={foot.socialsai}>
                  <FaDribbble></FaDribbble>
                </i>{" "}
              </a>
            </div>
          </div>
          <ul className={foot.rfooter}>
            <li className={foot.socials2}>
              <h2>Social</h2>
              <ul className={foot.box}>
                <a href="#" className={foot.boxa}>
                  <FaFacebook></FaFacebook>
                </a>
                <a href="#" className={foot.boxa}>
                  <FaPinterest></FaPinterest>{" "}
                </a>
                <a href="#" className={foot.boxa}>
                  <FaDribbble></FaDribbble>{" "}
                </a>
              </ul>
            </li>
            <li className={foot.features}>
              <h2>Information</h2>
              <ul className={foot.hbox}>
                <li>
                  <a href="#" className={foot.boxa}>
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className={foot.boxa}>
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className={foot.boxa}>
                    Sales
                  </a>
                </li>
              </ul>
            </li>
            <li className={foot.privacy}>
              <h2>Legal</h2>
              <ul className={foot.ybox}>
                <li>
                  <a href="#" className={foot.boxa}>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className={foot.boxa}>
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className={foot.boxa}>
                    Contract
                  </a>
                </li>
              </ul>
            </li>
            <li className={foot.system}>
              <h2>System</h2>
              <ul className={foot.ybox}>
                <li>
                  <a href="#" className={foot.boxa}>
                    System Information
                  </a>
                </li>
                <li>
                  <a href="#" className={foot.boxa}>
                    System Help
                  </a>
                </li>
                <li>
                  <a href="#" className={foot.boxa}>
                    System Admin
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div className={foot.bfooter}>
            <p>All rights reserved by ©E-Store 2020 </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;