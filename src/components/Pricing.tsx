import { Grid, Typography } from "@mui/material";
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./pricingTable.css";

const pricingList = [
	{
		tag: "T4",
		price: "25",
		title: "(T4 Summary Charges)",
		tableRows: [
			{ slips: "1-25 Slips", charges: "$3.00" },
			{ slips: "26-50 Slips", charges: "$2.75" },
			{ slips: "51-75 Slips", charges: "$2.50" },
			{ slips: "76-100 Slips", charges: "$2.25" },
			{ slips: "100 Above Slips", charges: "$2.00" },
		],
	},
	{
		tag: "RL-1",
		price: "25",
		title: "(RL-1 Summary Charges)",
		tableRows: [
			{ slips: "1-25 Slips", charges: "$3.00" },
			{ slips: "26-50 Slips", charges: "$2.75" },
			{ slips: "51-75 Slips", charges: "$2.50" },
			{ slips: "76-100 Slips", charges: "$2.25" },
			{ slips: "100 Above Slips", charges: "$2.00" },
		],
	},
	{
		tag: "T4A",
		price: "25",
		title: "(T4A Summary Charges)",
		tableRows: [
			{ slips: "1-25 Slips", charges: "$3.00" },
			{ slips: "26-50 Slips", charges: "$2.75" },
			{ slips: "51-75 Slips", charges: "$2.50" },
			{ slips: "76-100 Slips", charges: "$2.25" },
			{ slips: "100 Above Slips", charges: "$2.00" },
		],
	},
];
const pricingListWithT5AndT3 = [
	{
		tag: "T5",
		price: "25",
		title: "(T5 Summary Charges)",
		tableRows: [
			{ slips: "1-25 Slips", charges: "$3.00" },
			{ slips: "26-50 Slips", charges: "$2.75" },
			{ slips: "51-75 Slips", charges: "$2.50" },
			{ slips: "76-100 Slips", charges: "$2.25" },
			{ slips: "100 Above Slips", charges: "$2.00" },
		],
	},
	{
		tag: "RL-3",
		price: "25",
		title: "(RL-3 Summary Charges)",
		tableRows: [
			{ slips: "1-25 Slips", charges: "$3.00" },
			{ slips: "26-50 Slips", charges: "$2.75" },
			{ slips: "51-75 Slips", charges: "$2.50" },
			{ slips: "76-100 Slips", charges: "$2.25" },
			{ slips: "100 Above Slips", charges: "$2.00" },
		],
	},
	{
		tag: "T3",
		price: "25",
		title: "(T3 Summary Charges)",
		tableRows: [
			{ slips: "1-25 Slips", charges: "$3.00" },
			{ slips: "26-50 Slips", charges: "$2.75" },
			{ slips: "51-75 Slips", charges: "$2.50" },
			{ slips: "76-100 Slips", charges: "$2.25" },
			{ slips: "100 Above Slips", charges: "$2.00" },
		],
	},
	{
		tag: "RL-16",
		price: "25",
		title: "(RL-16 Summary Charges)",
		tableRows: [
			{ slips: "1-25 Slips", charges: "$3.00" },
			{ slips: "26-50 Slips", charges: "$2.75" },
			{ slips: "51-75 Slips", charges: "$2.50" },
			{ slips: "76-100 Slips", charges: "$2.25" },
			{ slips: "100 Above Slips", charges: "$2.00" },
		],
	},
];
const individualStep = {
	// display:"flex",
	// flexDirection:"column",
	margin: 0,
	maxWidth: "330px",
	alignItems: "center",
	padding: "20px",
	textAlign: "center",
};
const Pricing = () => {
	return (
		// <div className='lg:mx-8 xl:mx-8 md:xm-8 sm:mx-8 xs:mx-8' style={{margin:"0 3rem"}}>
		<div>
			<h1
				style={{
					fontWeight: "bold",
					textAlign: "center",
					paddingBottom: "0.5rem",
					color: "#fff",
				}}
			>
				Pricing Table
			</h1>
			<Grid
				container
				sx={{ paddingTop: "1.5rem!important", justifyContent: "center" }}
				columnGap={2}
			>
				{/* <Grid item lg={2} xl={2} md={1} sm={4} xs={2}></Grid> */}
				{/* <Grid container lg={10} xl={10} md={5} sm={8} xs={8}> */}
				{pricingList.map((item: any, index: any) => {
					return (
						<Grid
							item
							lg={3.25}
							xl={3.25}
							md={3}
							sm={12}
							xs={12}
							sx={{
								...individualStep,
								"&.MuiGrid-root": {
									bgcolor: "#f6f9fc",
									borderRadius: "5px",
									boxShadow: "0 0 35px -2px rgb(0 0 0 / 20%)",
									transition: "box-shadow .3s",
									padding: "20px 0",
									marginTop: "10px",
								},
								"&.MuiGrid-root:hover": { marginTop: "0" },
							}}
							key={index}
						>
							<Typography variant="h5" sx={{ m: "0 0 15px 0" }}>
								{item.tag}
							</Typography>
							<hr style={{ borderTop: "1px solid rgba(0,0,0,.1)" }} />
							<Typography
								sx={{
									color: "#445d6e",
									fontSize: "14px",
									paddingBottom: ".5rem",
								}}
							>
								<sup
									style={{
										opacity: "0.7",
										fontSize: "25px",
										fontWeight: "400",
									}}
								>
									$
								</sup>
								<span
									style={{
										fontSize: "50px",
										fontWeight: "600",
										color: "#17191a",
									}}
								>
									{item.price}
								</span>
								<br />
								<span
									style={{
										fontSize: "13px",
										lineHeight: "16px",
										color: "#7f8588",
									}}
								>
									{item.title}
								</span>
							</Typography>
							<DataTable value={item.tableRows} className="pricingTable">
								<Column
									field="slips"
									header="No. of Slips"
									className="slipsNumber"
								></Column>
								<Column
									field="charges"
									header="Charges per slip"
									className="slipsCharges"
								></Column>
							</DataTable>
						</Grid>
					);
				})}
				{/* </Grid> */}
				{/* <Grid item lg={2} xl={2} md={1} sm={4} xs={2}></Grid> */}
			</Grid>
			<Grid
				container
				sx={{ paddingTop: "1.5rem!important", justifyContent: "center" }}
				columnGap={2}
			>
				{/* <Grid item lg={2} xl={2} md={1} sm={4} xs={2}></Grid> */}
				{/* <Grid container lg={10} xl={10} md={5} sm={8} xs={8}> */}
				{pricingListWithT5AndT3.map((item: any, index: any) => {
					return (
						<Grid
							item
							lg={2.8}
							xl={2.8}
							md={2.8}
							sm={12}
							xs={12}
							sx={{
								...individualStep,
								"&.MuiGrid-root": {
									bgcolor: "#f6f9fc",
									borderRadius: "5px",
									boxShadow: "0 0 35px -2px rgb(0 0 0 / 20%)",
									transition: "box-shadow .3s",
									padding: "20px 0",
									marginTop: "10px",
								},
								"&.MuiGrid-root:hover": { marginTop: "0" },
							}}
							key={index}
						>
							<Typography variant="h5" sx={{ m: "0 0 15px 0" }}>
								{item.tag}
							</Typography>
							<hr style={{ borderTop: "1px solid rgba(0,0,0,.1)" }} />
							<Typography
								sx={{
									color: "#445d6e",
									fontSize: "14px",
									paddingBottom: ".5rem",
								}}
							>
								<sup
									style={{
										opacity: "0.7",
										fontSize: "25px",
										fontWeight: "400",
									}}
								>
									$
								</sup>
								<span
									style={{
										fontSize: "50px",
										fontWeight: "600",
										color: "#17191a",
									}}
								>
									{item.price}
								</span>
								<br />
								<span
									style={{
										fontSize: "13px",
										lineHeight: "16px",
										color: "#7f8588",
									}}
								>
									{item.title}
								</span>
							</Typography>
							<DataTable value={item.tableRows} className="pricingTable">
								<Column
									field="slips"
									header="No. of Slips"
									className="slipsNumber"
								></Column>
								<Column
									field="charges"
									header="Charges per slip"
									className="slipsCharges"
								></Column>
							</DataTable>
						</Grid>
					);
				})}
				{/* </Grid> */}
				{/* <Grid item lg={2} xl={2} md={1} sm={4} xs={2}></Grid> */}
			</Grid>
		</div>
	);
};

export default Pricing;
