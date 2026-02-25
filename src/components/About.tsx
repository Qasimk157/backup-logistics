import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import aboutus from '../images/aboutus.png'

const aboutusList = [
  {item:"Our mission at Backup Logistics is to revolutionize logistics with AI-driven efficiency and innovation."},
  {item:"We aim to empower truck owners by enhancing transportation solutions for a better tomorrow."},
  {item:"Our commitment to cutting-edge technology and dedicated collaboration ensures that our partners achieve their fullest potential."},
  {item:"We love our customers, so feel free to call us during normal business hours."},
  // {item:"It gives security features like 2 step authentication and sensitive data masking."},
  // { 
  //   item: (
  //     <>
  //       TaxSlips integrates with market-leading Payroll software{' '}
  //     </>
  //   ),
  // },
  // {item:"It gives you data import options in XML and CSV formats."},
]
const simplePayStyle = {
  color:"rgb(0, 123, 255)",
  textDecoration:"none",
  fontWeight:"bold"
}
const About = () => {
  return (
    // <div className='lg:mx-8 xl:mx-8 md:xm-8 sm:mx-8 xs:mx-8' style={{margin:"0 3rem"}}>
    <div>
      <h1 style={{fontWeight:"bold", textAlign:"center"}}>About Backup Logistics</h1>
      <Typography sx={{textAlign:"center",paddingBottom:"2rem",color:"#797979"}}>Our Mission</Typography>
    <Grid container sx={{paddingTop:"1.5rem!important",justifyContent:"center"}}>
        {/* <Grid item lg={2} xl={2} md={1} sm={4} xs={2}></Grid> */}
        {/* <Grid item lg={6} xl={6} md={6} sm={12} xs={12}> */}
        <Grid size={{lg:6, xl:6, md:6, sm:12, xs:12}}>
          {aboutusList.map((item:any)=>{
            return(
              <Typography sx={{
                marginBottom:"1rem",
                color:"rgb(33, 37, 41)",
                fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                paddingTop:"0.5rem"
              }}>{typeof item.item === 'string' ? (
                item.item
              ) : (
                <>
                  {item.item}
                  <a href="https://www.simplepay.ca/canada_payroll/index.php?2" target="_blank" style={simplePayStyle}>
                    SimplePay.
                  </a>
                </>
              )}</Typography>
            )
          })}
        </Grid>
        <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            <img src={aboutus} alt="aboutus" style={{maxWidth:"100%", height:"auto"}} />
        </Grid>
        {/* <Grid item lg={2} xl={2} md={1} sm={4} xs={2}></Grid> */}
    </Grid>
    </div>
  )
}

export default About