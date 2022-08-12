import Link from "next/link";
import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { menuListUnAuth, menuListAuth, settingList } from "../constant";
import { useAppSelector } from "../store/store";
import {  useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { cart } = useAppSelector((state) => state.cart);
  const { data: session } = useSession();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Coffee Icebear
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: { xs: "end" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {!session
                ? menuListUnAuth.map(({ name, path }) =>
                    path === "/signin" ? (
                      <MenuItem key={name} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center" onClick={()=>signIn()}>
                        
                          <a>{name}</a>
                        
                      </Typography>
                      </MenuItem>
                    ) : (
                      <MenuItem key={name} onClick={handleCloseNavMenu}>
                       <Typography textAlign="center">
                        <Link href={path}>
                          <a>{name}</a>
                        </Link>
                      </Typography>
                      </MenuItem>
                    )
                  )
                : menuListAuth.map(({ name, path }) => (
                    <MenuItem key={name} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link href={path}>
                          <a>{name}</a>
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
              <Divider sx={{ my: 0.5 }} />
              {session && settingList.map(({ name, path }) => (
                <div>
                  {name === "Logout" && <Divider sx={{ my: 0.5 }} />}
                  <MenuItem key={name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link href={path}>
                        <a>{name}</a>
                      </Link>
                    </Typography>
                  </MenuItem>
                </div>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: "3rem",
              justifyContent: "end",
              paddingInlineEnd: "3rem",
            }}
          >
            {!session
              ? menuListUnAuth.map(({ name, path }) =>
                  path === "/signin" ? (
                    <Button
                      key={name}
                      onClick={() => signIn()}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {name}
                    </Button>
                  ) : (
                    <Button
                      key={name}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      <Link href={path}>
                        <a>{name}</a>
                      </Link>
                    </Button>
                  )
                )
              : menuListAuth.map(({ name, path }) => (
                  <Button
                    key={name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link href={path}>
                      {path == "/cart" ? (
                        <Badge
                          badgeContent={
                            !!cart
                              ? `${cart.reduce((a, b) => a + b.qty, 0)}`
                              : "0"
                          }
                          color="error"
                        >
                          <a>{name}</a>
                        </Badge>
                      ) : (
                        <a>{name}</a>
                      )}
                    </Link>
                  </Button>
                ))}
          </Box>
          {session && (
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Typography
                textAlign="center"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                Welcome, {session?.user?.fname}
              </Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={session?.user?.avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settingList.map((setting) => (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Link href={setting.path}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
                <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={() => signOut()}>
                    ออกจากระบบ
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
