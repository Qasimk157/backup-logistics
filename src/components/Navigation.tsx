import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import taxslipsLogo from "../images/taxslip-logo.png";
import "./navigation.css";

interface INavbarCallbacks {
  onHomeClick: () => void;
  onAboutClick: () => void;
  onFeaturesClick: () => void;
  onPricingClick: () => void;
  onSupportClick: () => void;
  onContactClick: () => void;
}

const Navigation: React.FC<INavbarCallbacks> = ({
  onHomeClick,
  onAboutClick,
  onFeaturesClick,
  onPricingClick,
  onSupportClick,
  onContactClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for navbar background change
  useEffect(() => {
	const handleScroll = () => {
	  setScrolled(window.scrollY > 30);
	};
	window.addEventListener("scroll", handleScroll, { passive: true });
	return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = (open: boolean) => {
	setDrawerOpen(open);
  };

  const navLinks = [
	{ label: "About Us", onClick: onHomeClick },
	{ label: "Services", onClick: onAboutClick },
	{ label: "Members Portal", onClick: onFeaturesClick },
	{ label: "Legal", onClick: onPricingClick },
	{ label: "Profile", onClick: onContactClick },
  ];

  /* ── Mobile Drawer ── */
  const renderMobileDrawer = (
	<Drawer
	  anchor="right"
	  open={drawerOpen}
	  onClose={() => toggleDrawer(false)}
	  PaperProps={{
		className: "bl-nav-drawer",
	  }}
	>
	  {/* Drawer Header */}
	  <Box className="bl-nav-drawer-header">
		<img
		  src={taxslipsLogo}
		  alt="Backup Logistics"
		  className="bl-nav-drawer-logo"
		/>
		<IconButton
		  onClick={() => toggleDrawer(false)}
		  className="bl-nav-drawer-close"
		>
		  <CloseIcon />
		</IconButton>
	  </Box>

	  <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

	  {/* Nav Links */}
	  <List className="bl-nav-drawer-list">
		{navLinks.map((link, index) => (
		  <ListItem
			key={index}
			button
			onClick={() => {
			  link.onClick();
			  toggleDrawer(false);
			}}
			className="bl-nav-drawer-item"
		  >
			<ListItemText
			  primary={link.label}
			  primaryTypographyProps={{
				className: "bl-nav-drawer-link-text",
			  }}
			/>
		  </ListItem>
		))}
	  </List>

	  <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

	  {/* CTA Buttons */}
	  <Box className="bl-nav-drawer-actions">
		<Link
		  to="https://backup-logistics.vercel.app/#/taxslips_v5.com/"
		  className="bl-nav-btn-login-mobile"
		  onClick={() => toggleDrawer(false)}
		>
		  Login
		</Link>
		<Link
		  to="https://backup-logistics.vercel.app/#/create-an-account"
		  className="bl-nav-btn-signup-mobile"
		  onClick={() => toggleDrawer(false)}
		>
		  Get Started
		</Link>
	  </Box>
	</Drawer>
  );

  return (
	<>
	  <AppBar
		position="fixed"
		elevation={0}
		className={`bl-navbar ${scrolled ? "bl-navbar-scrolled" : ""}`}
	  >
		<Toolbar className="bl-navbar-toolbar">
		  {/* ── Logo ── */}
		  <Box className="bl-navbar-logo-wrap" onClick={onHomeClick}>
			<img
			  src={taxslipsLogo}
			  alt="Backup Logistics"
			  className="bl-navbar-logo"
			/>
		  </Box>

		  {/* ── Desktop Nav Links ── */}
		  {!isMobile && (
			<Box className="bl-navbar-links">
			  {navLinks.map((link, index) => (
				<button
				  key={index}
				  onClick={link.onClick}
				  className="bl-navbar-link"
				>
				  {link.label}
				</button>
			  ))}
			</Box>
		  )}

		  {/* ── Desktop CTA Buttons ── */}
		  {!isMobile && (
			<Box className="bl-navbar-actions">
			  <Link
				to="https://backup-logistics.vercel.app/#/taxslips_v5.com/"
				className="bl-nav-btn-login"
			  >
				Login
			  </Link>
			  <Link
				to="https://backup-logistics.vercel.app/#/create-an-account"
				className="bl-nav-btn-signup"
			  >
				Get Started
				<i className="pi pi-arrow-right bl-nav-btn-arrow" />
			  </Link>
			</Box>
		  )}

		  {/* ── Mobile Hamburger ── */}
		  {isMobile && (
			<IconButton
			  onClick={() => toggleDrawer(true)}
			  className="bl-navbar-hamburger"
			>
			  <MenuIcon />
			</IconButton>
		  )}
		</Toolbar>
	  </AppBar>

	  {/* Mobile Drawer */}
	  {renderMobileDrawer}

	  {/* Spacer to prevent content from hiding behind fixed navbar */}
	  <div className="bl-navbar-spacer" />
	</>
  );
};

export default Navigation;
