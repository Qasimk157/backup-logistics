import {
	AlertColor,
	Grid,
	Typography,
	TextField,
	useTheme,
	Backdrop,
	CircularProgress,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import React, { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { Alert } from 'primereact/alert';
import { Card } from "primereact/card";
import "./contact.css";
import http from "../common/http-common";

interface FormData {
	email: string;
	fullname: string;
	phone?: string;
	message?: string;
}

const schema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
	fullname: yup.string().required("Full Name is required"),
	phone: yup.string(),
	message: yup.string(),
});
const Contact: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData | any>({
		resolver: yupResolver(schema),
	});
	const [toastMessage, setToastMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const toast = useRef<any>(null);
	const onSubmit = async (data: FormData) => {
		// Handle form submission logic here
		console.log("data", data);
		let payload = {
			email: data.email,
			name: data.fullname,
			phoneNo: data.phone,
			message: data.message,
		};
		setIsLoading(true);
		try {
			// Perform POST request using Axios
			const response = await http.post(
				"https://swv3.taxslips.com/send-user-feedback",
				payload
			);
			console.log("response", response);

			// Display success message
			setToastMessage(`Success: ${response.data.message}`);
			toast.current.show({
				severity: "success",
				summary: "Success",
				detail: response.data.message,
			});
		} catch (error: any) {
			console.log("error", error);
			// Handle error and display error message
			const errorMessage =
				error.response?.data?.message ||
				error.response?.data?.detail ||
				"Something went wrong";
			setToastMessage(`Error: ${errorMessage}`);
			toast.current.show({
				severity: "error",
				summary: "Error",
				detail: errorMessage,
			});
		} finally {
			setIsLoading(false);
		}
	};

	const theme = useTheme();
	return (
		<>
			<Backdrop
				sx={{ zIndex: theme.zIndex.drawer + 1 }}
				open={isLoading}
				data-testid={""}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			{/* // <div className='lg:mx-8 xl:mx-8 md:xm-8 sm:mx-8 xs:mx-0' style={{margin:"0 3rem"}}> */}
			<div>
				<h1 style={{ fontWeight: "bold", textAlign: "center" }}>Drop us a line!</h1>
				<Typography
					sx={{
						textAlign: "center",
						paddingBottom: "0.5rem",
						color: "#797979",
					}}
				>
					We love our customers, so feel free to call us during normal business hours or <br />
					by calling <strong>(+92) 348-1735864</strong> <br />
					with your comments, questions, concerns, or to inquire about our
					products and services.
				</Typography>
				<Grid
					container
					sx={{ paddingTop: "1.5rem!important", justifyContent: "center" }}
					columnGap={2}
				>
					{/* <Grid item lg={1} xl={1} md={1} sm={1} xs={1}></Grid> */}
					<Grid size={{lg:7.8, xl:7.8, md:6, sm:12, xs:12}}>
					{/* <Grid
						item
						lg={7.8}
						xl={7.8}
						md={6}
						sm={12}
						xs={12}
						// sx={{ padding: "10px 25px" }}
					> */}
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="p-field">
								<label htmlFor="email">Your Email*</label>
								<InputText
									id="email"
									type="email"
									{...register("email")}
									className={errors.email ? "p-invalid" : ""}
									style={{ fontSize: "12px" }}
									placeholder="Enter email"
								/>
								{errors.email && (
									<Message
										severity="error"
										text={String(errors.email.message)}
									/>
								)}
							</div>
							<div className="p-field">
								<label htmlFor="fullname">Full Name*</label>
								<InputText
									id="fullname"
									type="text"
									{...register("fullname")}
									className={errors.fullname ? "p-invalid" : ""}
									style={{ fontSize: "12px" }}
									placeholder="Enter name"
								/>
								{errors.fullname && (
									<Message
										severity="error"
										text={String(errors.fullname.message)}
									/>
								)}
							</div>
							<div className="p-field">
								<label htmlFor="phone">Your Phone</label>
								<InputText
									id="phone"
									type="tel"
									{...register("phone")}
									className={errors.phone ? "p-invalid" : ""}
									style={{ fontSize: "12px" }}
									placeholder="Enter phone"
								/>
							</div>
							<div className="p-field">
								<label htmlFor="message">Your Message</label>
								<InputTextarea
									id="message"
									{...register("message")}
									className={errors.message ? "p-invalid" : ""}
									style={{ fontSize: "12px" }}
									placeholder="Enter something"
								/>
							</div>
							<Button 
								type="submit"
								severity="success"
								label="Submit"
								className="p-button-raised"
								style={{ marginBottom: "1.5rem"}}
								size="small"
							/>
						</form>
						<Toast ref={toast} />
					</Grid>
					{/* <Grid item lg={4} xl={4} md={4} sm={10} xs={12}> */}
					<Grid size={{lg:5, xl:3.5, md:4, sm:10, xs:12}} sx={{ ml: 8 }}>
						<Card>
							{/* <div className="card-detail"> */}
							<div className="flex pl-3 align-items-center pb-6">
								<i
									className="pi pi-info-circle pl-2 pr-2"
									style={{ color: "rgb(0, 87, 219)" }}
								></i>
								<div className="pl-4 pr-4">
									<strong>
										Ewing, New Jersey, United States
									</strong>
								</div>
							</div>
							<div className="flex pl-3 align-items-center pb-6">
								<i
									className="pi pi-mobile pl-2 pr-2"
									style={{ color: "rgb(0, 87, 219)" }}
								></i>
								<div className="pl-4 pr-4">
									<strong>(+92) 304-9253256</strong>
								</div>
							</div>
							<div className="flex pl-3 align-items-center">
								<i
									className="pi pi-envelope pl-2 pr-2"
									style={{ color: "rgb(0, 87, 219)" }}
								></i>
								<div className="pl-4 pr-4">
									<a
										href="mailto:qasimkhanneng@gmail.com"
										style={{ fontWeight: "bold", textDecoration: "auto" }}
									>
										qasimkhanneng@gmail.com
									</a>
								</div>
							</div>
							{/* </div> */}
						</Card>
					</Grid>
					{/* <Grid item lg={1} xl={1} md={1} sm={1} xs={1}></Grid> */}
				</Grid>
			</div>
		</>
	);
};

export default Contact;
