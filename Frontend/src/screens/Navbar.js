import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faAddressBook, faEnvelope, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import boldFont from "../screens/fonts/bold.ttf";
import lightFont from "../screens/fonts/light.ttf";

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      background: "linear-gradient(90deg, #FF7A01, #FF9901)",
      color: "white",
      borderRadius: "15px",
      margin: "10px",
      fontFamily: "BoldFont, sans-serif",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
    },
    navTitle: {
      margin: "0",
      fontSize: "1.5rem",
      color: "white",
      fontFamily: "BoldFont, sans-serif",
    },
    blackText: {
      color: "#181818",
      fontSize: "2rem",
    },
    navLinks: {
      listStyle: "none",
      display: "flex",
      margin: "0",
      padding: "0",
    },
    navItem: {
      marginLeft: "20px",
      fontSize: "1.1rem",
      position: "relative",
    },
    navLink: {
      textDecoration: "none",
      fontSize: "1.3rem",
      color: "white",
      transition: "color 0.3s, transform 0.3s",
      fontFamily: "lightFont, sans-serif",
      position: "relative",
    },
    navLinkHover: {
      color: "black",
      transform: "scale(1.1)",
    },
    menuIcon: {
      cursor: "pointer",
      fontSize: "1.5rem",
    },
    mobileMenu: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(90deg, #FF7A01, #FF9901)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    mobileMenuItem: {
      margin: "20px 0",
      fontSize: "1.5rem",
    },
    closeIcon: {
      position: "absolute",
      top: "20px",
      right: "20px",
      cursor: "pointer",
      fontSize: "1.5rem",
    },
  };

  const fontStyles = `
    @font-face {
      font-family: 'BoldFont';
      src: url(${boldFont}) format('truetype');
      font-weight: bold;
      font-style: normal;
    }

    @font-face {
      font-family: 'lightFont';
      src: url(${lightFont}) format('truetype');
      font-weight: normal;
      font-style: normal;
    }
  `;

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLinks = ({ mobile = false }) => (
    <>
      <li
        style={mobile ? styles.mobileMenuItem : styles.navItem}
        onMouseEnter={() => handleMouseEnter("home")}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to="/"
          style={{
            ...styles.navLink,
            ...(hoveredItem === "home" && styles.navLinkHover),
          }}
          onClick={() => mobile && toggleMenu()}
        >
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
      </li>
      <li
        style={mobile ? styles.mobileMenuItem : styles.navItem}
        onMouseEnter={() => handleMouseEnter("about")}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to="/about"
          style={{
            ...styles.navLink,
            ...(hoveredItem === "about" && styles.navLinkHover),
          }}
          onClick={() => mobile && toggleMenu()}
        >
          <FontAwesomeIcon icon={faAddressBook} /> About
        </Link>
      </li>
      <li
        style={mobile ? styles.mobileMenuItem : styles.navItem}
        onMouseEnter={() => handleMouseEnter("contact")}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to="/contact"
          style={{
            ...styles.navLink,
            ...(hoveredItem === "contact" && styles.navLinkHover),
          }}
          onClick={() => mobile && toggleMenu()}
        >
          <FontAwesomeIcon icon={faEnvelope} /> Contact
        </Link>
      </li>
    </>
  );

  return (
    <>
      <style>{fontStyles}</style>
      <nav style={styles.navbar}>
        <div style={styles.logoContainer}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 style={styles.navTitle}>
              PDF<span style={styles.blackText}>2</span>Quiz
            </h1>
          </Link>
        </div>
        {isMobile ? (
          <div style={styles.menuIcon} onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        ) : (
          <ul style={styles.navLinks}>
            <NavLinks />
          </ul>
        )}
      </nav>
      {isMobile && isMenuOpen && (
        <div style={styles.mobileMenu}>
          <div style={styles.closeIcon} onClick={toggleMenu}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <ul style={{ ...styles.navLinks, flexDirection: "column" }}>
            <NavLinks mobile />
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;