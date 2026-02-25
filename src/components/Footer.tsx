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
							Ewing, New Jersey, United States
						</Typography>
						<Typography sx={{ margin: "24px 0 16px 0" }}>
							(+92) 304-9253256
						</Typography>
						<Typography sx={{ margin: "24px 0 16px 0" }}>
							qasimkhanneng@gmail.com
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
							style={{ width: "50vw" }}
							onHide={() => setVisiblePrivacyPolicy(false)}
						>
							<h4>Privacy Policy</h4>
							<p>
								This privacy statement describes how Hatchbox Inc collects and
								uses the personal information you provide on our Web site:{" "}
								<a href="https://v3.taxslips.com/" style={{ textDecoration: "none" }}>
									{" "}
									v3.taxslips.com. 
									{" "}
								</a>
								It also describes the choices available to you regarding our use
								of your personal information and how you can access and update
								this information.
							</p>
							<h4>Collection and Use of Personal Information</h4>
							<p>Collection and Use of Personal Information</p>
							<ul>
								<li>
									Contact Information such as name, email address, mailing
									address, phone number
								</li>
								<li>
									Financial Information such as bank or brokerage account
									numbers, types of investments
								</li>
								<li>Social Security Number</li>
								<li>
									Unique Identifiers such as user name, account number, password
								</li>
							</ul>
							<p>We also collect the following information from you</p>
							<ul>
								<li>
									Information about your business such as company name, company
									size, business type
								</li>
								<li>
									Demographic information such as age, education, gender,
									interests and zip code
								</li>
							</ul>
							<p>
								As is true of most Web sites, we automatically gather
								information about your computer such as your IP address, browser
								type, referring/exit pages, and operating system.
							</p>
							<br />
							<p>We use this information to</p>
							<ul>
								<li>Respond to customer service requests</li>
								<li>Send you a newsletter</li>
								<li>Send you marketing communications</li>
								<li>Improve our Web site and marketing efforts</li>
								<li>Conduct research and analysis</li>
							</ul>
							<h5>Conduct research and analysis</h5>
							<p>
								You may choose to stop receiving our newsletter or marketing
								emails by following the unsubscribe instructions included in
								these emails or you can contact us at{" "}
								<a
									href="mailto:hello@taxslips.com"
									style={{ textDecoration: "none" }}
								>
									hello@taxslips.com
								</a>{" "}
								.
							</p>
							<h5>Information Sharing</h5>
							<p>
								We will share your personal information with third parties only
								in the ways that are described in this privacy statement. We do
								not sell your personal information to third parties.
							</p>
							<br />
							<p>We may also disclose your personal information</p>
							<ul>
								<li>
									as required by law such as to comply with a subpoena, or
									similar legal process
								</li>
								<li>
									when we believe in good faith that disclosure is necessary to
									protect our rights, protect your safety or the safety of
									others, investigate fraud, or respond to a government request,
								</li>
								<li>
									if Hatchbox Inc. is involved in a merger, acquisition, or sale
									of all or a portion of its assets, you will be notified via
									email and/or a prominent notice on our Web site of any change
									in ownership or uses of your personal information, as well as
									any choices you may have regarding your personal information,
								</li>
								<li>
									to any other third party with your prior consent to do so.
								</li>
							</ul>
							<h4>Cookies and Other Tracking Technologies</h4>
							<p>
								We may use cookies, for example, to keep track of your
								preferences and profile information. Cookies are also used to
								collect general usage and volume statistical information that
								does not include personal information.
							</p>
							<i>Web beacons</i>
							<p>
								Our Web pages contain electronic images known as Web beacons
								(sometimes called single-pixel gifs) and are used along with
								cookies to compile aggregated statistics to analyze how our site
								is used and may be used in some of our emails to let us know
								which emails and links have been opened by recipients. This
								allows us to gauge the effectiveness of our customer
								communications and marketing campaigns.
							</p>
							<p>
								We use a third party to gather information about how you and
								others use our Web site. For example, we will know how many
								users access a specific page and which links they clicked on. We
								use this aggregated information to understand and optimize how
								our site is used.
							</p>
							<i>Links to Other Web Sites</i>
							<p>
								The security of your personal information is important to us.
								When you enter sensitive information (such as credit card
								number) on our order forms, we encrypt the transmission of that
								information using secure socket layer technology (SSL).
							</p>
							<p>
								We follow generally accepted industry standards to protect the
								personal information submitted to us, both during transmission
								and once we receive it. No method of transmission over the
								Internet, or method of electronic storage, is 100% secure,
								however. Therefore, we cannot guarantee its absolute security.
							</p>
							<p>
								We will retain your information for as long as your account is
								active or as needed to provide you services. If you wish to
								cancel your account or request that we no longer use your
								information to provide you services contact us at{" "}
								<a
									href="mailto:hello@taxslips.com"
									style={{ textDecoration: "none" }}
								>
									hello@taxslips.com
								</a>
								.
							</p>
							<p>
								We will retain and use your information as necessary to comply
								with our legal obligations, resolve disputes, and enforce our
								agreements.
							</p>
							<p>
								If you have any questions about security on our Web site, you
								can contact us at{" "}
								<a
									href="mailto:hello@taxslips.com"
									style={{ textDecoration: "none" }}
								>
									hello@taxslips.com
								</a>
								.
							</p>
							<h4>Additional Policy Information</h4>
							<p>
								Our Web site offers publicly accessible blogs or community
								forums. You should be aware that any information you provide in
								these areas may be read, collected, and used by others who
								access them.
							</p>
							<h5>Correcting and Updating Your Personal Information</h5>
							<p>
								To review and update your personal information to ensure it is
								accurate, contact us at{" "}
								<a
									href="mailto:hello@taxslips.com"
									style={{ textDecoration: "none" }}
								>
									hello@taxslips.com
								</a>
								.
							</p>
							<h5>Notification of Privacy Statement Changes</h5>
							<p>
								We may update this privacy statement to reflect changes to our
								information practices. If we make any material changes we will
								notify you by email (sent to the e-mail address specified in
								your account) or by means of a notice on this Site prior to the
								change becoming effective.We encourage you to periodically
								review this page for the latest information on our privacy
								practices.
							</p>
							<h4>Contact Information</h4>
							<p>
								You can contact us about this privacy statement by writing or
								email us at the address below:
							</p>
							<p>Hatchbox Inc.</p>
							<p>1550 South Gateway Rd. Suite 229</p>
							<p>Mississauga, ON, CanadaL4W 5G6</p>
							<p>
								Email:{" "}
								<a
									href="mailto:hello@taxslips.com"
									style={{ textDecoration: "none" }}
								>
									hello@taxslips.com
								</a>
							</p>
							<p>Phone: (905) 624-9559</p>
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
							Terms & Conditions
						</Typography>
						<Dialog
							header="Terms & Conditions"
							footer={footerContent}
							visible={visibleTermsAndConditions}
							style={{ width: "50vw" }}
							onHide={() => setVisibleTermsAndConditions(false)}
						>
							<h4>
								YOUR RIGHTS AND RESPONSIBILITIES ARE DETERMINED BY THE
								FOLLOWING. IT IS VERY IMPORTANT THAT YOU READ, UNDERSTAND AND
								AGREE TO THESE TERMS AND CONDITIONS.
							</h4>
							<p>
								These Terms and Conditions are entered into between TaxSlips and
								you and the entity you are authorized to represent ("you"), and
								you accept them by acknowledging agreement with these Terms and
								Conditions. You represent that you are able to legally enter
								into this agreement and that if you are using this Site on
								behalf of your employer, you represent and warrant that you are
								authorized to accept these Terms and Conditions on your
								employer's behalf, and that your employer agrees to indemnify
								you and TaxSlips for violations of these Terms and Conditions.
								YOU MUST CONSENT TO THESE TERMS AND CONDITIONS TO ACCESS AND/OR
								USE THIS SITE AND/OR THE SERVICES PROVIDED.
							</p>
							<p>
								You acknowledge having read, understood and agreed to the
								following:
							</p>
							<li>General Disclaimers and Limitations of Liability</li>
							<ul style={{ listStyle: "lower-alpha", padding: "inherit" }}>
								<li>
									{" "}
									TaxSlips attempts to ensure that all information provided
									and/or services rendered, whether on this website or
									otherwise, is accurate, complete and timely. All information
									provided and/or services rendered by TaxSlips is provided on
									an “as is” and “as available” basis with no guarantee of
									completeness, accuracy, timeliness and without warranty or
									representation of any kind, either express or implied,
									including, but not limited to, a warranty that the information
									and/or services provided are fit for any particular purpose.
									Any reliance upon the information provided by TaxSlips is
									solely at the user’s own risk.
								</li>
								<li>
									{" "}
									TaxSlips shall not be liable for system failures or
									interruptions affecting the TaxSlips website, or any errors or
									omissions, or for the results obtained from using this
									website. In no event shall TaxSlips, our related partnerships
									or corporations, or the partners, directors, officers, agents
									or employees of TaxSlips be liable for any decision made or
									action taken in reliance upon the information contained on the
									website or conveyed to you by TaxSlips, including but not
									limited to any direct, indirect, special, incidental,
									consequential or punitive damages whatsoever and however
									caused, arising out of or in connection with the use of the
									information or services provided or as a result of reliance
									upon the information or services provided, including any lost
									profits, or any other pecuniary loss, whether such action is
									in contract, tort, statutorily or otherwise, even if advised
									of the possibility of such damages.
								</li>
								<li>
									{" "}
									You agree that any legal action brought by you as against
									TaxSlips shall be brought within one (1) year of the
									occurrence of the damage, and no later.
								</li>
								<li>
									{" "}
									In the event that a court does find TaxSlips liable to you in
									any way whatsoever, you agree that the extent of such
									liability will be limited to an aggregate of two (2) percent
									of the amount remitted by you to TaxSlips in the last calendar
									year, or $50,000.00, both including legal fees, whichever is
									less.
								</li>
								<li>
									{" "}
									You agree that these limitations and conditions are an
									informed voluntary allocation of responsibility, which
									constitutes a material aspect of this agreement.
								</li>
							</ul>
							<h5>Intellectual Property</h5>
							<li>
								All of the content of the TaxSlips website, the design and
								layout of the website and any material e-mailed to you or
								otherwise supplied to you by TaxSlips is the copyright property
								of TaxSlips. You may not reproduce or publicize this information
								in any way whatsoever except in accordance with these Terms and
								Conditions without the express prior written permission of
								TaxSlips.
							</li>
							<ul style={{ listStyle: "lower-alpha", padding: "inherit" }}>
								<li>
									TaxSlips gives you a personal, revocable, worldwide,
									royalty-free, non-assignable and non-exclusive licence to use
									the software provided to you by TaxSlips through this website.
									This licence is for the sole purpose of enabling you to use
									and enjoy the benefit of the services as provided by TaxSlips,
									in the manner permitted by these Terms and Conditions.
								</li>
								<li>
									You may not (and you may not permit anyone else to) copy,
									modify, create a derivative work of, reverse engineer,
									decompile or otherwise attempt to extract the source code of
									the software or any part thereof, unless this is expressly
									permitted or required by law, or unless you have the express
									prior written permission of TaxSlips. You may not assign (or
									grant a sub-licence of) your rights to use the software, grant
									a security interest in or over your rights to use the
									software, or otherwise transfer any part of your rights to use
									the software without the prior written permission of TaxSlips.
								</li>
								<li>
									All of the trademarks and trade names reproduced on the
									TaxSlips website are the property of TaxSlips or used under
									licence. You may not use or reproduce or allow anyone to use,
									publicize or reproduce any trade mark(s), logo(s) or trade
									name(s) appearing on the TaxSlips website for any reason
									whatsoever except in accordance with these Terms and
									Conditions without the prior written permission of TaxSlips.
								</li>
								<li>
									You agree not to infringe, or attempt to, aid or facilitate
									the infringement the copyright, trademark or any other
									intellectual property right of TaxSlips.
								</li>
								<li>
									TaxSlips gives you a personal, revocable, worldwide,
									royalty-free, non-assignable and non-exclusive licence to use
									the TaxSlips trademark, trade name and logo for the sole
									purpose of enabling you to identify the services as provided
									by TaxSlips, in the manner permitted by these Terms and
									Conditions. You are required to identify all work-product
									derived from the use of this site and service by the use of
									the TaxSlips logo as posted on the homepage of the TaxSlips
									website. All benefit from the use of the trademark, trade name
									and logo shall accrue solely to the benefit of TaxSlips.
								</li>
								<li>
									TaxSlips gives you a personal, revocable, worldwide,
									royalty-free, non-assignable and non-exclusive licence to use
									the TaxSlips trademark, trade name and logo for the sole
									purpose of enabling you to identify the services as provided
									by TaxSlips, in the manner permitted by these Terms and
									Conditions. You are required to identify all work-product
									derived from the use of this site and service by the use of
									the TaxSlips logo as posted on the homepage of the TaxSlips
									website. All benefit from the use of the trademark, trade name
									and logo shall accrue solely to the benefit of TaxSlips.
								</li>
							</ul>
							<h5>Use of Content</h5>
							<li>
								You may view, retrieve and display the content of the TaxSlips
								website on your computer screen or make a print-out of the
								content on paper exclusively for your use in the normal course
								of business. For the purpose of this agreement, activities in
								the “normal course of business” shall mean those usual and
								reasonable activities which automate your tax slips filing
								processes including the completion and printing of tax slips
								forms and XML files. Any other use is expressly prohibited
								without the prior written consent of taxslips.ca.
							</li>
							<ul style={{ listStyle: "lower-alpha", padding: "inherit" }}>
								<li>
									You may not reproduce, disseminate, publicize, modify or in
									any commercial or non-commercial way exploit any of the
									content provided by TaxSlips or allow such content to be
									available to others except in the normal course of business.
									It is prohibited for you, without the prior written consent of
									TaxSlips, to cause the information provided by TaxSlips to be
									reproduced or publicized, in any form whatsoever, or to be
									transmitted to any website, newsgroup, listserve, mailing
									list, electronic bulletin board, electronic bulletin or to
									make the information provided by TaxSlips available to any
									other person or organization except in the normal course of
									business. You also may not modify or create derivative works
									of the information provided by Who2beton.
								</li>
							</ul>
							<h5>Your Conduct</h5>
							<li>
								you will not use or access the Site or Services in a manner not
								expressly permitted by TaxSlips, including using the Site to:
							</li>
							<p>
								Engage or attempt to engage identity theft or identity fraud.
							</p>
							<p>
								Forge headers or otherwise manipulate identifiers (including
								URLs) in order to disguise the origin of any information or
								data.
							</p>
							<p>Misrepresent your affiliation with a person or entity.</p>
							<p>
								Act in any manner that is intended, designed or does negatively
								affect other users' ability to access or use the Site.
							</p>
							<p>Engage or attempt to engage in illegal activities.</p>
							<p>
								Collect or store personal data about other users unless
								specifically authorized by such users.
							</p>
							<ul style={{ listStyle: "lower-alpha", padding: "inherit" }}>
								<li>
									{" "}
									you will not use any automated inquiry device, bot, or
									repetitive data gathering and extraction tool, routine, script
									or other mechanism with similar functionality to access, use,
									monitor or copy any pages or content of the Site or TaxSlips’s
									servers or to interfere or attempt to interfere with the
									proper working of the Site by TaxSlips or other users.
								</li>
								<li>
									you will not frame or utilize framing techniques to enclose
									any portion or aspect of the Site, without TaxSlips's express
									written consent.
								</li>
							</ul>

							<h5>Term, Termination and Access to Information</h5>
							<p>
								Your access to the TaxSlips website and service is for no
								definite set term. You can terminate your access to TaxSlips at
								any time. Your access is at the sole discretion of TaxSlips and
								such discretion may be exercised unreasonably to terminate or
								suspend your access to all or part of the TaxSlips website with
								or without cause. These rights of termination are in addition to
								all other rights or remedies provided in these Terms &
								Conditions or by law. If any violation of these Terms and
								Conditions or law is, or is likely to, on a balance of
								probabilities, occur, TaxSlips shall have the right to terminate
								your access and trace your account, and you agree that any and
								all of your computer information and internet usage shall be
								made available to TaxSlips, and you will make best efforts to
								ensure that your service provider complies with these terms and
								consent to the disclosure of all records in your possession,
								care and/or control.
							</p>
							<h5>Site Alteration</h5>
							<p>
								TaxSlips reserves the right to modify, add or remove all or
								portions of the information, functionality or layout of the
								website at any time in its sole discretion and/or to restrict
								the use and accessibility of the TaxSlips website. The site is
								provided on an “as-is”, “when available” basis.
							</p>
							<h5>Registration and Passwords</h5>
							<li>
								{" "}
								All persons accessing the password restricted areas of the
								TaxSlips website must be registered with accurate, valid and
								complete registration information and immediately inform
								TaxSlips of any changes thereto. You acknowledge that your
								password and username belong to you and that you will not share
								such information with any other person or organization or make
								such information otherwise available to anyone other than you.
								You are responsible for ensuring that your username and password
								are secure and remain confidential. You, and not TaxSlips, are
								responsible for any access to and/or use of the site gained
								through the use of your username and password. You are
								responsible for ensuring that the information contained on the
								website or otherwise conveyed to you remains confidential and
								that the use of and access to the TaxSlips website and
								information is made in accordance with these Terms and
								Conditions. You have sole responsibility for the adequate
								protection and backup of data and/or equipment used in
								connection with the Site.
							</li>
							<ul style={{ listStyle: "lower-alpha", padding: "inherit" }}>
								<li>
									You agree to immediately notify TaxSlips if you become aware
									of any loss, theft, unauthorized use of or disclosure of any
									username, password or of any Proprietary Information or other
									intellectual property belonging to TaxSlips.
								</li>
								<li>
									You acknowledge that TaxSlips may be monitoring and tracking
									the use of the TaxSlips website, including your personal usage
									and habits.
								</li>
							</ul>
							<h5>Injunctive Relief</h5>
							<p>
								You agree that TaxSlips has a material interest in preserving
								its’ Proprietary Information and intellectual property rights
								and in controlling the use of the information upon its’ website
								and that the restrictions contained in clauses 2, 3, 4 and 7
								above, among others, are reasonably required for the protection
								of the rights and property of TaxSlips. You agree that the
								violation or attempted violation of such terms will lead to an
								irreparable loss to TaxSlips and that in such an event an
								injunction or other like remedy shall be the only effective
								method to protect the rights and property of TaxSlips and that
								an interim injunction may be granted prior to or upon the
								commencement of any suit.
							</p>
						</Dialog>
					</Box>
				</Grid>
				{/* <Grid item lg={1.5} xl={1.5} md={12} sm={12} xs={12}></Grid> */}
			</Grid>
		</div>
	);
};

export default Footer;
