import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import "./contact.css"

import Paper from '@mui/material/Paper';
import home from '../images/home.png'
import homePage from '../images/taxslips-home-img.png'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Home = () => {
  return (
    <>
    {/* <Grid container lg={12} xl={12} md={12} sm={12} xs={12} columnSpacing={2}>
        <Grid item lg={2} xl={2} md={1} sm={1} xs={0}></Grid>
        <Grid item lg={4} xl={4} md={5} sm={10} xs={12}>
            <Typography variant='h3' sx={{
                marginTop:"204px",
                // fontSize:"100px",

            }}>Take the Stress Out of Filing Your Tax Slips</Typography>
            <br />
            <br />
            <Button variant="contained" sx={{marginRight:"10px",marginBottom:"10px"}}><Link to="https://backup-logistics.vercel.app/#/create-an-account" style={{color:"#fff",textDecoration:"none"}}  target='_blank'>get started</Link></Button>
        </Grid>
        <Grid item lg={4} xl={4} md={5} sm={10} xs={12}>
            <img src={home} alt="home" style={{maxWidth:"100%", height:"auto", marginTop:"126px"}} />
        </Grid>
        <Grid item lg={2} xl={2} md={1} sm={1} xs={0}></Grid>
    </Grid> */}

{/* <div className='lg:mx-8 xl:mx-8 md:xm-8 sm:mx-8 xs:mx-8' style={{margin:"0 3rem"}}> */}
<div>
      <Grid container sx={{justifyContent:"center"}}>
        {/* <Grid item lg={6} xl={6} md={6} sm={12} xs={12}> */}
          <Grid size={{lg:6, xl:6, md:6, sm:12, xs:12}}>
        <div
            style={{
              marginTop: "190px",
              fontSize: "3.0rem",
              color: "#15803d", // modern green (Tailwind green-500 style)
            }}
            className="title-home"
          >
            Revolutionizing logistics with AI-driven efficiency and innovation.
          </div>
            <br />
            <br />
            <Button
              variant="contained"
              sx={{
                marginRight: "10px",
                marginBottom: "10px",
                backgroundColor: "#15803d", // dark green
                "&:hover": {
                  backgroundColor: "#166534", // darker on hover
                },
              }}
            >
              <Link
                // to="https://backup-logistics.vercel.app/#/create-an-account"
                to="https://backup-logistics.vercel.app/#/create-an-account"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Get Started
              </Link>
            </Button>
            {/* <Button variant="contained" sx={{marginRight:"10px",marginBottom:"10px"}}><Link to="https://backup-logistics.vercel.app/#/create-an-account" style={{color:"#fff",textDecoration:"none"}} >get started</Link></Button> */}
        </Grid>
        {/* <Grid item lg={6} xl={5.5} md={6} sm={12} xs={12}> */}
        <Grid size={{lg:6, xl:5.5, md:6, sm:12, xs:12}}>
        <img src={homePage} alt="home" className="home-image" style={{maxWidth:"100%", height:"auto", marginTop:"110px"}} />
        </Grid>
      </Grid>
    </div>

    </>
  )
}

export default Home