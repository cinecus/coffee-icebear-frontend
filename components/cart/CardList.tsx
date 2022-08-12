import React, { useState } from "react";
import {
  Box,
  Paper,
  Grid,
  Container,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  InputBase,
  Button,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Popover ,
  CardActions,
  Stack,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SearchIcon from "@mui/icons-material/Search";
import ListSharpIcon from "@mui/icons-material/ListSharp";
import GridViewIcon from "@mui/icons-material/GridView";
import { styled, alpha } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import moment from "moment";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { useAppDispatch,useAppSelector } from "../../store/store";
import {customizeCart,deleteItemByID} from "../../store/slices/cartSlice"

type CartItem = {
  id:number,
  name:string,
  type:string,
  price:number,
  addOnPrice:number,
  sweetLevel:string,
  addWhipCream:boolean,
  addBrownie:boolean,
  addCoffeeShot:boolean,
  addBubble:boolean,
  qty:number
}

export const CardList = ({cartItem}:CartItem) => {
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
