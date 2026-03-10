import { Box } from "@mui/material";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import "./footerData.css";

interface IFooterCallbacks {
  onHomeClick: () => void;
  onAboutClick: () => void;
  onFeaturesClick: () => void;
  onPricingClick: () => void;
  onContactClick: () => void;
}

const Footer: React.FC<IFooterCallbacks> = ({
  onHomeClick,
  onAboutClick,
  onFeaturesClick,
  onPricingClick,
  onContactClick,
}) => {
  const [visiblePrivacyPolicy, setVisiblePrivacyPolicy] = useState(false);
  const [visibleTermsAndConditions, setVisibleTermsAndConditions] = useState(false);
  const [smsvisibleTermsAndConditions, setSmsVisibleTermsAndConditions] = useState(false);
  const [generalTermsAndConditions, setGeneralTermsAndConditions] = useState(false);

  const closeAllDialogs = () => {
	setVisiblePrivacyPolicy(false);
	setVisibleTermsAndConditions(false);
	setSmsVisibleTermsAndConditions(false);
	setGeneralTermsAndConditions(false);
  };

  const dialogFooter = (
	<div className="bl-dialog-footer">
	  <Button
		label="Close"
		icon="pi pi-check"
		onClick={closeAllDialogs}
		className="bl-dialog-ok-btn"
		size="small"
	  />
	</div>
  );

  return (
	<>
	  {/* ═══════════════════════════════════════════
		  CTA BANNER (above footer)
	  ═══════════════════════════════════════════ */}
	  <section className="bl-footer-cta">
		<div className="bl-footer-cta-bg" />
		<div className="bl-footer-cta-inner">
		  <div className="bl-footer-cta-text">
			<h3 className="bl-footer-cta-title">
			  Ready to Move Your Freight?
			</h3>
			<p className="bl-footer-cta-subtitle">
			  Get in touch with our dispatch team — available 24/7 for quotes,
			  booking, and support.
			</p>
		  </div>
		  <div className="bl-footer-cta-actions">
			<a href="tel:6099004245" className="bl-footer-cta-btn-primary">
			  <i className="pi pi-phone" />
			  <span>Call (609) 900-4245</span>
			</a>
			<a href="mailto:Shahzaib@backuplogistics.us" className="bl-footer-cta-btn-secondary">
			  <i className="pi pi-envelope" />
			  <span>Email Us</span>
			</a>
		  </div>
		</div>
	  </section>

	  {/* ═══════════════════════════════════════════
		  FOOTER
	  ═══════════════════════════════════════════ */}
	  <footer className="bl-footer">
		<div className="bl-footer-glow" />

		<div className="bl-footer-top">
		  {/* ── Brand Column ── */}
		  <div className="bl-footer-brand">
			<a href="/" className="bl-footer-logo">
			  <div className="bl-footer-logo-icon">
				<i className="pi pi-truck" />
			  </div>
			  <div className="bl-footer-logo-text">
				Backup Logistics
				<small>Freight Solutions</small>
			  </div>
			</a>
			<p className="bl-footer-desc">
			  Reliable freight logistics and transportation services.
			  Moving your cargo with precision across the United States.
			</p>
			{/* Social Icons */}
			<div className="bl-footer-social">
			  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bl-footer-social-link" aria-label="Facebook">
				<i className="pi pi-facebook" />
			  </a>
			  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bl-footer-social-link" aria-label="Instagram">
				<i className="pi pi-instagram" />
			  </a>
			  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bl-footer-social-link" aria-label="LinkedIn">
				<i className="pi pi-linkedin" />
			  </a>
			</div>
		  </div>

		  {/* ── Sitemap Column ── */}
		  <div className="bl-footer-col">
			<h4 className="bl-footer-col-title">Sitemap</h4>
			<ul className="bl-footer-links">
			  <li><a onClick={onHomeClick}>About Us</a></li>
			  <li><a onClick={onAboutClick}>Services</a></li>
			  <li><a onClick={onFeaturesClick}>Members Portal</a></li>
			  <li><a onClick={onPricingClick}>Legal</a></li>
			  <li><a onClick={onContactClick}>Profile</a></li>
			</ul>
		  </div>

		  {/* ── Legal Column ── */}
		  <div className="bl-footer-col">
			<h4 className="bl-footer-col-title">Legal</h4>
			<ul className="bl-footer-links">
			  <li>
				<a onClick={() => setVisiblePrivacyPolicy(true)}>
				  Privacy Policy
				</a>
			  </li>
			  <li>
				<a onClick={() => setSmsVisibleTermsAndConditions(true)}>
				  SMS Terms of Service
				</a>
			  </li>
			  <li>
				<a onClick={() => setVisibleTermsAndConditions(true)}>
				  SMS Consent Language
				</a>
			  </li>
			  <li>
				<a onClick={() => setGeneralTermsAndConditions(true)}>
				  General Terms &amp; Conditions
				</a>
			  </li>
			</ul>
		  </div>

		  {/* ── Contact Column ── */}
		  <div className="bl-footer-col">
			<h4 className="bl-footer-col-title">Contact</h4>
			<a href="https://maps.google.com/?q=1617+Fannin+St+Houston+TX+77002" target="_blank" rel="noreferrer" className="bl-footer-contact-item bl-footer-contact-link">
			  <div className="bl-footer-contact-icon">
				<i className="pi pi-map-marker" />
			  </div>
			  <span>1617 Fannin St<br />Houston, TX 77002</span>
			</a>
			<a href="tel:6099004245" className="bl-footer-contact-item bl-footer-contact-link">
			  <div className="bl-footer-contact-icon">
				<i className="pi pi-phone" />
			  </div>
			  <span>(609) 900-4245</span>
			</a>
			<a href="mailto:Shahzaib@backuplogistics.us" className="bl-footer-contact-item bl-footer-contact-link">
			  <div className="bl-footer-contact-icon">
				<i className="pi pi-envelope" />
			  </div>
			  <span>Shahzaib@backuplogistics.us</span>
			</a>
		  </div>
		</div>

		{/* ── Divider ── */}
		<div className="bl-footer-divider" />

		{/* ── Bottom Bar ── */}
		<div className="bl-footer-bottom">
		  <p className="bl-footer-copy">
			&copy; {new Date().getFullYear()} Backup Logistics LLC. All rights reserved.
		  </p>
		  <div className="bl-footer-legal-links">
			<a onClick={() => setVisiblePrivacyPolicy(true)}>Privacy</a>
			<a onClick={() => setSmsVisibleTermsAndConditions(true)}>SMS Terms</a>
			<a onClick={() => setGeneralTermsAndConditions(true)}>Terms</a>
		  </div>
		</div>
	  </footer>

	  {/* ═══════════════════════════════════════════
		  DIALOG POPUPS — Dark Themed
	  ═══════════════════════════════════════════ */}

	  {/* Privacy Policy */}
	  <Dialog
		header="Privacy Policy"
		footer={dialogFooter}
		visible={visiblePrivacyPolicy}
		style={{ width: "50vw" }}
		className="bl-policy-dialog"
		onHide={() => setVisiblePrivacyPolicy(false)}
	  >
		<div className="bl-policy-content">
		  <div className="bl-policy-meta">
			<span className="bl-policy-company">Backup Logistics LLC</span>
			<span className="bl-policy-date">Effective: March 10, 2026</span>
		  </div>

		  <div className="bl-policy-section">
			<h4>1. Information We Collect</h4>
			<p>
			  Backup Logistics LLC collects the following personal information when you
			  interact with our website, contact forms, or services:
			</p>
			<p>
			  Full name and business name, email address, mobile phone number,
			  company address and location, freight and shipment details you provide,
			  and communication records (calls, texts, emails).
			</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>2. How We Use Your Information</h4>
			<p>
			  We use your information solely to provide freight logistics and transportation
			  services, including:
			</p>
			<p>
			  Dispatching and coordinating freight shipments, sending load confirmations,
			  rate confirmations, and operational updates, communicating via SMS, phone,
			  or email for dispatch purposes, processing payments and managing business
			  accounts, and complying with legal and regulatory obligations.
			</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>3. SMS / Text Message Communications</h4>
			<p>
			  If you provide your mobile phone number, you may receive SMS text messages from
			  Backup Logistics LLC related to your freight operations. These messages are
			  strictly operational and informational in nature.
			</p>
			<p className="bl-policy-highlight">
			  No mobile opt-in or text message consent will be shared with third parties
			  or affiliates.
			</p>
			<p>
			  You can opt out of SMS messages at any time by replying STOP to any message.
			  Reply HELP for support. Message and data rates may apply. Messaging frequency
			  varies based on active operations.
			</p>
			<p>
			  Visit:{" "}
			  <a href="https://backuplogistics.us/sms-terms" target="_blank" rel="noreferrer">
				backuplogistics.us/sms-terms
			  </a>
			</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>4. How We Share Your Information</h4>
			<p>
			  We do not sell, rent, or trade your personal information to third parties.
			  Your information may be shared only in the following limited circumstances:
			</p>
			<p>
			  With technology service providers (e.g., RingCentral for SMS delivery) who are
			  bound by confidentiality agreements, with carriers or shippers directly involved
			  in your freight coordination, and when required by law, court order, or
			  government regulation.
			</p>
			<p className="bl-policy-highlight">
			  We do not share your mobile opt-in data or SMS consent information with any
			  third party or affiliate for marketing purposes.
			</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>5. Data Security</h4>
			<p>
			  We take reasonable technical and organizational measures to protect your
			  personal information from unauthorized access, loss, or disclosure.
			  However, no method of transmission over the internet is 100% secure.
			</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>6. Your Rights</h4>
			<p>
			  You have the right to: request access to the personal information we hold
			  about you, request correction or deletion of your information, opt out of
			  SMS communications at any time by replying STOP, and contact us to update
			  your preferences or information.
			</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>7. Contact Us</h4>
			<p>If you have questions about this Privacy Policy or how we handle your data:</p>
			<div className="bl-policy-contact-box">
			  <p>
				<strong>Backup Logistics LLC</strong><br />
				Website:{" "}
				<a href="https://backuplogistics.us">backuplogistics.us</a><br />
				Email:{" "}
				<a href="mailto:shahzaib@backuplogistics.us">shahzaib@backuplogistics.us</a><br />
				Location: Houston, Texas, United States
			  </p>
			</div>
			<p className="bl-policy-updated">Last updated: March 10, 2026</p>
		  </div>
		</div>
	  </Dialog>

	  {/* SMS Terms of Service */}
	  <Dialog
		header="SMS Terms of Service"
		footer={dialogFooter}
		visible={smsvisibleTermsAndConditions}
		style={{ width: "55vw" }}
		className="bl-policy-dialog"
		onHide={() => setSmsVisibleTermsAndConditions(false)}
	  >
		<div className="bl-policy-content">
		  <div className="bl-policy-meta">
			<span className="bl-policy-company">Backup Logistics LLC</span>
			<span className="bl-policy-date">Effective: March 10, 2026</span>
		  </div>

		  <p>
			If you consent to receive conversational and informational SMS from
			Backup Logistics LLC, you agree to receive dispatch updates, load
			confirmations, operational alerts, and coordination messages. Reply
			STOP to opt-out; Reply HELP for support; Message and data rates may
			apply; Messaging frequency may vary.
		  </p>
		  <p>
			Visit{" "}
			<a href="https://backuplogistics.us/privacy-policy" target="_blank" rel="noreferrer">
			  backuplogistics.us/privacy-policy
			</a>{" "}
			to see our Privacy Policy.
		  </p>

		  <div className="bl-policy-section">
			<h4>1. Program Description</h4>
			<p>
			  Backup Logistics LLC sends the following types of SMS messages to carriers,
			  drivers, and business partners:
			</p>
			<p>
			  Conversational messages: Two-way dispatch coordination and load negotiations.
			  Informational messages: Load confirmations, pickup/delivery updates, rate
			  confirmations, schedule changes, and operational alerts.
			</p>
			<p>We do not send promotional or marketing SMS messages.</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>2. Consent and Opt-In</h4>
			<p>You consent to receive SMS messages from Backup Logistics LLC by:</p>
			<p>
			  Checking the SMS consent box on our website contact or onboarding form,
			  providing your phone number verbally or in writing during carrier or driver
			  onboarding, or signing a rate confirmation or carrier agreement that includes
			  your mobile number.
			</p>
			<p>Consent is not required as a condition of using our services.</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>3. Opt-Out</h4>
			<p>
			  Reply STOP to any message to unsubscribe immediately. You will receive one
			  final confirmation. No further messages will be sent to that number.
			</p>
			<p>
			  You may also opt out by emailing{" "}
			  <a href="mailto:shahzaib@backuplogistics.us">shahzaib@backuplogistics.us</a>{" "}
			  with your number and request.
			</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>4. Help</h4>
			<p>
			  Reply HELP to any message or contact us at{" "}
			  <a href="mailto:shahzaib@backuplogistics.us">shahzaib@backuplogistics.us</a>{" "}
			  for support.
			</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>5. Message Frequency &amp; Rates</h4>
			<p>
			  Message frequency varies based on your active load and dispatch activity.
			  Message and data rates may apply. Contact your wireless carrier for details.
			</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>6. Privacy</h4>
			<p className="bl-policy-highlight">
			  No mobile opt-in or text message consent will be shared with third parties
			  or affiliates.
			</p>
			<p>
			  View our full Privacy Policy at{" "}
			  <a href="https://backuplogistics.us/privacy-policy" target="_blank" rel="noreferrer">
				backuplogistics.us/privacy-policy
			  </a>
			</p>
			<p className="bl-policy-updated">Last updated: March 10, 2026</p>
		  </div>
		</div>
	  </Dialog>

	  {/* SMS Consent Language */}
	  <Dialog
		header="Website Contact Form — SMS Consent Language"
		footer={dialogFooter}
		visible={visibleTermsAndConditions}
		className="bl-policy-dialog"
		style={{ width: "60vw" }}
		onHide={() => setVisibleTermsAndConditions(false)}
	  >
		<div className="bl-policy-content">
		  <div className="bl-policy-meta">
			<span className="bl-policy-company">Backup Logistics LLC</span>
			<span className="bl-policy-date">
			  <a href="https://backuplogistics.us" target="_blank" rel="noreferrer">
				backuplogistics.us
			  </a>
			</span>
		  </div>

		  <div className="bl-policy-section">
			<h4>Checkbox Label (Next to Phone Number Field)</h4>
			<p>
			  Place an <strong>UNCHECKED checkbox</strong> next to the phone number field with this label:
			</p>
			<div className="bl-policy-code-box">
			  [ ] I consent to receive conversational and informational SMS messages from Backup Logistics LLC,
			  including dispatch updates, load confirmations, and operational alerts.
			  Reply STOP to opt-out; Reply HELP for support; Message and data rates may apply; Messaging frequency may vary.
			  View our Privacy Policy at backuplogistics.us/privacy-policy and SMS Terms at backuplogistics.us/sms-terms.
			</div>
			<p className="bl-policy-highlight">
			  IMPORTANT: The checkbox must be OPTIONAL and UNCHECKED by default. Do not pre-check it.
			</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>Website Footer Links</h4>
			<ul>
			  <li>Privacy Policy — backuplogistics.us/privacy-policy</li>
			  <li>SMS Terms of Service — backuplogistics.us/sms-terms</li>
			  <li>Terms and Conditions — backuplogistics.us/terms</li>
			</ul>
		  </div>

		  <div className="bl-policy-section">
			<h4>Pages Required on the Website</h4>
			<ul>
			  <li><strong>backuplogistics.us/privacy-policy</strong> — Upload the Privacy Policy document</li>
			  <li><strong>backuplogistics.us/sms-terms</strong> — Upload the SMS Terms of Service document</li>
			  <li><strong>backuplogistics.us/terms</strong> — Upload the General Terms and Conditions document</li>
			</ul>
		  </div>

		  <div className="bl-policy-section">
			<h4>RingCentral TCR Submission Checklist</h4>
			<p>Before submitting TCR registration, confirm the following:</p>
			<ul>
			  <li>Privacy Policy is live and publicly accessible</li>
			  <li>SMS Terms of Service page is live</li>
			  <li>Privacy Policy clearly explains what data is collected and how it is used</li>
			  <li>Privacy Policy includes: <strong>"No mobile opt-in or text message consent will be shared with third parties or affiliates."</strong></li>
			  <li>SMS Terms include STOP opt-out instructions, HELP support, message &amp; data rate notice, and a link to the privacy policy</li>
			  <li>Website contact form includes an optional, unchecked SMS consent checkbox</li>
			  <li>Privacy Policy and SMS Terms links are present in the footer of every page</li>
			</ul>
		  </div>
		</div>
	  </Dialog>

	  {/* General Terms and Conditions */}
	  <Dialog
		header="General Terms and Conditions"
		footer={dialogFooter}
		visible={generalTermsAndConditions}
		className="bl-policy-dialog"
		style={{ width: "60vw" }}
		onHide={() => setGeneralTermsAndConditions(false)}
	  >
		<div className="bl-policy-content">
		  <div className="bl-policy-meta">
			<span className="bl-policy-company">Backup Logistics LLC</span>
			<span className="bl-policy-date">Effective: March 10, 2026</span>
		  </div>

		  <div className="bl-policy-section">
			<h4>1. Acceptance of Terms</h4>
			<p>By accessing or using the website located at backuplogistics.us (the "Site") or any services provided by Backup Logistics LLC ("Company," "we," "us," or "our"), you agree to be legally bound by these Terms and Conditions ("Terms"). If you do not agree, please do not use our Site or services.</p>
			<p>These Terms apply to all visitors, clients, carriers, brokers, drivers, shippers, and any other parties who access or use our website or services.</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>2. Company Overview</h4>
			<p>Backup Logistics LLC is a licensed freight logistics and transportation company headquartered in Houston, Texas. We provide freight coordination, carrier dispatch, and transportation brokerage services across the United States.</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>3. Services Provided</h4>
			<ul>
			  <li>Freight brokerage and load matching between shippers and carriers</li>
			  <li>Carrier dispatching and fleet coordination</li>
			  <li>Load booking, scheduling, and rate confirmation</li>
			  <li>Pickup and delivery coordination and tracking updates</li>
			  <li>Carrier onboarding and compliance management</li>
			  <li>Communication and administrative support for freight operations</li>
			</ul>
			<p>We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>4. Eligibility</h4>
			<p>By using our Site or services, you represent that you are at least 18 years of age, have the legal authority to enter into a binding agreement, and are using our services for lawful business purposes only.</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>5. Use of the Website</h4>
			<p>You agree to use this Site only for lawful purposes. You must not:</p>
			<ul>
			  <li>Use the Site for any fraudulent, unlawful, or deceptive purpose</li>
			  <li>Transmit harmful, offensive, or disruptive content</li>
			  <li>Attempt unauthorized access to any part of our systems or data</li>
			  <li>Reproduce, duplicate, copy, or resell any part of the Site without written permission</li>
			  <li>Use automated tools, bots, or scrapers to collect data from the Site</li>
			  <li>Interfere with or disrupt the security or functionality of the Site</li>
			</ul>
		  </div>

		  <div className="bl-policy-section">
			<h4>6. Carrier Responsibilities</h4>
			<ul>
			  <li>Maintain all required operating authorities, licenses, permits, and insurance</li>
			  <li>Adhere to agreed pickup and delivery schedules</li>
			  <li>Communicate promptly about delays or shipment issues</li>
			  <li>Ensure proper handling and care of freight</li>
			  <li>Comply with DOT and FMCSA regulations</li>
			  <li>Not broker or re-broker loads without written consent</li>
			</ul>
		  </div>

		  <div className="bl-policy-section">
			<h4>7. Shipper / Client Responsibilities</h4>
			<ul>
			  <li>Provide accurate freight information</li>
			  <li>Ensure cargo is properly packaged and ready for pickup</li>
			  <li>Fulfill payment obligations</li>
			  <li>Notify of changes or cancellations</li>
			</ul>
		  </div>

		  <div className="bl-policy-section">
			<h4>8. Rates, Payment, and Billing</h4>
			<ul>
			  <li>All charges are outlined in rate confirmations</li>
			  <li>Payments must follow agreed terms</li>
			  <li>Late payments may result in service suspension</li>
			  <li>Rates may change due to fuel surcharges or market conditions</li>
			  <li>Disputed charges must be reported within 5 business days</li>
			</ul>
		  </div>

		  <div className="bl-policy-section">
			<h4>9. Cancellations and No-Show Policy</h4>
			<p>If a client cancels a booked load or fails to have freight ready at the scheduled time, cancellation fees or carrier costs may apply.</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>10. Limitation of Liability</h4>
			<p>Backup Logistics LLC shall not be liable for indirect or consequential damages including freight loss beyond coverage limits, delays due to weather or accidents, third-party carrier actions, or service interruptions.</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>11. Indemnification</h4>
			<p>You agree to indemnify and hold harmless Backup Logistics LLC from any claims or damages arising from your misuse of services, breach of terms, or violation of laws.</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>12. Intellectual Property</h4>
			<p>All content including text, graphics, logos, and branding is the exclusive property of Backup Logistics LLC and may not be reproduced without written consent.</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>13. Privacy Policy</h4>
			<p>Your use of this Site is also governed by our Privacy Policy.</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>14. SMS and Text Message Communications</h4>
			<p>By providing your phone number, you consent to receive operational SMS messages related to freight activity.</p>
			<p className="bl-policy-highlight">No mobile opt-in or text message consent will be shared with third parties or affiliates.</p>
			<p>Reply STOP to opt out. Reply HELP for support. Message and data rates may apply.</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>17. Governing Law</h4>
			<p>These Terms are governed by the laws of the State of Texas. Disputes shall be handled in courts located in Harris County, Texas.</p>
		  </div>

		  <div className="bl-policy-section">
			<h4>21. Contact Information</h4>
			<div className="bl-policy-contact-box">
			  <p>
				<strong>Backup Logistics LLC</strong><br />
				Website: backuplogistics.us<br />
				Email: shahzaib@backuplogistics.us<br />
				Location: Houston, Texas, United States
			  </p>
			</div>
			<p className="bl-policy-updated">Last updated: March 10, 2026</p>
		  </div>
		</div>
	  </Dialog>
	</>
  );
};

export default Footer;
