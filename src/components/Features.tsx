import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import icloud from "../images/features/icloud.png";
import electronicfiling from "../images/features/electronicfiling.png";
import paperfiling from "../images/features/paperfiling.png";
import automated from "../images/features/automated.png";
import singleclick from "../images/features/singleclick.png";
import eyeonchange from "../images/features/eyeonchange.png";
import highlysecure from "../images/features/highlysecure.png";
import dataimport from "../images/features/dataimport.png";

const featureList = [
	{
		icon: icloud,
		title: "Cloud Based Software",
		desc: "TaxSlips is cloud based Canadian software which takes the stress out of filing your taxslips.",
	},
	{
		icon: electronicfiling,
		title: "Electronic Filing",
		desc: "TaxSlips offers Electronic filing for T4, T4A and RL-1.",
	},
	{
		icon: paperfiling,
		title: "Paper Filing",
		desc: "TaxSlips offers Paper filing for T4, T4A and RL-1.",
	},
	{
		icon: automated,
		title: "Automated PIER",
		desc: "TaxSlips provides you automated PIER.",
	},
	// {icon:singleclick,title:"Single Click",desc:"One Click to Adjust/Unadjust Slips Individually/Bulk."},
	// {icon:eyeonchange,title:"Eye on Change Log",desc:"TaxSlips Keeps Record of Complete Change log of Data with Timestamp."},
	// {icon:highlysecure,title:"Highly Secure",desc:"TaxSlips gives security features like Sensitive Data Masking."},
	// {icon:dataimport,title:"Data Import",desc:"TaxSlips gives you Data Import Options in XML and CSV formats."},
];
const featureListSecondRow = [
	{
		icon: singleclick,
		title: "Single Click",
		desc: "One Click to Adjust/Unadjust Slips Individually/Bulk.",
	},
	{
		icon: eyeonchange,
		title: "Eye on Change Log",
		desc: "TaxSlips Keeps Record of Complete Change log of Data with Timestamp.",
	},
	{
		icon: highlysecure,
		title: "Highly Secure",
		desc: "TaxSlips gives security features like Sensitive Data Masking.",
	},
	{
		icon: dataimport,
		title: "Data Import",
		desc: "TaxSlips gives you Data Import Options in XML and CSV formats.",
	},
];
const individualStep = {
	// display:"flex",
	// flexDirection:"column",
	margin: 0,
	maxWidth: "330px",
	alignItems: "center",
	padding: "10px",
	textAlign: "center",
};
const Features = () => {
	return (
		// <div
		// 	className="lg:mx-8 xl:mx-8 md:xm-8 sm:mx-8 xs:mx-8"
		// 	style={{ margin: "0 3rem" }}
		// >
		<div>
			<h1 style={{ fontWeight: "bold", textAlign: "center" }}>
				TaxSlips Features
			</h1>
			<Typography
				sx={{ textAlign: "center", paddingBottom: "0.5rem", color: "#797979" }}
			>
				Here is a detail description of what does TaxSlips do.
			</Typography>
			<Grid
				container
				sx={{ paddingTop: "1.5rem!important", justifyContent: "center" }}
			>
				{/* <Grid item lg={1} xl={1} md={1} sm={4} xs={2}></Grid> */}
				{/* <Grid item lg={3} xl={3} md={6} sm={12} xs={12}> */}
				{featureList.map((item: any, index: any) => {
					return (
						// <Grid
						// 	item
						// 	lg={3}
						// 	xl={3}
						// 	md={5}
						// 	sm={12}
						// 	xs={12}
						// 	sx={{
						// 		...individualStep,
						// 		"&.MuiGrid-root:hover": {
						// 			bgcolor: "#f6f9fc",
						// 			borderRadius: "5px",
						// 			boxShadow: "0 0 35px -2px rgb(0 0 0 / 20%)",
						// 			transition: "box-shadow .3s",
						// 		},
						// 	}}
						// 	key={index}
						// >
						<Grid
							size={{ lg: 3, xl: 3, md: 5, sm: 12, xs: 12 }}
							sx={{
								...individualStep,
								"&.MuiGrid-root:hover": {
								bgcolor: "#f6f9fc",
								borderRadius: "5px",
								boxShadow: "0 0 35px -2px rgb(0 0 0 / 20%)",
								transition: "box-shadow .3s",
								},
							}}
							key={index}
							>
							<img
								src={item.icon}
								alt="icon"
								style={{ color: "#626ee3", fontSize: "50px" }}
							/>
							<Typography variant="h5" sx={{ m: "15px 0", fontSize: "20px" }}>
								{item.title}
							</Typography>
							<Typography sx={{ color: "#445d6e", fontSize: "14px" }}>
								{item.desc}
							</Typography>
						</Grid>
					);
				})}
				{/* </Grid> */}
				{/* <Grid item lg={1} xl={1} md={1} sm={4} xs={2}></Grid> */}
			</Grid>
			<Grid
				container
				sx={{ paddingTop: "1.5rem!important", justifyContent: "center" }}
			>
				{/* <Grid item lg={1} xl={1} md={1} sm={4} xs={2}></Grid> */}
				{/* <Grid container lg={10} xl={10} md={5} sm={8} xs={8}> */}
				{featureListSecondRow.map((item: any, index: any) => {
					return (
						// <Grid
						// 	item
						// 	lg={3}
						// 	xl={3}
						// 	md={5}
						// 	sm={12}
						// 	xs={12}
						// 	sx={{
						// 		...individualStep,
						// 		"&.MuiGrid-root:hover": {
						// 			bgcolor: "#f6f9fc",
						// 			borderRadius: "5px",
						// 			boxShadow: "0 0 35px -2px rgb(0 0 0 / 20%)",
						// 			transition: "box-shadow .3s",
						// 		},
						// 	}}
						// 	key={index}
						// >
						<Grid
							size={{ lg: 3, xl: 3, md: 5, sm: 12, xs: 12 }}
							sx={{
								...individualStep,
								"&:hover": {
								bgcolor: "#f6f9fc",
								borderRadius: "5px",
								boxShadow: "0 0 35px -2px rgb(0 0 0 / 20%)",
								transition: "box-shadow .3s",
								},
							}}
							key={index}
							>
							<img
								src={item.icon}
								alt="icon"
								style={{ color: "#626ee3", fontSize: "50px" }}
							/>
							<Typography variant="h6" sx={{ m: "15px 0", fontSize: "20px" }}>
								{item.title}
							</Typography>
							<Typography
								sx={{ color: "#797979", fontSize: "14px", padding: "5px 10px" }}
							>
								{item.desc}
							</Typography>
						</Grid>
					);
				})}
				{/* </Grid> */}
				{/* <Grid item lg={1} xl={1} md={1} sm={4} xs={2}></Grid> */}
			</Grid>
		</div>
	);
};

export default Features;
