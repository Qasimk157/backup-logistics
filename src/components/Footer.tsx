import { Box, Grid, Typography } from "@mui/material";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ListBox } from "primereact/listbox";
import React, { useState } from "react";

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

	const siteMapLinkList = [
		{ text: "About Us", link: onHomeClick },
		{ text: "Services", link: onAboutClick },
		{ text: "Members Portal", link: onFeaturesClick },
		{ text: "Legal", link: onPricingClick },
		{ text: "Profile", link: onContactClick },
	];

	const footerContent = (
		<div>
			<Button
				label="Ok"
				icon="pi pi-check"
				onClick={() => {
					setVisiblePrivacyPolicy(false);
					setVisibleTermsAndConditions(false);
					setSmsVisibleTermsAndConditions(false);
					setGeneralTermsAndConditions(false);
				}}
				// autoFocus
				size="small"
			/>
		</div>
	);

	return (
		<div className='lg:mx-8 xl:mx-8 md:xm-8 sm:mx-8 xs:mx-8' style={{margin:"0 3rem"}}>
			<Grid container sx={{justifyContent:"center"}}>
				{/* <Grid item lg={1.5} xl={1.5} md={12} sm={12} xs={12}></Grid> */}
				{/* <Grid
					item lg={3} xl={3} md={3} sm={12} xs={12}
					sx={{
						borderLeft: "1px solid rgba(255,255,255,.3)",
						padding: "0 15px 50px 15px",
					}}
				> */}
				<Grid
					size={{ lg: 3, xl: 3.8, md: 3, sm: 12, xs: 12 }}
					sx={{
						borderLeft: "1px solid rgba(255,255,255,.3)",
						padding: "0 15px 50px 15px",
					}}
					>
					<Box>
						<Typography
							variant="h2"
							sx={{
								paddingTop: "30px",
								marginBottom: "8px",
								fontSize: "2.5rem",
								fontWeight:"bold"
							}}
						>
							Connect
						</Typography>
						<Typography sx={{ paddingBottom: "16px" }} variant="body1">
							1617 fannin street Houston Tx 77002
						</Typography>
						<Typography sx={{ margin: "24px 0 16px 0" }}>
							609-900-4243
						</Typography>
						<Typography sx={{ margin: "24px 0 16px 0" }}>
							Shahzaib@backuplogistics.us
						</Typography>
					</Box>
				</Grid>
				{/* <Grid
					item lg={3} xl={3} md={3} sm={12} xs={12}
					sx={{
						borderLeft: "1px solid rgba(255,255,255,.3)",
						padding: "0 15px 50px 15px",
					}}
				> */}
				<Grid
					size={{ lg: 3, xl: 3, md: 3, sm: 12, xs: 12 }}
					sx={{
						borderLeft: "1px solid rgba(255,255,255,.3)",
						padding: "0 15px 50px 15px",
					}}
					>
					<Box>
						<Typography
							variant="h2"
							sx={{
								paddingTop: "30px",
								marginBottom: "8px",
								fontSize: "2.5rem",
								fontWeight:"bold"
							}}
						>
							Sitemap
						</Typography>
						{siteMapLinkList.map((item: any) => {
							return (
								<ul key={item.text}>
									<li
										onClick={item.link}
										style={{ cursor: "pointer" }}
										onMouseOver={(e) =>
											(e.currentTarget.style.color = "#ef8410")
										}
										onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
									>
										{item.text}
									</li>
								</ul>
							);
						})}
					</Box>
				</Grid>
				{/* <Grid
					item lg={3} xl={3} md={3} sm={12} xs={12}
					sx={{
						borderLeft: "1px solid rgba(39, 185, 51, 0.3)",
						padding: "0 15px 50px 15px",
					}}
				> */}
				<Grid
					size={{ lg: 3, xl: 3, md: 3, sm: 12, xs: 12 }}
					sx={{
						borderLeft: "1px solid rgba(39, 185, 51, 0.3)",
						padding: "0 15px 50px 15px",
					}}
					>
					<Box>
						<Typography
							variant="h2"
							sx={{
								paddingTop: "30px",
								marginBottom: "8px",
								fontSize: "2.5rem",
								fontWeight:"bold"
							}}
						>
							Legal
						</Typography>
						<Typography
  sx={{
    paddingBottom: "16px",
    cursor: "pointer",
    "&:hover": { color: "#ef8410" }
  }}
  variant="body1"
  onClick={() => setVisiblePrivacyPolicy(true)}
>
  Privacy Policy
</Typography>

<Dialog
  header="PRIVACY POLICY"
  footer={footerContent}
  visible={visiblePrivacyPolicy}
  style={{ width: "50vw" }}
  onHide={() => setVisiblePrivacyPolicy(false)}
>

<div className="policy-word">

<p><b>Backup Logistics LLC</b></p>

<p>
<b>Effective Date:</b> March 10, 2026 | 
<a href="https://backuplogistics.us" target="_blank">
 backuplogistics.us
</a>
</p>


<p className="section-title">1. Information We Collect</p>
{/* <h4>1. Information We Collect</h4> */}

<p>
Backup Logistics LLC collects the following personal information when you
interact with our website, contact forms, or services:
</p>

<p>
Full name and business name<br/>
Email address<br/>
Mobile phone number<br/>
Company address and location<br/>
Freight and shipment details you provide<br/>
Communication records (calls, texts, emails)
</p>



<p className="section-title">2. How We Use Your Information</p>

<p>
We use your information solely to provide freight logistics and transportation
services, including:
</p>

<p>
Dispatching and coordinating freight shipments<br/>
Sending load confirmations, rate confirmations, and operational updates<br/>
Communicating via SMS, phone, or email for dispatch purposes<br/>
Processing payments and managing business accounts<br/>
Complying with legal and regulatory obligations
</p>



<p className="section-title">3. SMS / Text Message Communications</p>

<p>
If you provide your mobile phone number, you may receive SMS text messages from
Backup Logistics LLC related to your freight operations. These messages are
strictly operational and informational in nature.
</p>

<p>
No mobile opt-in or text message consent will be shared with third parties
or affiliates.
</p>

<p>
You can opt out of SMS messages at any time by replying STOP to any message.
Reply HELP for support. Message and data rates may apply. Messaging frequency
varies based on active operations.
</p>

<p>
Visit:
<a href="https://backuplogistics.us/sms-terms" target="_blank">
 backuplogistics.us/sms-terms
</a>
</p>



<p className="section-title">4. How We Share Your Information</p>

<p>
We do not sell, rent, or trade your personal information to third parties.
Your information may be shared only in the following limited circumstances:
</p>

<p>
With technology service providers (e.g., RingCentral for SMS delivery) who are
bound by confidentiality agreements<br/>

With carriers or shippers directly involved in your freight coordination<br/>

When required by law, court order, or government regulation
</p>

<p>
We do not share your mobile opt-in data or SMS consent information with any
third party or affiliate for marketing purposes.
</p>



<p className="section-title">5. Data Security</p>

<p>
We take reasonable technical and organizational measures to protect your
personal information from unauthorized access, loss, or disclosure.
However, no method of transmission over the internet is 100% secure.
</p>



<p className="section-title">6. Your Rights</p>

<p>
You have the right to:
</p>

<p>
Request access to the personal information we hold about you<br/>
Request correction or deletion of your information<br/>
Opt out of SMS communications at any time by replying STOP<br/>
Contact us to update your preferences or information
</p>



<p className="section-title">7. Contact Us</p>

<p>
If you have questions about this Privacy Policy or how we handle your data:
</p>

<p>
Backup Logistics LLC<br/>

Website:
<a href="https://backuplogistics.us">
 backuplogistics.us
</a><br/>

Email:
<a href="mailto:shahzaib@backuplogistics.us">
 shahzaib@backuplogistics.us
</a><br/>

Location: Houston, Texas, United States
</p>

<p><b>Last updated:</b> March 10, 2026</p>

</div>

</Dialog>

						<Typography
							sx={{
								paddingBottom: "16px",
								cursor: "pointer",
								"&:hover": { color: "#ef8410" },
							}}
							variant="body1"
							onClick={() => setSmsVisibleTermsAndConditions(true)}
							>
							SMS Terms of Service
							</Typography>

							<Dialog
							header="SMS TERMS OF SERVICE"
							footer={footerContent}
							visible={smsvisibleTermsAndConditions}
							style={{ width: "55vw" }}
							onHide={() => setSmsVisibleTermsAndConditions(false)}
							>

							<div className="policy-word">

							<p><b>Backup Logistics LLC</b></p>

							<p>
							<b>Effective Date:</b> March 10, 2026 | 
							<a href="https://backuplogistics.us" target="_blank">
							backuplogistics.us
							</a>
							</p>

							<p>
							If you consent to receive conversational and informational SMS from
							Backup Logistics LLC, you agree to receive dispatch updates, load
							confirmations, operational alerts, and coordination messages SMS from us.
							Reply STOP to opt-out; Reply HELP for support; Message and data rates may
							apply; Messaging frequency may vary.
							</p>

							<p>
							Visit 
							<a href="https://backuplogistics.us/privacy-policy" target="_blank">
							backuplogistics.us/privacy-policy
							</a>
							to see our Privacy Policy and Terms and Conditions.
							</p>


							<p className="section-title">1. Program Description</p>

							<p>
							Backup Logistics LLC sends the following types of SMS messages to carriers,
							drivers, and business partners:
							</p>

							<p>
							Conversational messages: Two-way dispatch coordination and load negotiations<br/>
							Informational messages: Load confirmations, pickup/delivery updates, rate
							confirmations, schedule changes, and operational alerts
							</p>

							<p>
							We do not send promotional or marketing SMS messages.
							</p>


							<p className="section-title">2. Consent and Opt-In</p>

							<p>
							You consent to receive SMS messages from Backup Logistics LLC by:
							</p>

							<p>
							Checking the SMS consent box on our website contact or onboarding form<br/>
							Providing your phone number verbally or in writing during carrier or driver onboarding<br/>
							Signing a rate confirmation or carrier agreement that includes your mobile number
							</p>

							<p>
							Consent is not required as a condition of using our services.
							</p>


							<p className="section-title">3. Opt-Out</p>

							<p>
							Reply STOP to any message to unsubscribe immediately. You will receive one
							final confirmation. No further messages will be sent to that number.
							</p>

							<p>
							You may also opt out by emailing
							<a href="mailto:shahzaib@backuplogistics.us">
							shahzaib@backuplogistics.us
							</a>
							with your number and request.
							</p>


							<p className="section-title">4. Help</p>

							<p>
							Reply HELP to any message or contact us at
							<a href="mailto:shahzaib@backuplogistics.us">
							shahzaib@backuplogistics.us
							</a>
							for support.
							</p>


							<p className="section-title">5. Message Frequency & Rates</p>

							<p>
							Message frequency varies based on your active load and dispatch activity.
							Message and data rates may apply. Contact your wireless carrier for details.
							</p>


							<p className="section-title">6. Privacy</p>

							<p>
							No mobile opt-in or text message consent will be shared with third parties
							or affiliates.
							</p>

							<p>
							View our full Privacy Policy at
							<a href="https://backuplogistics.us/privacy-policy" target="_blank">
							backuplogistics.us/privacy-policy
							</a>
							</p>


							<p><b>Last updated:</b> March 10, 2026</p>

							</div>

							</Dialog>

						<Typography
							sx={{
								paddingBottom: "16px",
								cursor: "pointer",
								"&.MuiTypography-root:hover": { color: "#ef8410" },
							}}
							variant="body1"
							onClick={() => setVisibleTermsAndConditions(true)}
						>
							WEBSITE CONTACT FORM — SMS CONSENT LANGUAGE
						</Typography>
						<Dialog
							header="Website Contact Form — SMS Consent Language"
							footer={footerContent}
							visible={visibleTermsAndConditions}
							className="privacy-dialog"
							style={{ width: "60vw" }}
							onHide={() => setVisibleTermsAndConditions(false)}
						>

						<div className="policy-section">

						<p>
						<b>Backup Logistics LLC</b> | 
						<a href="https://backuplogistics.us" target="_blank">
						backuplogistics.us
						</a>
						</p>

						</div>


						<div className="policy-section">

						<h3>Checkbox Label (Next to Phone Number Field)</h3>

						<p>
						Place an <b>UNCHECKED checkbox</b> next to the phone number field with this label:
						</p>

						<div className="code-box">
						[ ] I consent to receive conversational and informational SMS messages from Backup Logistics LLC,
						including dispatch updates, load confirmations, and operational alerts.  
						Reply STOP to opt-out; Reply HELP for support; Message and data rates may apply; Messaging frequency may vary.  
						View our Privacy Policy at backuplogistics.us/privacy-policy and SMS Terms at backuplogistics.us/sms-terms.
						</div>

						<p className="important-note">
						IMPORTANT: The checkbox must be OPTIONAL and UNCHECKED by default. Do not pre-check it.
						</p>

						</div>


						<div className="policy-section">

						<h3>Website Footer Links</h3>

						{/* <p>Add the following links to the footer of every page:</p> */}

						<ul>
						<li>
						Privacy Policy — 
						<a href="https://backuplogistics.us/privacy-policy" target="_blank">
						backuplogistics.us/privacy-policy
						</a>
						</li>

						<li>
						SMS Terms of Service — 
						<a href="https://backuplogistics.us/sms-terms" target="_blank">
						backuplogistics.us/sms-terms
						</a>
						</li>

						<li>
						Terms and Conditions — 
						<a href="https://backuplogistics.us/terms" target="_blank">
						backuplogistics.us/terms
						</a>
						</li>
						</ul>

						</div>


						<div className="policy-section">

						<h3>Pages Required on the Website</h3>

						{/* <p>Your web developer must create the following pages:</p> */}

						<ul>
						<li>
						<b>backuplogistics.us/privacy-policy</b> — Upload the Privacy Policy document
						</li>

						<li>
						<b>backuplogistics.us/sms-terms</b> — Upload the SMS Terms of Service document
						</li>

						<li>
						<b>backuplogistics.us/terms</b> — Upload the General Terms and Conditions document
						</li>
						</ul>

						</div>


						<div className="policy-section">

						<h3>RingCentral TCR Submission Checklist</h3>

						<p>Before submitting TCR registration, confirm the following:</p>

						<ul>
						<li>Privacy Policy is live and publicly accessible</li>
						<li>SMS Terms of Service page is live</li>
						<li>Privacy Policy clearly explains what data is collected and how it is used</li>
						<li>
						Privacy Policy includes the statement:
						<b>
						"No mobile opt-in or text message consent will be shared with third parties or affiliates."
						</b>
						</li>
						<li>
						SMS Terms include STOP opt-out instructions, HELP support, message & data rate notice,
						and a link to the privacy policy
						</li>
						<li>
						Website contact form includes an optional, unchecked SMS consent checkbox
						</li>
						<li>
						Privacy Policy and SMS Terms links are present in the footer of every page
						</li>
						</ul>

						</div>

						</Dialog>


						<Typography
							sx={{
								paddingBottom: "16px",
								cursor: "pointer",
								"&.MuiTypography-root:hover": { color: "#ef8410" },
							}}
							variant="body1"
							onClick={() => setGeneralTermsAndConditions(true)}
						>
							General Terms and Conditions
						</Typography>

						<Dialog
							header="General Terms and Conditions"
							footer={footerContent}
							visible={generalTermsAndConditions}
							className="privacy-dialog"
							style={{ width: "60vw" }}
							onHide={() => setGeneralTermsAndConditions(false)}
						>

						<div className="policy-section">
						<p>
						<b>Backup Logistics LLC</b> | 
						<a href="https://backuplogistics.us" target="_blank">
						backuplogistics.us
						</a>
						</p>

						<p><b>Effective Date:</b> March 10, 2026</p>
						</div>


						<div className="policy-section">
						<h3>1. Acceptance of Terms</h3>
						<p>
						By accessing or using the website located at backuplogistics.us (the "Site") or any services provided by Backup Logistics LLC ("Company," "we," "us," or "our"), you agree to be legally bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our Site or services.
						</p>

						<p>
						These Terms apply to all visitors, clients, carriers, brokers, drivers, shippers, and any other parties who access or use our website or services.
						</p>
						</div>


						<div className="policy-section">
						<h3>2. Company Overview</h3>

						<p>
						Backup Logistics LLC is a licensed freight logistics and transportation company headquartered in Houston, Texas. We provide freight coordination, carrier dispatch, and transportation brokerage services to clients and carriers across the United States.
						</p>

						<p>
						Our website at backuplogistics.us serves as our primary online presence for information, contact, and business onboarding purposes.
						</p>
						</div>


						<div className="policy-section">
						<h3>3. Services Provided</h3>

						<ul>
						<li>Freight brokerage and load matching between shippers and carriers</li>
						<li>Carrier dispatching and fleet coordination</li>
						<li>Load booking, scheduling, and rate confirmation</li>
						<li>Pickup and delivery coordination and tracking updates</li>
						<li>Carrier onboarding and compliance management</li>
						<li>Communication and administrative support for freight operations</li>
						</ul>

						<p>
						We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.
						</p>
						</div>


						<div className="policy-section">
						<h3>4. Eligibility</h3>

						<p>
						By using our Site or services, you represent that you are at least 18 years of age, have the legal authority to enter into a binding agreement, and are using our services for lawful business purposes only.
						</p>
						</div>


						<div className="policy-section">
						<h3>5. Use of the Website</h3>

						<p>You agree to use this Site only for lawful purposes. You must not:</p>

						<ul>
						<li>Use the Site for any fraudulent, unlawful, or deceptive purpose</li>
						<li>Transmit harmful, offensive, or disruptive content</li>
						<li>Attempt unauthorized access to any part of our systems or data</li>
						<li>Reproduce, duplicate, copy, or resell any part of the Site without written permission</li>
						<li>Use automated tools, bots, or scrapers to collect data from the Site</li>
						<li>Interfere with or disrupt the security or functionality of the Site</li>
						</ul>

						<p>
						We reserve the right to suspend or terminate access to our Site for any user who violates these conditions.
						</p>
						</div>


						<div className="policy-section">
						<h3>6. Carrier Responsibilities</h3>

						<ul>
						<li>Maintain all required operating authorities, licenses, permits, and insurance</li>
						<li>Adhere to agreed pickup and delivery schedules</li>
						<li>Communicate promptly about delays or shipment issues</li>
						<li>Ensure proper handling and care of freight</li>
						<li>Comply with DOT and FMCSA regulations</li>
						<li>Not broker or re-broker loads without written consent</li>
						</ul>
						</div>


						<div className="policy-section">
						<h3>7. Shipper / Client Responsibilities</h3>

						<ul>
						<li>Provide accurate freight information</li>
						<li>Ensure cargo is properly packaged and ready for pickup</li>
						<li>Fulfill payment obligations</li>
						<li>Notify of changes or cancellations</li>
						</ul>
						</div>


						<div className="policy-section">
						<h3>8. Rates, Payment, and Billing</h3>

						<ul>
						<li>All charges are outlined in rate confirmations</li>
						<li>Payments must follow agreed terms</li>
						<li>Late payments may result in service suspension</li>
						<li>Rates may change due to fuel surcharges or market conditions</li>
						<li>Disputed charges must be reported within 5 business days</li>
						</ul>
						</div>


						<div className="policy-section">
						<h3>9. Cancellations and No-Show Policy</h3>

						<p>
						If a client cancels a booked load or fails to have freight ready at the scheduled time, cancellation fees or carrier costs may apply.
						</p>
						</div>


						<div className="policy-section">
						<h3>10. Limitation of Liability</h3>

						<p>
						Backup Logistics LLC shall not be liable for indirect or consequential damages including freight loss beyond coverage limits, delays due to weather or accidents, third-party carrier actions, or service interruptions.
						</p>
						</div>


						<div className="policy-section">
						<h3>11. Indemnification</h3>

						<p>
						You agree to indemnify and hold harmless Backup Logistics LLC from any claims or damages arising from your misuse of services, breach of terms, or violation of laws.
						</p>
						</div>


						<div className="policy-section">
						<h3>12. Intellectual Property</h3>

						<p>
						All content including text, graphics, logos, and branding is the exclusive property of Backup Logistics LLC and may not be reproduced without written consent.
						</p>
						</div>


						<div className="policy-section">
						<h3>13. Privacy Policy</h3>

						<p>
						Your use of this Site is also governed by our Privacy Policy available at Privacy Policy.
						{/* <a href="https://backuplogistics.us/privacy-policy" target="_blank">
						backuplogistics.us/privacy-policy
						</a> */}
						</p>
						</div>


						<div className="policy-section">
						<h3>14. SMS and Text Message Communications</h3>

						<p>
						By providing your phone number, you consent to receive operational SMS messages related to freight activity.
						</p>

						<p>
						No mobile opt-in or text message consent will be shared with third parties or affiliates.
						</p>

						<p>
						Reply STOP to opt out. Reply HELP for support. Message and data rates may apply.
						</p>
						</div>


						<div className="policy-section">
						<h3>17. Governing Law</h3>

						<p>
						These Terms are governed by the laws of the State of Texas. Disputes shall be handled in courts located in Harris County, Texas.
						</p>
						</div>


						<div className="policy-section">
						<h3>21. Contact Information</h3>

						<p>
						Backup Logistics LLC <br/>
						Website: backuplogistics.us <br/>
						Email: shahzaib@backuplogistics.us <br/>
						Location: Houston, Texas, United States
						</p>

						<p><b>Last updated:</b> March 10, 2026</p>
						</div>

						</Dialog>

					</Box>
				</Grid>
				{/* <Grid item lg={1.5} xl={1.5} md={12} sm={12} xs={12}></Grid> */}
			</Grid>
		</div>
	);
};

export default Footer;
