import React, { useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Support from "./components/Support";
import Contact from "./components/Contact";
import aboutusBackground from "../src/images/about-background.png";

// Prime REact Configeration add import files here
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; //flex
import Footer from "./components/Footer";
import { useMediaQuery, useTheme } from "@mui/material";
import VerticalDemo from "./components/ExploreJourney";

function App() {
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
	const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));
	const isLargeScreen = useMediaQuery(theme.breakpoints.down("xl"));
	const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
	const padding = isExtraSmallScreen ? '1rem' : isSmallScreen ? '8rem' : isMediumScreen ? "3rem" : isLargeScreen ? "4rem" : '1.5rem 200px';

	
	const aboutRef = useRef(null);
	const homeRef = useRef(null);
	const featuresRef = useRef(null);
	const pricingRef = useRef(null);
	const supportRef = useRef(null);
	const contactRef = useRef(null);

	const scrollToSection = (ref: any) => {
		if (ref.current) {
			const elementTop = ref.current.getBoundingClientRect().top + window.scrollY;
			const offset = 64;
		
			window.scroll({
			  top: elementTop - offset,
			  behavior: 'smooth',
			});
		  }
	};
	const aboutStyle = {
		backgroundImage: `url(${aboutusBackground})`,
		// paddingTop: "35px",
	};
	const featureStyle = {
		backgroundColor: "#f6f9fc",
		// paddingTop: "35px",
	};
	const pricingStyle = {
		backgroundImage:
			"linear-gradient(to bottom right, rgb(0 87 219 / 74%), #28b7b3)",
		// paddingTop: "35px",
	};
	const contactStyle = {
		backgroundColor: "#dbdddea8",
		// paddingTop: "35px",
	};
	const footerStyle = {
		backgroundColor: "#064422",
		color: "#fff",
	};
	return (
		<Router>
			<div>
				<Navigation
					onHomeClick={() => scrollToSection(homeRef)}
					onAboutClick={() => scrollToSection(aboutRef)}
					onFeaturesClick={() => scrollToSection(featuresRef)}
					onPricingClick={() => scrollToSection(pricingRef)}
					onSupportClick={() => scrollToSection(supportRef)}
					onContactClick={() => scrollToSection(contactRef)}
				/>
				<div>
					<div ref={homeRef} style={{padding}}>
						<Home />
					</div>
					<div ref={aboutRef} style={{...aboutStyle,padding}}>
						<About />
					</div>
					{/* <div ref={featuresRef} style={{...featureStyle,padding}}>
						<Features />
					</div> */}
					{/* <div ref={pricingRef} style={{...pricingStyle,padding}}>
						<Pricing />
					</div> */}
					<div ref={contactRef} style={{...contactStyle,padding}}>
						<VerticalDemo />
					</div>
					<div ref={contactRef} style={{...contactStyle,padding}}>
						<Contact />
					</div>
					<div style={footerStyle}>
					<Footer 
						onHomeClick={() => scrollToSection(homeRef)}
						onAboutClick={() => scrollToSection(aboutRef)}
						onFeaturesClick={() => scrollToSection(featuresRef)}
						onPricingClick={() => scrollToSection(pricingRef)}
						onContactClick={() => scrollToSection(contactRef)}
						/>
					</div>
				</div>
			</div>
		</Router>
	);
}

export default App;
