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
  CardActions,
  Stack,
  FormLabel,
  FormGroup,
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

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { CardList } from "../components/order";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import { useFormControl } from "@mui/material/FormControl";

const profile = () => {
  return (
    <Container sx={{ marginTop: "5rem" }}>
      <Typography variant="h4" align="center">
        บัญชีผู้ใช้งาน
      </Typography>
      <Grid container  mt={1} >
        <Grid
          item
          xs={12}
          md={5}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ gap: "2rem" }}
          >
            <Avatar sx={{ width: 200, height: 200 }} />
            <Typography variant="h6">Cinecus CC</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box sx={{ gap: "1rem" }} display="flex" my={2}>
            <FormControl fullWidth>
              <TextField
                placeholder="ชื่อ"
                label="ชื่อ"
                variant="outlined"
                defaultValue={"Cinecus"}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                placeholder="นามสกุล"
                label="นามสกุล"
                variant="outlined"
                defaultValue={"CC"}
              />
            </FormControl>
          </Box>
          <Box sx={{ gap: "1rem" }} display="flex" my={2}>
            <FormControl fullWidth>
              <TextField
                placeholder="เบอร์โทร"
                label="เบอร์โทร"
                variant="outlined"
                defaultValue={"0922359882"}
              />
            </FormControl>
          </Box>
          <Box sx={{ gap: "1rem" }} display="flex" my={2}>
            <FormControl fullWidth>
              <TextField
                placeholder="ที่อยู่"
                label="ที่อยู่"
                variant="outlined"
                defaultValue={"195 เทอดไท 5 บางยี่เรือ ธนบุรี กรุงเทพ"}
                sx={{ width: "auto" }}
              />
            </FormControl>
          </Box>
          <Box
            sx={{ gap: "1rem" }}
            display="flex"
            my={2}
            justifyContent="center"
          >
            <Button variant="outlined">แก้ไขข้อมูล</Button>
            <Button variant="outlined">ย้อนกลับ</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default profile;
