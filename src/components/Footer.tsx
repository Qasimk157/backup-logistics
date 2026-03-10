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
	const [visibleTermsAndConditions, setVisibleTermsAndConditions] =
		useState(false);

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
  style={{ width: "55vw" }}
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
								"&.MuiTypography-root:hover": { color: "#ef8410" },
							}}
							variant="body1"
							onClick={() => setVisibleTermsAndConditions(true)}
						>
							SMS Terms of Service
						</Typography>
						<Dialog
							header="SMS Terms of Service"
							footer={footerContent}
							visible={visibleTermsAndConditions}
							className="privacy-dialog"
							style={{ width: "55vw" }}
							onHide={() => setVisibleTermsAndConditions(false)}
						>

						<div className="policy-section">

						<h3>Backup Logistics LLC</h3>

						<p>
						<b>Effective Date:</b> March 9, 2026 <br/>
						<a href="https://backuplogistics.us" target="_blank">
						backuplogistics.us
						</a>
						</p>

						<p>
						If you consent to receive conversational and informational SMS from
						Backup Logistics LLC, you agree to receive dispatch updates,
						load confirmations, operational alerts, and coordination messages.
						</p>

						<ul>
						<li>Reply <b>STOP</b> to opt-out</li>
						<li>Reply <b>HELP</b> for support</li>
						<li>Message and data rates may apply</li>
						<li>Messaging frequency may vary</li>
						</ul>

						<p>
						Visit our policy:
						<a href="https://backuplogistics.us/privacy-policy" target="_blank">
						backuplogistics.us/privacy-policy
						</a>
						</p>

						</div>


						<div className="policy-section">

						<h3>Program Description</h3>

						<p>
						Backup Logistics LLC sends the following types of SMS messages to
						carriers, drivers, and business partners:
						</p>

						<ul>
						<li>
						<b>Conversational messages:</b> Two-way dispatch coordination and
						load negotiations
						</li>

						<li>
						<b>Informational messages:</b> Load confirmations, pickup/delivery
						updates, rate confirmations, schedule changes, and operational alerts
						</li>
						</ul>

						<p>
						We do <b>not send promotional or marketing SMS messages.</b>
						</p>

						</div>


						<div className="policy-section">

						<h3>Consent and Opt-In</h3>

						<p>You consent to receive SMS messages from Backup Logistics LLC by:</p>

						<ul>
						<li>Checking the SMS consent box on our website contact form</li>
						<li>Providing your phone number during carrier or driver onboarding</li>
						<li>Signing a rate confirmation or carrier agreement</li>
						</ul>

						<p>
						Consent is not required as a condition of using our services.
						</p>

						</div>


						<div className="policy-section">

						<h3>Opt-Out</h3>

						<p>
						Reply <b>STOP</b> to any message to unsubscribe immediately.
						You will receive one final confirmation message and no further
						messages will be sent.
						</p>

						<p>
						You may also opt out by emailing:
						</p>

						<a href="mailto:Shahzaib@backuplogistics.us">
						Shahzaib@backuplogistics.us
						</a>

						</div>


						<div className="policy-section">

						<h3>Help</h3>

						<p>
						Reply <b>HELP</b> to any message or contact us at:
						</p>

						<a href="mailto:Shahzaib@backuplogistics.us">
						Shahzaib@backuplogistics.us
						</a>

						</div>


						<div className="policy-section">

						<h3>Message Frequency & Rates</h3>

						<p>
						Message frequency varies depending on your active loads
						and dispatch activity.
						</p>

						<p>
						Message and data rates may apply. Please contact your
						wireless carrier for details.
						</p>

						</div>


						<div className="policy-section">

						<h3>Privacy</h3>

						<p>
						No mobile opt-in or SMS consent data will be shared with
						third parties or affiliates.
						</p>

						<p>
						View our Privacy Policy:
						</p>

						<a href="https://backuplogistics.us/privacy-policy" target="_blank">
						backuplogistics.us/privacy-policy
						</a>

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
					</Box>
				</Grid>
				{/* <Grid item lg={1.5} xl={1.5} md={12} sm={12} xs={12}></Grid> */}
			</Grid>
		</div>
	);
};

export default Footer;
