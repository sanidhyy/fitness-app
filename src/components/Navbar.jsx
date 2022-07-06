import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

import Logo from "../assets/images/Logo.png";

// Navbar
const Navbar = () => {
  return (
    <Stack
      direction="row"
      justify-content="space-around"
      sx={{
        gap: { sm: "122px", xs: "40px" },
        mt: { sm: "32px", xs: "20px" },
        justifyContent: "none",
      }}
      px="20px"
    >
      {/* Brand Logo */}
      <Link to="/">
        <img
          src={Logo}
          alt="Golds Gym"
          style={{ width: "48px", height: "48px", margin: "0 20px" }}
        />
      </Link>

      {/* Navbar Links */}
      <Stack direction="row" gap="40px" fontSize="24px" alignItems="flex-end">
        {/* Home */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#3A1212",
            borderBottom: "3px solid #FF2625",
          }}
        >
          Home
        </Link>
        {/* Exercises */}
        <a
          href="/#exercises"
          style={{ textDecoration: "none", color: "#3A1212" }}
        >
          Exercises
        </a>
      </Stack>
    </Stack>
  );
};

export default Navbar;
