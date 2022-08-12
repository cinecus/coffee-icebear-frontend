import React from "react";
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

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const CardList = ({ card }) => {
  const { id, name, description, type, category, price, img } = card;
  return (
    <Card sx={{ display: "flex", width:'100%'}}>
      <CardMedia
        component="img"
        sx={{ width: 250, height: 250 }}
        image={img[0]}
        alt="Live from space album cover"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
         
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center">
            <Typography component="div" variant="h4">
              {name}
            </Typography>
            <Chip variant="outlined" color="secondary" label={type} />
          </Box>
          <Chip variant="outlined" color="primary" label={category} />
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1">{price} Baht</Typography>
          {/* <Button size="small">See More</Button> */}
        </CardContent>
      </Box>
    </Card>
  );
};
