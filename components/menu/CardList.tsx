import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from "@mui/material";
import { singleMenuType } from "../../types/menu_types";

export const CardList:React.FC<singleMenuType>  = ({ ...card }) => {
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
