import React, { useState, useEffect } from "react";
import {  GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import {
  Box,
  Grid,
  Container,
  Typography,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Image from "next/image";
import FormGroup from "@mui/material/FormGroup";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { insertInit, addItemToCart } from "../../store/slices/cartSlice";
import { useRouter } from "next/router";
import { menu } from "../../constant/data";
import { useForm, Controller, SubmitHandler, useWatch } from "react-hook-form";
import {  useSession, signIn,  } from "next-auth/react";

import { singleMenuType } from "../../types/menu_types";

interface IParams extends ParsedUrlQuery {
  id: string
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // ...
//   const { id } = context.params as IParams
//   const singleMenu = menu.find((el:{id:string|number}) => el.id == id);

//   return {
//     props: {
//       singleMenu,
//     },
//   };
// }


interface FromInput {
  sweetLevel: string;
  addWhipCream: boolean;
  addBrownie: boolean;
  addCoffeeShot: boolean;
  addBubble: boolean;
}

const SinglePageMenu:React.FC = () => {
  const {query} = useRouter();
  
  const { cart } = useAppSelector((state) => state.cart);
  const singleMenu  = menu.find((el)=>el.id == +query.id!)  as singleMenuType
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<FromInput>();
  const [addOnPrice, setAddOnPrice] = useState(0);
  const formWatch = useWatch({
    control,
    name: ["addWhipCream", "addBrownie", "addCoffeeShot", "addBubble"],
  });
  const addonPriceConstant = [15, 20, 15, 15];
  const { data: session } = useSession();
  const onSubmit: SubmitHandler<FromInput> = (data) => {
    if (session) {
      const insertedItem = {
        id: cart.length + 1,
        name: singleMenu.name,
        type: singleMenu.type,
        image: singleMenu.img[0],
        price: +singleMenu.price,
        addOnPrice: +addOnPrice,
        sweetLevel: data.sweetLevel,
        addBrownie: data.addBrownie,
        addBubble: data.addBubble,
        addCoffeeShot: data.addCoffeeShot,
        addWhipCream: data.addWhipCream,
        qty: 1,
      };
      dispatch(addItemToCart(insertedItem));
    } else {
      signIn();
    }
  };
  useEffect(()=>{

  },[])
  useEffect(() => {
    // console.log(formWatch)
    const result = formWatch.reduce(
      (acc, cur, i) => (cur ? acc + addonPriceConstant[i] : acc),
      0
    );
    setAddOnPrice(result);
  }, [formWatch]);

  return (
    <Container sx={{ marginTop: "5rem" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item md={5} xs={12}>
            <Image
              src={singleMenu.img[0]||''}
              layout="responsive"
              width={200}
              height={200}
            />
          </Grid>
          <Grid item md={7} xs={12}>
            <Box m={3}>
              <Box display="flex" alignItems="center" sx={{ gap: "1rem" }}>
                <Typography variant="h4" mb={1}>
                  {singleMenu ? singleMenu.name : null}
                </Typography>
                <Chip label={singleMenu ? singleMenu.type : null} />
              </Box>
              <Divider />
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      เลือกระดับความหวาน
                    </FormLabel>
                    <RadioGroup>
                      <FormControlLabel
                        control={
                          <Controller
                            name="sweetLevel"
                            control={control}
                            defaultValue={"100"}
                            render={({ field }) => (
                              <Radio
                                value={"100"}
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            )}
                          />
                        }
                        label="100%"
                      />
                      <FormControlLabel
                        control={
                          <Controller
                            name="sweetLevel"
                            control={control}
                            defaultValue={"50"}
                            render={({ field }) => (
                              <Radio
                                value={"50"}
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            )}
                          />
                        }
                        label="50%"
                      />
                      <FormControlLabel
                        control={
                          <Controller
                            name="sweetLevel"
                            control={control}
                            defaultValue={"25"}
                            render={({ field }) => (
                              <Radio
                                value={"25"}
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            )}
                          />
                        }
                        label="25%"
                      />
                      <FormControlLabel
                        control={
                          <Controller
                            name="sweetLevel"
                            control={control}
                            defaultValue={"0"}
                            render={({ field }) => (
                              <Radio
                                value={"0"}
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            )}
                          />
                        }
                        label="0%"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Divider />
                </Box>
                <Box>
                  <FormGroup>
                    <FormLabel id="demo-radio-buttons-group-label">
                      เลือกท็อปปิ้ง
                    </FormLabel>

                    <FormControlLabel
                      control={
                        <Controller
                          name="addWhipCream"
                          control={control}
                          defaultValue={false}
                          render={({ field }) => (
                            <Checkbox
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                            />
                          )}
                        />
                      }
                      label={
                        <Box display="flex" sx={{ gap: "2rem" }}>
                          <Typography variant="body1">วิปครีม</Typography>
                          <Typography variant="body1">(+15 บาท)</Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Controller
                          name="addBrownie"
                          control={control}
                          defaultValue={false}
                          render={(props) => (
                            <Checkbox
                              checked={props.field.value}
                              onChange={(e) =>
                                props.field.onChange(e.target.checked)
                              }
                            />
                          )}
                        />
                      }
                      label={
                        <Box display="flex" sx={{ gap: "2rem" }}>
                          <Typography variant="body1">บราวนี่</Typography>
                          <Typography variant="body1">(+20 บาท)</Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Controller
                          name="addCoffeeShot"
                          control={control}
                          defaultValue={false}
                          render={(props) => (
                            <Checkbox
                              checked={props.field.value}
                              onChange={(e) =>
                                props.field.onChange(e.target.checked)
                              }
                            />
                          )}
                        />
                      }
                      label={
                        <Box display="flex" sx={{ gap: "2rem" }}>
                          <Typography variant="body1">ช็อตกาแฟ</Typography>
                          <Typography variant="body1">(+15 บาท)</Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Controller
                          name="addBubble"
                          control={control}
                          defaultValue={false}
                          render={(props) => (
                            <Checkbox
                              checked={props.field.value}
                              onChange={(e) =>
                                props.field.onChange(e.target.checked)
                              }
                            />
                          )}
                        />
                      }
                      label={
                        <Box display="flex" sx={{ gap: "2rem" }}>
                          <Typography variant="body1">ไข่มุก</Typography>
                          <Typography variant="body1">(+15 บาท)</Typography>
                        </Box>
                      }
                    />
                  </FormGroup>
                  <Divider />
                </Box>
                <Box my={5}>
                  <Box display="flex" justifyContent="end">
                    <Button
                      variant="outlined"
                      sx={{ display: "flex", gap: "1rem" }}
                      type="submit"
                    >
                      <Typography variant="body1">เพิ่มลงตะกร้า</Typography>
                      <Typography variant="body1">
                        ({singleMenu?.price + addOnPrice} บาท)
                      </Typography>
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SinglePageMenu;
