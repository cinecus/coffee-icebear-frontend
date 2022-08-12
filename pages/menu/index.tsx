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
  Modal,
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

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CardGrid, CardList } from "../../components/menu";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { filterCategory, getMenuByID,searchMenu } from "../../store/slices/menuSlice";

const menu = () => {
  const [isMenuList, setIsMenuList] = useState(false);
  const [textSearch,setTextSearch] =useState('')
  const { menu, filter } = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();
  return (
    <Container sx={{ marginTop: "5rem" }}>
      <Box sx={{ flexGrow: 1 }}>
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
                    Category
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider sx={{ my: 1 }} />
                  <nav aria-label="secondary mailbox folders">
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText
                            primary="ทั้งหมด"
                            sx={filter == "all" ? { color: "blue" } : null}
                            onClick={() => dispatch(filterCategory("all"))}
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText
                            primary="กาแฟ"
                            sx={filter == "coffee" ? { color: "blue" } : null}
                            onClick={() => dispatch(filterCategory("coffee"))}
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText
                            primary="ชา"
                            sx={filter == "tea" ? { color: "blue" } : null}
                            onClick={() => dispatch(filterCategory("tea"))}
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText
                            primary="นม"
                            sx={filter == "milk" ? { color: "blue" } : null}
                            onClick={() => dispatch(filterCategory("milk"))}
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
            sx={{ border: "1px solid #fff", height: "800px" }}
          >
            <Box display={"flex"} justifyContent="space-between">
              <Box
                sx={{ display: { md: "flex", xs: "none" }, columnGap: "1rem" }}
              >
                <Button
                  size="small"
                  variant={isMenuList ? "outlined" : "contained"}
                  onClick={() => setIsMenuList(false)}
                >
                  <GridViewIcon />
                </Button>
                <Button
                  size="small"
                  variant={isMenuList ? "contained" : "outlined"}
                  onClick={() => setIsMenuList(true)}
                >
                  <ListSharpIcon />
                </Button>
              </Box>
              <Box>
                <TextField color="primary" autoFocus placeholder="Search..." value={textSearch} onChange={(e)=>{dispatch(searchMenu(e.target.value));setTextSearch(e.target.value)}} />
              </Box>
            </Box>
            <Grid container mt={5} display="flex" justifyContent="center">
              {!!menu
                ? menu.map((card, i) => {
                    return isMenuList ? (
                      <Grid item md={12} xs={12} mt={2}>
                        <Link href={{ pathname: `/menu/${card.id}` }}>
                          <a>
                            <CardList key={i} card={card} />
                          </a>
                        </Link>
                      </Grid>
                    ) : (
                      <Grid item md={4} mt={2}>
                        <Link href={{ pathname: `/menu/${card.id}` }}>
                          <a>
                            <CardGrid key={i} card={card} />
                          </a>
                        </Link>
                      </Grid>
                    );
                  })
                : null}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* */}
    </Container>
  );
};

export default menu;
