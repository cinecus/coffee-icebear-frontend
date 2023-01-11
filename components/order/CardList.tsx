import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Modal,
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { singleOrderType } from "../../types/order_types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: "auto", xs: "80%" },
  // height: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const CardList:React.FC<singleOrderType> = ({ ...orderItem }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 250 }}
        image="https://mui.com/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "space-between",
          width: "100%",
        }}
      >
        <CardContent>
          <Typography component="div" variant="h4">
            {"เลขที่ออเดอร์ : " + orderItem?.id}
          </Typography>
          <Typography component="div" variant="body1">
            {/* วันที่ 11-07-2022 เวลา 18.30 น. */}
            {orderItem?.orderDate}
          </Typography>
        </CardContent>
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          {orderItem?.status == "success" ? (
            <Typography variant="body1" sx={{ color: "green" }}>
              ได้รับเรียบร้อย
            </Typography>
          ) : orderItem?.status == "waiting" ? (
            <Typography variant="body1" sx={{ color: "grey" }}>
              กำลังดำเนินการ
            </Typography>
          ) : (
            <Typography variant="body1" sx={{ color: "red" }}>
              ถูกยกเลิก
            </Typography>
          )}
          <Button size="small" onClick={handleOpen}>
            ดูรายละเอียด
          </Button>
        </CardContent>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              position: "absolute",
              top: -10,
              right: -10,
              background: "red",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              padding: "2.5px",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <CloseIcon onClick={handleClose} />
          </Box>
          <Box display={"flex"} justifyContent="space-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {"เลขที่ออเดอร์ : " + orderItem?.id}
            </Typography>
            <Typography variant="h6" component="h2">
              ยอดรวม{" "}
              {orderItem?.itemList.reduce(
                (a, b) => a + b.qty * (b.price + b.addOnPrice),
                0
              )}{" "}
              บาท
            </Typography>
          </Box>
          <Box
            mt={2}
            sx={{
              gap: "1rem",
              overflowY: "scroll",
              position: "relative",
              height: "480px",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.1)",
                borderRadius: "5px",
                outline: "1px solid slategrey",
              },
            }}
          >
            {orderItem?.itemList.map((item, i) => {
              return (
                <Card
                  sx={{
                    display: "flex",
                    position: "relative",
                    marginBottom: "1rem",
                  }}
                  key={i}
                >
                  <CardContent>
                    <Box
                      display={"flex"}
                      justifyContent="space-between"
                      alignItems={"center"}
                      sx={{ gap: "1rem" }}
                    >
                      <Box>
                        <Image src={item.image} width={120} height={120} alt={item.name} />
                      </Box>
                      <Box>
                        <Box display={"flex"} alignItems={"center"}>
                          <Typography variant="body1">{item.name}</Typography>
                          <Chip label={item.type} />
                        </Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{ gap: "0.5rem" }}
                        >
                          <Typography variant="body1" fontWeight={600}>
                            ระดับความหวาน :
                          </Typography>
                          <Typography variant="body1" ml={1}>
                            {item.sweetLevel} %
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
                          {item.addWhipCream && <Chip label="whip cream" />}
                          {item.addBubble && <Chip label="Bubble" />}
                          {item.addBrownie && (
                            <Chip label="brownie chocolate" />
                          )}
                          {item.addCoffeeShot && <Chip label="coffee shot" />}
                          {!item.addWhipCream &&
                            !item.addBubble &&
                            !item.addBrownie &&
                            !item.addCoffeeShot &&
                            "-"}
                        </Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{ gap: "0.5rem" }}
                        >
                          <Typography variant="body1">
                            ราคา : {item.price} บาท
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{ gap: "0.5rem" }}
                        >
                          <Typography variant="body1">
                            ราคาเพิ่มเติม : {item.addOnPrice} บาท
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{ gap: "0.5rem" }}
                        >
                          <Typography variant="body1">
                            รวม : {(item.price + item.addOnPrice) * item.qty}{" "}
                            บาท
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>
      </Modal>
    </Card>
  );
};
