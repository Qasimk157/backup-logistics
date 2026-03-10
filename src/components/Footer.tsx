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
								"&.MuiTypography-root:hover": { color: "#ef8410" },
							}}
							variant="body1"
							onClick={() => setVisiblePrivacyPolicy(true)}
						>
							Privacy Policy
						</Typography>
						<Dialog
								header="Privacy Policy"
								footer={footerContent}
								visible={visiblePrivacyPolicy}
								className="privacy-dialog"
								style={{ width: "55vw" }}
								onHide={() => setVisiblePrivacyPolicy(false)}
							>

							<div className="policy-section">
							<h3>Information We Collect</h3>

							<ul>
							<li>Full name and business name</li>
							<li>Email address</li>
							<li>Mobile phone number</li>
							<li>Company address and location</li>
							<li>Freight and shipment details you provide</li>
							<li>Communication records (calls, texts, emails)</li>
							</ul>

							<p>
							Backup Logistics LLC collects personal information when you interact with
							our website, contact forms, or services to ensure efficient freight
							logistics and communication.
							</p>
							</div>


							<div className="policy-section">
							<h3>How We Use Your Information</h3>

							<ul>
							<li>Dispatching and coordinating freight shipments</li>
							<li>Sending load confirmations and operational updates</li>
							<li>Communicating via SMS, phone, or email</li>
							<li>Processing payments and managing accounts</li>
							<li>Complying with legal and regulatory obligations</li>
							</ul>
							</div>


							<div className="policy-section">
							<h3>SMS / Text Message Communications</h3>

							<p>
							If you provide your mobile phone number, you may receive SMS messages from
							Backup Logistics LLC related to freight operations.
							</p>

							<ul>
							<li>Messages are operational and informational only</li>
							<li>No mobile opt-in data will be shared with third parties</li>
							<li>Reply <b>STOP</b> to opt out anytime</li>
							<li>Reply <b>HELP</b> for support</li>
							<li>Message and data rates may apply</li>
							</ul>

							<p>
							Visit:
							<a href="https://backuplogistics.us/sms-terms" target="_blank">
							backuplogistics.us/sms-terms
							</a>
							</p>
							</div>


							<div className="policy-section">
							<h3>How We Share Your Information</h3>

							<ul>
							<li>
							With trusted technology providers (e.g., RingCentral for SMS delivery)
							</li>
							<li>
							With carriers or shippers involved in freight coordination
							</li>
							<li>
							When required by law or regulatory authorities
							</li>
							</ul>

							<p>
							We <b>do not sell, rent, or trade</b> your personal information.
							Mobile SMS consent data is never shared with third parties for marketing.
							</p>
							</div>


							<div className="policy-section">
							<h3>Data Security</h3>

							<p>
							We implement technical and organizational safeguards to protect your
							personal information from unauthorized access, misuse, or disclosure.
							While we strive to protect your data, no internet transmission method
							is completely secure.
							</p>
							</div>


							<div className="policy-section">
							<h3>Your Rights</h3>

							<ul>
							<li>Request access to your personal data</li>
							<li>Request corrections or deletion</li>
							<li>Opt-out of SMS communications anytime</li>
							<li>Update your contact preferences</li>
							</ul>
							</div>


							<div className="policy-section contact-section">
							<h3>Contact Us</h3>

							<p>If you have questions about this Privacy Policy:</p>

							<p>
							<b>Backup Logistics LLC</b><br/>

							<a href="https://backuplogistics.us">
							backuplogistics.us
							</a>
							<br/>

							<a href="mailto:Shahzaib@backuplogistics.us">
							Shahzaib@backuplogistics.us
							</a>
							<br/>

							Houston, Texas, United States
							</p>

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

						<p className="dev-note">
						For Web Developer — Copy the following instructions exactly into the website contact or onboarding form.
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

						<p>Add the following links to the footer of every page:</p>

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

						<p>Your web developer must create the following pages:</p>

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
