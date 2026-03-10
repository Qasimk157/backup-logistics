import {
  Backdrop,
  CircularProgress,
  useTheme,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./contactData.css";
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
	reset,
	formState: { errors },
  } = useForm<FormData | any>({
	resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useRef<any>(null);

  const onSubmit = async (data: FormData) => {
	let payload = {
	  email: data.email,
	  name: data.fullname,
	  phoneNo: data.phone,
	  message: data.message,
	};
	setIsLoading(true);
	try {
	  const response = await http.post(
		"https://swv3.taxslips.com/send-user-feedback",
		payload
	  );
	  toast.current.show({
		severity: "success",
		summary: "Success",
		detail: response.data.message,
	  });
	  reset();
	} catch (error: any) {
	  const errorMessage =
		error.response?.data?.message ||
		error.response?.data?.detail ||
		"Something went wrong";
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
	  <Backdrop sx={{ zIndex: theme.zIndex.drawer + 1 }} open={isLoading}>
		<CircularProgress color="inherit" />
	  </Backdrop>
	  <Toast ref={toast} />

	  <section className="bl-contact-section">
		<div className="bl-contact-bg-dots" />

		<div className="bl-contact-container">
		  {/* ── LEFT: Info ── */}
		  <div className="bl-contact-info">
			<div className="bl-badge">
			  <span className="bl-badge-dot" />
			  Available Now
			</div>

			<h2 className="bl-contact-title">
			  Let's Move Your<br />
			  Freight <em>Forward</em>
			</h2>

			<p className="bl-contact-subtitle">
			  Have a shipment to book, a question about our services, or need a
			  quick quote? Reach out — our dispatch team is ready to help.
			</p>

			<div className="bl-detail-cards">
			  <a href="tel:6099004245" className="bl-detail-card">
				<div className="bl-detail-icon">
				  <i className="pi pi-phone" />
				</div>
				<div className="bl-detail-text">
				  <span className="bl-detail-label">Call Us</span>
				  <span className="bl-detail-value">(609) 900-4245</span>
				</div>
				<i className="pi pi-arrow-right bl-detail-arrow" />
			  </a>

			  <a href="mailto:Shahzaib@backuplogistics.us" className="bl-detail-card">
				<div className="bl-detail-icon">
				  <i className="pi pi-envelope" />
				</div>
				<div className="bl-detail-text">
				  <span className="bl-detail-label">Email Us</span>
				  <span className="bl-detail-value">Shahzaib@backuplogistics.us</span>
				</div>
				<i className="pi pi-arrow-right bl-detail-arrow" />
			  </a>

			  <div className="bl-detail-card">
				<div className="bl-detail-icon">
				  <i className="pi pi-map-marker" />
				</div>
				<div className="bl-detail-text">
				  <span className="bl-detail-label">Headquarters</span>
				  <span className="bl-detail-value">1617 Fannin St, Houston TX 77002</span>
				</div>
			  </div>
			</div>
		  </div>

		  {/* ── RIGHT: Form ── */}
		  <div className="bl-contact-form-wrap">
			<div className="bl-form-card">
			  <h3 className="bl-form-heading">Send a Message</h3>
			  <p className="bl-form-subtext">
				We'll get back to you within 1 business hour.
			  </p>

			  <form onSubmit={handleSubmit(onSubmit)} className="bl-form">
				<div className="bl-form-row">
				  <div className="bl-field">
					<label htmlFor="fullname" className="bl-label">
					  Full Name <span className="bl-required">*</span>
					</label>
					<InputText
					  id="fullname"
					  type="text"
					  {...register("fullname")}
					  className={`bl-input ${errors.fullname ? "p-invalid" : ""}`}
					  placeholder="John Doe"
					/>
					{errors.fullname && (
					  <Message
						severity="error"
						text={String(errors.fullname.message)}
						className="bl-error-msg"
					  />
					)}
				  </div>

				  <div className="bl-field">
					<label htmlFor="email" className="bl-label">
					  Email <span className="bl-required">*</span>
					</label>
					<InputText
					  id="email"
					  type="email"
					  {...register("email")}
					  className={`bl-input ${errors.email ? "p-invalid" : ""}`}
					  placeholder="john@company.com"
					/>
					{errors.email && (
					  <Message
						severity="error"
						text={String(errors.email.message)}
						className="bl-error-msg"
					  />
					)}
				  </div>
				</div>

				<div className="bl-field">
				  <label htmlFor="phone" className="bl-label">Phone</label>
				  <InputText
					id="phone"
					type="tel"
					{...register("phone")}
					className={`bl-input ${errors.phone ? "p-invalid" : ""}`}
					placeholder="(555) 000-0000"
				  />
				</div>

				<div className="bl-field">
				  <label htmlFor="message" className="bl-label">
					Message <span className="bl-required">*</span>
				  </label>
				  <InputTextarea
					id="message"
					{...register("message")}
					className={`bl-input bl-textarea ${errors.message ? "p-invalid" : ""}`}
					placeholder="Tell us about your shipment or inquiry..."
					rows={4}
					autoResize
				  />
				</div>

				<Button
				  type="submit"
				  className="bl-submit-btn"
				  loading={isLoading}
				>
				  <i className="pi pi-send" style={{ marginRight: "8px" }} />
				  Send Message
				</Button>
			  </form>
			</div>
		  </div>
		</div>
	  </section>
	</>
  );
};

export default Contact;
