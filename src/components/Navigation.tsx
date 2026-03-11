import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import {
  AppBar,
  Toolbar,
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
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";
import taxslipsLogo from "../images/taxslip-logo.jpeg";
import "./navigationData.css";
import { baseURL } from "../common/http-common";

// ═══════════════════════════════════════════
// Expose these methods via ref so parent can
// call navRef.current.openSignup() from anywhere
// ═══════════════════════════════════════════
export interface NavigationHandle {
  openLogin: () => void;
  openSignup: () => void;
}

interface INavbarCallbacks {
  onHomeClick: () => void;
  onAboutClick: () => void;
  onFeaturesClick: () => void;
  onPricingClick: () => void;
  onSupportClick: () => void;
  onContactClick: () => void;
}

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

interface SignupForm {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const Navigation = forwardRef<NavigationHandle, INavbarCallbacks>(
  (
	{
	  onHomeClick,
	  onAboutClick,
	  onFeaturesClick,
	  onPricingClick,
	  onSupportClick,
	  onContactClick,
	},
	ref
  ) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const toast = useRef<any>(null);

	const [drawerOpen, setDrawerOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const [showSignup, setShowSignup] = useState(false);
	const [loginLoading, setLoginLoading] = useState(false);
	const [signupLoading, setSignupLoading] = useState(false);

	const [loginForm, setLoginForm] = useState<LoginForm>({
	  email: "",
	  password: "",
	  remember: false,
	});

	const [signupForm, setSignupForm] = useState<SignupForm>({
	  fullName: "",
	  email: "",
	  phone: "",
	  company: "",
	  password: "",
	  confirmPassword: "",
	  agreeTerms: false,
	});

	const [loginErrors, setLoginErrors] = useState<FormErrors>({});
	const [signupErrors, setSignupErrors] = useState<FormErrors>({});

	// ── Expose methods to parent via ref ──
	useImperativeHandle(ref, () => ({
	  openLogin: () => setShowLogin(true),
	  openSignup: () => setShowSignup(true),
	}));

	useEffect(() => {
	  const handleScroll = () => setScrolled(window.scrollY > 30);
	  window.addEventListener("scroll", handleScroll, { passive: true });
	  return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleDrawer = (open: boolean) => setDrawerOpen(open);

	// ═══ VALIDATION ═══
	const validateEmail = (email: string): boolean =>
	  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const validateLogin = (): boolean => {
	  const errors: FormErrors = {};
	  if (!loginForm.email.trim()) errors.email = "Email is required";
	  else if (!validateEmail(loginForm.email)) errors.email = "Invalid email";
	  if (!loginForm.password) errors.password = "Password is required";
	  setLoginErrors(errors);
	  return Object.keys(errors).length === 0;
	};

	const validateSignup = (): boolean => {
	  const errors: FormErrors = {};
	  if (!signupForm.fullName.trim()) errors.fullName = "Full name is required";
	  if (!signupForm.email.trim()) errors.email = "Email is required";
	  else if (!validateEmail(signupForm.email)) errors.email = "Invalid email";
	  if (!signupForm.password) errors.password = "Password is required";
	  else if (signupForm.password.length < 8) errors.password = "Min 8 characters";
	  if (signupForm.password !== signupForm.confirmPassword)
		errors.confirmPassword = "Passwords don't match";
	  if (!signupForm.agreeTerms) errors.agreeTerms = "You must agree to terms";
	  setSignupErrors(errors);
	  return Object.keys(errors).length === 0;
	};

	// ═══ API CALLS ═══
	const handleLogin = async () => {
	  if (!validateLogin()) return;
	  setLoginLoading(true);
	  try {
		const response = await fetch(`${baseURL}/auth/login`, {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify({
			email: loginForm.email,
			password: loginForm.password,
		  }),
		});
		const data = await response.json();
		if (response.ok) {
		  if (data.access_token) {
			localStorage.setItem("token", data.access_token);
			if (loginForm.remember) localStorage.setItem("user_email", loginForm.email);
		  }
		  toast.current?.show({ severity: "success", summary: "Welcome Back!", detail: data.message || "Login successful", life: 3000 });
		  setShowLogin(false);
		  resetLoginForm();
		} else {
		  toast.current?.show({ severity: "error", summary: "Login Failed", detail: data.detail || data.message || "Invalid credentials", life: 4000 });
		}
	  } catch {
		toast.current?.show({ severity: "error", summary: "Connection Error", detail: "Unable to reach server. Please try again.", life: 4000 });
	  } finally {
		setLoginLoading(false);
	  }
	};

	const handleSignup = async () => {
	  if (!validateSignup()) return;
	  setSignupLoading(true);
	  try {
		const response = await fetch(`${baseURL}/auth/register`, {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify({
			full_name: signupForm.fullName,
			email: signupForm.email,
			phone: signupForm.phone,
			company: signupForm.company,
			password: signupForm.password,
		  }),
		});
		const data = await response.json();
		if (response.ok) {
		  toast.current?.show({ severity: "success", summary: "Account Created!", detail: data.message || "Welcome to Backup Logistics", life: 4000 });
		  setShowSignup(false);
		  resetSignupForm();
		} else {
		  toast.current?.show({ severity: "error", summary: "Registration Failed", detail: data.detail || data.message || "Something went wrong", life: 4000 });
		}
	  } catch {
		toast.current?.show({ severity: "error", summary: "Connection Error", detail: "Unable to reach server. Please try again.", life: 4000 });
	  } finally {
		setSignupLoading(false);
	  }
	};

	const resetLoginForm = () => {
	  setLoginForm({ email: "", password: "", remember: false });
	  setLoginErrors({});
	};

	const resetSignupForm = () => {
	  setSignupForm({ fullName: "", email: "", phone: "", company: "", password: "", confirmPassword: "", agreeTerms: false });
	  setSignupErrors({});
	};

	const switchToSignup = () => {
	  setShowLogin(false);
	  resetLoginForm();
	  setTimeout(() => setShowSignup(true), 200);
	};

	const switchToLogin = () => {
	  setShowSignup(false);
	  resetSignupForm();
	  setTimeout(() => setShowLogin(true), 200);
	};

	const openLoginHandler = () => { toggleDrawer(false); setShowLogin(true); };
	const openSignupHandler = () => { toggleDrawer(false); setShowSignup(true); };

	const navLinks = [
	  { label: "About Us", onClick: onHomeClick },
	  { label: "Services", onClick: onPricingClick },
	//   { label: "Members Portal", onClick: onFeaturesClick },
	//   { label: "Legal", onClick: onPricingClick },
	  { label: "Legal", onClick: onAboutClick },
	  { label: "Profile", onClick: onContactClick },
	];

	// ═══ MOBILE DRAWER ═══
	const renderMobileDrawer = (
	  <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)} PaperProps={{ className: "bl-nav-drawer" }}>
		<Box className="bl-nav-drawer-header">
		  <img src={taxslipsLogo} alt="Backup Logistics" className="bl-nav-drawer-logo" />
		  <IconButton onClick={() => toggleDrawer(false)} className="bl-nav-drawer-close"><CloseIcon /></IconButton>
		</Box>
		<Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />
		<List className="bl-nav-drawer-list">
		  {navLinks.map((link, index) => (
			<ListItem key={index} button onClick={() => { link.onClick(); toggleDrawer(false); }} className="bl-nav-drawer-item">
			  <ListItemText primary={link.label} primaryTypographyProps={{ className: "bl-nav-drawer-link-text" }} />
			</ListItem>
		  ))}
		</List>
		<Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />
		<Box className="bl-nav-drawer-actions">
		  <button className="bl-nav-btn-login-mobile" onClick={openLoginHandler}>Login</button>
		  <button className="bl-nav-btn-signup-mobile" onClick={openSignupHandler}>Get Started</button>
		</Box>
	  </Drawer>
	);

	// ═══ RENDER ═══
	return (
	  <>
		<Toast ref={toast} />

		<AppBar position="fixed" elevation={0} className={`bl-navbar ${scrolled ? "bl-navbar-scrolled" : ""}`}>
		  <Toolbar className="bl-navbar-toolbar">
			<Box className="bl-navbar-logo-wrap" onClick={onHomeClick}>
			  <img src={taxslipsLogo} alt="Backup Logistics" className="bl-navbar-logo" />
			</Box>
			{!isMobile && (
			  <Box className="bl-navbar-links">
				{navLinks.map((link, index) => (
				  <button key={index} onClick={link.onClick} className="bl-navbar-link">{link.label}</button>
				))}
			  </Box>
			)}
			{!isMobile && (
			  <Box className="bl-navbar-actions">
				<button className="bl-nav-btn-login" onClick={() => setShowLogin(true)}>Login</button>
				<button className="bl-nav-btn-signup" onClick={() => setShowSignup(true)}>
				  Get Started <i className="pi pi-arrow-right bl-nav-btn-arrow" />
				</button>
			  </Box>
			)}
			{isMobile && (
			  <IconButton onClick={() => toggleDrawer(true)} className="bl-navbar-hamburger"><MenuIcon /></IconButton>
			)}
		  </Toolbar>
		</AppBar>

		{renderMobileDrawer}
		<div className="bl-navbar-spacer" />

		{/* ═══ LOGIN DIALOG ═══ */}
		<Dialog visible={showLogin} onHide={() => { setShowLogin(false); resetLoginForm(); }} className="bl-auth-dialog" showHeader={false} modal dismissableMask style={{ width: isMobile ? "95vw" : "440px" }}>
		  <div className="bl-auth-card">
			<button className="bl-auth-close" onClick={() => { setShowLogin(false); resetLoginForm(); }}><i className="pi pi-times" /></button>
			<div className="bl-auth-header">
			  <div className="bl-auth-icon"><i className="pi pi-lock" /></div>
			  <h2 className="bl-auth-title">Welcome Back</h2>
			  <p className="bl-auth-subtitle">Sign in to your Backup Logistics account</p>
			</div>
			<div className="bl-auth-form">
			  <div className="bl-auth-field">
				<label className="bl-auth-label">Email Address</label>
				<span className="p-input-icon-left bl-auth-input-wrap">
				  <i className="pi pi-envelope" />
				  <InputText value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="you@company.com" className={`bl-auth-input ${loginErrors.email ? "p-invalid" : ""}`} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
				</span>
				{loginErrors.email && <Message severity="error" text={loginErrors.email} className="bl-auth-error" />}
			  </div>
			  <div className="bl-auth-field">
				<label className="bl-auth-label">Password</label>
				<Password value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="Enter password" className={`bl-auth-password ${loginErrors.password ? "p-invalid" : ""}`} toggleMask feedback={false} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
				{loginErrors.password && <Message severity="error" text={loginErrors.password} className="bl-auth-error" />}
			  </div>
			  <div className="bl-auth-options">
				<div className="bl-auth-remember">
				  <Checkbox inputId="remember" checked={loginForm.remember} onChange={(e) => setLoginForm({ ...loginForm, remember: e.checked ?? false })} className="bl-auth-checkbox" />
				  <label htmlFor="remember" className="bl-auth-remember-label">Remember me</label>
				</div>
				<a className="bl-auth-forgot" onClick={() => { toast.current?.show({ severity: "info", summary: "Reset Password", detail: "Contact shahzaib@backuplogistics.us", life: 5000 }); }}>Forgot password?</a>
			  </div>
			  <Button label={loginLoading ? "Signing in..." : "Sign In"} icon={loginLoading ? "pi pi-spin pi-spinner" : "pi pi-sign-in"} className="bl-auth-submit" onClick={handleLogin} loading={loginLoading} disabled={loginLoading} />
			</div>
			<div className="bl-auth-footer">
			  <p>Don't have an account? <a className="bl-auth-switch" onClick={switchToSignup}>Get Started</a></p>
			</div>
		  </div>
		</Dialog>

		{/* ═══ SIGNUP DIALOG ═══ */}
		<Dialog visible={showSignup} onHide={() => { setShowSignup(false); resetSignupForm(); }} className="bl-auth-dialog" showHeader={false} modal dismissableMask style={{ width: isMobile ? "95vw" : "500px" }}>
		  <div className="bl-auth-card">
			<button className="bl-auth-close" onClick={() => { setShowSignup(false); resetSignupForm(); }}><i className="pi pi-times" /></button>
			<div className="bl-auth-header">
			  <div className="bl-auth-icon bl-auth-icon-signup"><i className="pi pi-truck" /></div>
			  <h2 className="bl-auth-title">Get Started</h2>
			  <p className="bl-auth-subtitle">Create your Backup Logistics account</p>
			</div>
			<div className="bl-auth-form">
			  <div className="bl-auth-row">
				<div className="bl-auth-field">
				  <label className="bl-auth-label">Full Name <span className="bl-auth-req">*</span></label>
				  <span className="p-input-icon-left bl-auth-input-wrap"><i className="pi pi-user" /><InputText value={signupForm.fullName} onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })} placeholder="John Doe" className={`bl-auth-input ${signupErrors.fullName ? "p-invalid" : ""}`} /></span>
				  {signupErrors.fullName && <Message severity="error" text={signupErrors.fullName} className="bl-auth-error" />}
				</div>
				<div className="bl-auth-field">
				  <label className="bl-auth-label">Email <span className="bl-auth-req">*</span></label>
				  <span className="p-input-icon-left bl-auth-input-wrap"><i className="pi pi-envelope" /><InputText value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} placeholder="you@company.com" className={`bl-auth-input ${signupErrors.email ? "p-invalid" : ""}`} /></span>
				  {signupErrors.email && <Message severity="error" text={signupErrors.email} className="bl-auth-error" />}
				</div>
			  </div>
			  <div className="bl-auth-row">
				<div className="bl-auth-field">
				  <label className="bl-auth-label">Phone</label>
				  <span className="p-input-icon-left bl-auth-input-wrap"><i className="pi pi-phone" /><InputText value={signupForm.phone} onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })} placeholder="(555) 000-0000" className="bl-auth-input" /></span>
				</div>
				<div className="bl-auth-field">
				  <label className="bl-auth-label">Company</label>
				  <span className="p-input-icon-left bl-auth-input-wrap"><i className="pi pi-building" /><InputText value={signupForm.company} onChange={(e) => setSignupForm({ ...signupForm, company: e.target.value })} placeholder="Your company name" className="bl-auth-input" /></span>
				</div>
			  </div>
			  <div className="bl-auth-row">
				<div className="bl-auth-field">
				  <label className="bl-auth-label">Password <span className="bl-auth-req">*</span></label>
				  <Password value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} placeholder="Min 8 characters" className={`bl-auth-password ${signupErrors.password ? "p-invalid" : ""}`} toggleMask />
				  {signupErrors.password && <Message severity="error" text={signupErrors.password} className="bl-auth-error" />}
				</div>
				<div className="bl-auth-field">
				  <label className="bl-auth-label">Confirm Password <span className="bl-auth-req">*</span></label>
				  <Password value={signupForm.confirmPassword} onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })} placeholder="Confirm password" className={`bl-auth-password ${signupErrors.confirmPassword ? "p-invalid" : ""}`} toggleMask feedback={false} />
				  {signupErrors.confirmPassword && <Message severity="error" text={signupErrors.confirmPassword} className="bl-auth-error" />}
				</div>
			  </div>
			  <div className="bl-auth-terms">
				<Checkbox inputId="agreeTerms" checked={signupForm.agreeTerms} onChange={(e) => setSignupForm({ ...signupForm, agreeTerms: e.checked ?? false })} className="bl-auth-checkbox" />
				<label htmlFor="agreeTerms" className="bl-auth-terms-label">I agree to the <a href="/terms" target="_blank" className="bl-auth-terms-link">Terms & Conditions</a> and <a href="/privacy" target="_blank" className="bl-auth-terms-link">Privacy Policy</a></label>
			  </div>
			  {signupErrors.agreeTerms && <Message severity="error" text={signupErrors.agreeTerms} className="bl-auth-error" />}
			  <Button label={signupLoading ? "Creating Account..." : "Create Account"} icon={signupLoading ? "pi pi-spin pi-spinner" : "pi pi-user-plus"} className="bl-auth-submit" onClick={handleSignup} loading={signupLoading} disabled={signupLoading} />
			</div>
			<div className="bl-auth-footer">
			  <p>Already have an account? <a className="bl-auth-switch" onClick={switchToLogin}>Sign In</a></p>
			</div>
		  </div>
		</Dialog>
	  </>
	);
  }
);

Navigation.displayName = "Navigation";

export default Navigation;
