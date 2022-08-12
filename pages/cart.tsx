import React, { useState } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Divider,
  Button,
  Card,
  CardContent,
  Stack,
  Modal
} from "@mui/material";

import { CardList } from "../components/cart";
import moment from "moment";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../store/store";
import { SessionProvider, useSession } from 'next-auth/react';
import { insertOrder } from "../store/slices/orderSlice";
import { setCartToEmpty } from "../store/slices/cartSlice";
import { useRouter } from "next/router";
import { singleCartType } from "../types/cart_types";
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const {order} = useAppSelector(state=>state.order)
  const dispatch = useAppDispatch()
  const { data: session } = useSession()
  // console.log(session)
  const router=useRouter()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Container sx={{ marginTop: "5rem" }}>
      <Grid container spacing={2} flexDirection={{xs:'column-reverse',md:'row-reverse'}}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            border: "1px solid #fff",
          }}
        >
          <Card>
            <CardContent>
              <Box
                sx={{
                  width: "100%",
                  // maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  สรุปรายการคำสั่งซื้อ
                </Typography>

                <Divider sx={{ my: 1 }} />
                <Stack>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body1">รวม :</Typography>
                    <Typography variant="body1">
                      {cart.reduce(
                        (prev:number, cur:{price:number,addOnPrice:number,qty:number}) =>
                          prev + (cur.price + cur.addOnPrice) * cur.qty,
                        0
                      )}{" "}
                      บาท
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body1">ส่วนลด :</Typography>
                    <Typography variant="body1">0.00 บาท</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body1">รวมทั้งบิล :</Typography>
                    <Typography variant="body1">
                      {cart.reduce(
                        (prev:number, cur:{price:number,addOnPrice:number,qty:number}) =>
                          prev + (cur.price + cur.addOnPrice) * cur.qty,
                        0
                      )}{" "}
                      บาท
                    </Typography>
                  </Box>
                  <Stack spacing={1} mt={1}>
                    <Button variant="contained" onClick={handleOpen} disabled={cart.length == 0 }>ชำระเงิน</Button>
                    <Button variant="outlined">
                  <Link href="/menu">
                    <a>เลือกเครื่องดื่มเพิ่ม</a>
                  </Link>
                </Button>
                  </Stack>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box display="flex" sx={{ gap: "1rem" }} flexDirection="column">
            <Typography variant="h5" align="center">
              ตะกร้า
            </Typography>
            <Divider sx={{ margin: "1rem 0" }} />

            {cart.length > 0 ? (
              cart.map((cartItem:singleCartType, i:number) => {
                return (
                  <Box key={i}>
                    <CardList {...cartItem }/>
                    <Divider sx={{ margin: "1rem 0" }} />
                  </Box>
                );
              })
            ) : (
              <Box display={'flex'} justifyContent="center" flexDirection={"column"} alignItems="center" gap={2}>
              <Typography variant="body2">
                ยังไม่มี Item ในตะกร้า ต้องการเลือกเครื่องดื่มใช่หรือไม่?
              </Typography>
                <Button variant="text" >
                  <Link href="/menu">
                    <a>เลือกเครื่องดื่มเพิ่ม</a>
                  </Link>
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ยืนยันคำสั่งซื้อ ?
          </Typography>
          <Divider/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ยอดชำระเงิน ทั้งหมด  {cart.reduce(
                        (prev:number, cur:{price:number,addOnPrice:number,qty:number}) =>
                          prev + (cur.price + cur.addOnPrice) * cur.qty,
                        0
                      )}  บาท
          </Typography>
          <Box display='flex' justifyContent='center' gap={2} mt={2}>
            <Button variant="contained" onClick={()=>{
              dispatch(insertOrder({
              id:order.length+1,
              orderDate:moment().format('DD-MM-YYYY HH:mm'),
              status:'waiting',
              itemList:cart
            }))
            dispatch(setCartToEmpty({}))
            handleClose()
            router.push('/order')
          }
          
          }>ยืนยัน</Button>
            <Button variant="outlined" onClick={handleClose}>ยกเลิก</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Cart;

// cart.auth = true