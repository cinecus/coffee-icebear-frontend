import React from "react";
import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Chip,
  CardActions,
  Box,
} from "@mui/material";
import { singleMenuType } from "../../types/menu_types";

export const CardGrid:React.FC<singleMenuType> = ({ ...card }) => {
  const { id, name, description, type, category, price, img } = card;
  return (
    <Card sx={{ width:{md:'90%',xs:'100%'},position:'relative' }}>
      <CardMedia
        component="img"
        height="200"
        image={img[0]}
        alt="green iguana"
      />
      <CardContent >
        <Box display="flex" alignItems="center">
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Chip variant="outlined" color="secondary" label={type} />
        </Box>
        <Chip variant="outlined" color="primary" label={category} />
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between"}}>
        <Typography variant="body1">{price} Baht</Typography>
        <Button size="small">See More</Button>
      </CardActions>
    </Card>
  );
};
