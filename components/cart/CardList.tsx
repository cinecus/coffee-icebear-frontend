import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Chip,
  Popover
} from "@mui/material";
import Image from "next/image";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { useAppDispatch,useAppSelector } from "../../store/store";
import {customizeCart,deleteItemByID} from "../../store/slices/cartSlice"

import { singleCartType } from "../../types/cart_types";

export const CardList:React.FC<singleCartType> = ({...cartItem}) => {
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Grid container justifyContent="center">
      <Grid
        item
        md={9}
        sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}
      >
        <Box display="flex" sx={{ gap: "2rem" }} flexDirection="column" >
          <Box
            display="flex"
            
            sx={{ gap: "0.5rem" }}
          >
            <Image
              src={
                cartItem.image
              }
              width={100}
              height={100}
            />
          </Box>
          <Box display="flex" flexDirection="column"  sx={{ gap: "0.5rem" }} >
            <Box display="flex" alignItems="center" sx={{ gap: "0.5rem" }}>
              <Box display="flex">
                <Typography variant="body1" fontWeight={600}>
                  Item :
                </Typography>
                <Typography variant="body1" ml={1}>
                  {cartItem.name}
                </Typography>
              </Box>
              <Chip label={cartItem.type} />
            </Box>
            <Box display="flex"  alignItems="center" sx={{ gap: "0.5rem" }}>
                <Typography variant="body1" fontWeight={600}>
                  ระดับความหวาน :
                </Typography>
                <Typography variant="body1" ml={1}>
                  {cartItem.sweetLevel} %
                </Typography>
              </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{ gap: "0.5rem" }}
              flexWrap="wrap"
            >
              <Typography variant="body1" fontWeight={600}>
                Add on :
              </Typography>
              {
                cartItem.addWhipCream && <Chip label="whip cream" />
              }
              {
                cartItem.addBubble && <Chip label="Bubble" />
              }
              {
                cartItem.addBrownie && <Chip label="brownie chocolate" />
              }
              {
                cartItem.addCoffeeShot && <Chip label="coffee shot" />
              }
              {
                (!cartItem.addWhipCream&& !cartItem.addBubble &&!cartItem.addBrownie  &&!cartItem.addCoffeeShot ) && "-"
              } 
            </Box>
            <Box display="flex" alignItems="center" sx={{ gap: "0.5rem" }}>
              <Typography variant="body1">ราคา : {cartItem.price} บาท</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ gap: "0.5rem" }}>
              <Typography variant="body1">ราคาเพิ่มเติม : {cartItem.addOnPrice} บาท</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ gap: "0.5rem" }}>
              <Typography variant="body1">รวม : {(cartItem.price+cartItem.addOnPrice) * cartItem.qty} บาท</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        md={3}
        xs={12}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          display="flex"
          sx={{ gap: "1rem" }}
          alignItems="center"
          justifyContent="center"
        >
          <IndeterminateCheckBoxIcon sx={{cursor:'pointer'}} aria-describedby={id}  onClick={(e)=>cartItem.qty==1 ? handleClick(e):dispatch(customizeCart({id:cartItem.id,type:'DECREASE'}))}/>
          <Typography variant="h6">{cartItem.qty}</Typography>
          <AddBoxIcon sx={{cursor:'pointer'}} onClick={()=>dispatch(customizeCart({id:cartItem.id,type:'INCREASE'}))}/>
        </Box>
      </Grid>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Typography sx={{ p: 2 }}>ต้องการเอาออกจากตะกร้าใช่หรือไม่ ?</Typography>
        <Box display='flex' justifyContent='right'>
          <Button variant="text" onClick={()=>{handleClose();dispatch(deleteItemByID(cartItem.id))}}>ใช่</Button>
          <Button variant="text" onClick={handleClose}>ใม่</Button>
        </Box>
      </Popover>
    </Grid>
  );
};
