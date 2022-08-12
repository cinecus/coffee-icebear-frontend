import React, { useState } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ListSharpIcon from "@mui/icons-material/ListSharp";
import GridViewIcon from "@mui/icons-material/GridView";
import TextField from "@mui/material/TextField";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CardGrid, CardList } from "../../components/menu";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { filterCategory,searchMenu } from "../../store/slices/menuSlice";
import { singleMenuType } from "../../types/menu_types";

const Menu = () => {
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
                ? menu.map((card:singleMenuType, i:number) => {
                    return isMenuList ? (
                      <Grid item md={12} xs={12} mt={2}>
                        <Link href={{ pathname: `/menu/${card.id}` }}>
                          <a>
                            <CardList {...card} />
                          </a>
                        </Link>
                      </Grid>
                    ) : (
                      <Grid item md={4} mt={2}>
                        <Link href={{ pathname: `/menu/${card.id}` }}>
                          <a>
                            <CardGrid {...card} />
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

export default Menu;
