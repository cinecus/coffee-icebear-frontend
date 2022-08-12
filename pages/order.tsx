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
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { CardList } from "../components/order";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../store/store";
import { filterOrder,filterOrderByDate } from "../store/slices/orderSlice";

const order = () => {
  const dispatch = useAppDispatch();
  const [dateStart, setDateStart] = useState(moment().add(-7,'d'));
  const [dateEnd, setDateEnd] = useState(moment().add(1, "d"));
  const { order, filter } = useAppSelector((state) => state.order);
  const handleChange = (newValue: Date | null,type:"start"|"end") => {
    if(type=='start'){
      setDateStart(newValue)
      dispatch(filterOrderByDate({dateStart:newValue,dateEnd}))
    }else if(type=='end'){
      setDateEnd(newValue)
      dispatch(filterOrderByDate({dateStart,dateEnd:newValue}))
      
    }
  };
 

  return (
    <Container sx={{ marginTop: "5rem" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            border: "1px solid #fff",
          }}
        >
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" fontWeight={600}>
                  รายการคำสั่งซื้อ
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Divider sx={{ my: 1 }} />
                <nav aria-label="secondary mailbox folders">
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton component="a">
                        <ListItemText
                          primary="ทั้งหมด"
                          sx={filter == "all" ? { color: "blue" } : null}
                          onClick={() => dispatch(filterOrder("all"))}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText
                          primary="กำลังดำเนินการ"
                          sx={filter == "waiting" ? { color: "blue" } : null}
                          onClick={() => dispatch(filterOrder("waiting"))}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton component="a">
                        <ListItemText
                          primary="เสร็จสิ้น"
                          sx={filter == "success" ? { color: "blue" } : null}
                          onClick={() => dispatch(filterOrder("success"))}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton component="a">
                        <ListItemText
                          primary="ยกเลิก/ล้มเหลว"
                          sx={filter == "cancel" ? { color: "blue" } : null}
                          onClick={() => dispatch(filterOrder("cancel"))}
                        />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </nav>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            border: "1px solid #fff",
            height: "800px",
          }}
        >
          <Box display="flex" sx={{ gap: "1rem" }}>
            {/* <Typography variant='h6' fontWeight={600}>
                  ตัวกรอง :
                </Typography> */}
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label="ช่วงเวลาเริ่มต้น"
                inputFormat="DD-MM-YYYY"
                value={dateStart}
                onChange={(e)=>handleChange(e,'start')}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label="ช่วงเวลาสิ้นสุด"
                inputFormat="DD-MM-YYYY"
                value={dateEnd}
                onChange={(e)=>handleChange(e,'end')}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <Grid container mt={5}>
            {order.map((orderItem, i) => {
              return (
                <Grid item md={12} mb={5}>
                  <CardList orderItem={orderItem} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default order;

order.auth = true;