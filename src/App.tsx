import { useRef } from "react";
import "./App.css";
import Navigation, { NavigationHandle } from "./components/Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";

// Prime React Configuration
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
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

	const navRef = useRef<NavigationHandle>(null);

	const homeRef = useRef(null);
	const aboutRef = useRef(null);
	const servicesRef = useRef(null);
	const pricingRef = useRef(null);
	const supportRef = useRef(null);
	const exploreRef = useRef(null);
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
		backgroundColor: "#ffffff",
	};
	const contactStyle = {
		backgroundColor: "#dbdddea8",
	};
	const footerStyle = {
		backgroundColor: "#064422",
		color: "#fff",
	};

	return (
		<Router>
			<div>
				<Navigation
					ref={navRef}
					onHomeClick={() => scrollToSection(homeRef)}
					onAboutClick={() => scrollToSection(aboutRef)}
					onFeaturesClick={() => scrollToSection(servicesRef)}
					onPricingClick={() => scrollToSection(pricingRef)}
					onSupportClick={() => scrollToSection(supportRef)}
					onContactClick={() => scrollToSection(contactRef)}
				/>
				<div>
					<div ref={homeRef} style={{ padding }}>
						<Home
							onGetStartedClick={() => navRef.current?.openSignup()}
							onContactClick={() => scrollToSection(contactRef)}
						/>
					</div>
					<div ref={aboutRef} style={{ ...aboutStyle, padding }}>
						<About />
					</div>
					<div ref={servicesRef}>
						<Services />
					</div>
					<div ref={exploreRef} style={{ ...contactStyle, padding }}>
						<VerticalDemo />
					</div>
					<div ref={contactRef} style={{ ...contactStyle, padding }}>
						<Contact />
					</div>
					<div style={footerStyle}>
						<Footer
							onHomeClick={() => scrollToSection(homeRef)}
							onAboutClick={() => scrollToSection(aboutRef)}
							onFeaturesClick={() => scrollToSection(servicesRef)}
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
