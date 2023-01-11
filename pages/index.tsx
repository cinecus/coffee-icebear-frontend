import type { NextPage } from 'next'
import React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import {Box,Paper,Grid,Container, Typography,List ,ListItem} from '@mui/material';
import Image from 'next/image';
import icebear from '../public/icebear.png'



const Home: NextPage = () => {
  return(
    <Container sx={{paddingBlockStart:'2rem'}}>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} sx={{display:'flex',justifyContent:'center'}}>
          <Box >
          <Image src={icebear} alt='icebear'/>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} sx={{marginBlockStart:'3rem'}}>
          <Box sx={{'gap':'1rem'}}>        
            <Typography variant="h4" gutterBottom mb={1}>
            &#9749; Coffee Icebear  
            </Typography>
            <Typography variant="subtitle1" gutterBottom mb={2}>
              ระบบสั่งเครื่องดื่มช่องทางออนไลน์ผ่านเว็บบราวเซอร์และมือถือ 
            </Typography>
            <Typography variant="h4" gutterBottom  mb={1}>
            🚀 Tech use 
            </Typography>
            <Typography variant="subtitle1"gutterBottom  mb={1}>
            - NEXT JS (TypeScript)
            </Typography>
            <Typography variant="subtitle1"gutterBottom  mb={1}>
            - MUI V5
            </Typography>
            <Typography variant="subtitle1"gutterBottom  mb={1}>
            - next-auth
            </Typography>
            <Typography variant="subtitle1"gutterBottom  mb={1}>
            - Redux
            </Typography>
            <Typography variant="h4" gutterBottom mb={1}>
            📱 Feature
            </Typography>
            <Typography variant="subtitle1"gutterBottom  mb={1}>
            - หน้าบัญชีผู้ใช้ เข้าสู่ระบบได้
            </Typography>
            <Typography variant="subtitle1"gutterBottom  mb={1}>
            - ดูเมนูเครื่องดื่มต่าง ๆและค้นหาได้ 
            </Typography>
            <Typography variant="subtitle1"gutterBottom  mb={1}>
            - เพิ่มเมนูเครื่องดื่มลงในตะกร้า
            </Typography>
            <Typography variant="subtitle1"gutterBottom  mb={1}>
            - ดูออร์เดอร์ที่เคยกดสั่ง
            </Typography>
            </Box>
        </Grid>
      </Grid>
    </Box>
    </Container>
  )
}

export default Home


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));