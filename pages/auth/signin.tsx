import React, { useState } from "react";
import { signIn } from "next-auth/react";
import {
  Box,
  Paper,
  Grid,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

interface FromInput {
  username: string;
  password: string;
}

const Signin = () => {
  const { control, handleSubmit } = useForm();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const onSubmit:any = async (data:FromInput) => {
    const res:any = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
      callbackUrl: `${window.location.origin}`,
    });
    if (res.url) router.push(res.url);
    else {
      setErrorMsg("ตรวจสอบ Username หรือ Password ให้ถูกต้อง");
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    }
  };
  return (
    <Container sx={{ paddingBlockStart: "2rem" }}>
      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        alignItems="center"
      >
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: "2rem", margin: "2rem" }}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems="center"
              flexDirection={"column"}
            >
              <Typography variant="h4">เข้าสู่ระบบ</Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{ gap: "1rem" }}
                  display="flex"
                  my={2}
                  flexDirection={"column"}
                >
                  <Controller
                    control={control}
                    name="username"
                    render={({ field }) => (
                      <TextField
                        placeholder="Username"
                        label="Username"
                        variant="outlined"
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <TextField
                        placeholder="Password"
                        label="Password"
                        variant="outlined"
                        onChange={(e) => field.onChange(e.target.value)}
                        type="password"
                      />
                    )}
                  />
                </Box>
                <Box
                  sx={{ gap: "1rem" }}
                  display="flex"
                  my={2}
                  justifyContent="center"
                >
                  <Button variant="contained" type="submit">
                    เข้าสู่ระบบ
                  </Button>

                  <Button variant="text">สมัครสมาชิก</Button>
                </Box>
              </form>
              <Typography>
                Username : karn.yong@mecallapi.com
              </Typography>
              <Typography>
                Password : mecallapi
              </Typography>
              {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signin;
