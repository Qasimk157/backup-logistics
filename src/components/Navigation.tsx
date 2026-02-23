import React, { useState } from "react";
import {
	AppBar,
	Toolbar,
	Button,
	Typography,
	Container,
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
import taxslipsLogo from "../images/taxslip-logo.png"

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
	// const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
	// const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	// const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
	// const isMediumScreen = useMediaQuery(theme.breakpoints.between(1195, 1660));
	// const margin = isSmallScreen ? 'auto' : isLargeScreen ? "0 235px 0 227px" : isExtraLargeScreen ? "0 235px 0 227px" : 'auto';

	const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
	const isMediumScreen1 = useMediaQuery(theme.breakpoints.between(1195, 1550));
	const isMediumScreen2 = useMediaQuery(theme.breakpoints.between(1550, 1660));

	let margin;

	if (isSmallScreen) {
		margin = 'auto';
	} else if (isMediumScreen2) {
		margin = '0 220px'; 
	} else if (isMediumScreen1) {
		margin = 'auto'; 
	} else if (isLargeScreen || isExtraLargeScreen) {
		margin = '0 235px 0 227px';
	} else {
		margin = 'auto';
	}

	
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = (open: boolean) => {
		setDrawerOpen(open);
	};

	const onSupportButtonClick = () => {
		// Open the link in a new tab
		window.open("https://help.taxslips.ca/portal/en/home", "_blank");
	};

	const navLinks = [
		{ label: "About Us", onClick: onHomeClick },
		{ label: "Services", onClick: onAboutClick },
		{ label: "Members Portal", onClick: onFeaturesClick },
		{ label: "Legal", onClick: onPricingClick },
		// { label: "Support", onClick: onSupportButtonClick },
		{ label: "Profile", onClick: onContactClick },
	];

	const renderMobileMenu = (
		<Drawer
			anchor="right"
			open={drawerOpen}
			onClose={() => toggleDrawer(false)}
		>
			<List>
				{navLinks.map((link, index) => (
					<div key={index}>
						<ListItem
							button
							onClick={() => {
								link.onClick();
								toggleDrawer(false);
							}}
						>
							<ListItemText primary={link.label} />
						</ListItem>
						{index < navLinks.length - 1 && <Divider />}
					</div>
				))}
				<Divider />
				<Box sx={{ margin: "15px 30px" }}>
					<Button variant="contained" sx={{ marginRight: "10px",  backgroundColor: "#15803d", // dark green

                "&:hover": {

                  backgroundColor: "#166534", // darker on hover

                }, }}>
						<Link
							to="https://appv3.taxslips.com/#/taxslips_v5.com/"
							style={{ color: "#fff", textDecoration: "none" }}
						>
							Login
						</Link>
					</Button>
					<Button variant="contained">
						<Link
							to="https://appv3.taxslips.com/#/create-an-account"
							style={{ color: "#fff", textDecoration: "none" }}
						>
							Sign Up
						</Link>
					</Button>
				</Box>
			</List>
		</Drawer>
	);

	return (
		<AppBar
			position="sticky"
			style={{ top: 0, backgroundColor: "#fff", zIndex: 1000 }}
		>
			<Container sx={{margin:margin,minWidth:"-webkit-fill-available"}}>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, display:"flex", alignItems:"center" }}>
						<img
							src={taxslipsLogo}
							alt="Logo"
							style={{ marginRight: '10px', height: '80px', width: 'auto' }}
							/>
					</Typography>
					{/* Display menu icon for small screens */}
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => toggleDrawer(true)}
						sx={{ display: { md: "none" }, color:"#000" }}
					>
						<MenuIcon />
					</IconButton>
					{/* Display regular navigation for medium and larger screens */}
					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						{navLinks.map((link, index) => (
							<Button key={index} color="inherit" onClick={link.onClick} sx={{color:"rgba(0,0,0,.5)","&.MuiButton-root:hover":{color:"#000"}}}>
								{link.label}
							</Button>
						))}
						<Box sx={{ margin: "0 0 0 4rem" }}>
							<Button
								// color="inherit"
								variant="contained"
								sx={{ marginRight: "10px",  backgroundColor: "#15803d", // dark green
								"&:hover": {
                  					backgroundColor: "#166534", // darker on hover
                					}, }}
							>
								<Link
									to="https://appv3.taxslips.com/#/taxslips_v5.com/"
									style={{ color: "#fff", textDecoration: "none" }}
								>
									Login
								</Link>
							</Button>
							<Button variant="contained"
							sx={{ marginRight: "10px",  backgroundColor: "#15803d", // dark green
								"&:hover": {
                  					backgroundColor: "#166534", // darker on hover
                					}, }}
									>
								<Link
									to="https://appv3.taxslips.com/#/create-an-account"
									style={{ color: "#fff", textDecoration: "none" }}
								>
									Sign Up
								</Link>
							</Button>
						</Box>
					</Box>
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						{renderMobileMenu}
					</Box>
					{/* <Button color="inherit" onClick={() => onHomeClick()}>
            Home
          </Button>
          <Button color="inherit" onClick={() => onAboutClick()}>
            About
          </Button>
          <Button color="inherit" onClick={() => onFeaturesClick()}>
            Features
          </Button>
          <Button color="inherit" onClick={() => onPricingClick()}>
            Pricing
          </Button>
          <Button color="inherit"><Link to="https://help.taxslips.ca/portal/en/home" target='_blank' style={{color:"#fff",textDecoration:"none"}} >Support</Link></Button>
          <Button color="inherit" onClick={() => onContactClick()}>
            Contact
          </Button>
          <Box sx={{margin:"0 4rem"}}>

          <Button color="inherit" variant="outlined" sx={{marginRight:"10px"}}><Link to="https://appv3.taxslips.com/#/taxslips_v5.com/" target='_blank' style={{color:"#fff",textDecoration:"none"}} >Login</Link></Button>
          <Button color="inherit" variant="outlined"><Link to="https://appv3.taxslips.com/#/create-an-account" target='_blank' style={{color:"#fff",textDecoration:"none"}}>Sign Up</Link></Button>
          </Box> */}
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navigation;
