import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import Logo from "../assets/images/Logo-1.png";

// Footer
const Footer = () => {
  return (
    <Box mt="80px" bgColor="#FFF3F4">
      <Stack gap="40px" alignItems="center" px="40px" pt="24px">
        {/* Logo */}
        <img src={Logo} alt="Golds Gym" width="200px" height="40px" />
        {/* Credits */}
        <Typography variant="h5" pb="40px">
          Made with ❤️ by{" "}
          <a
            href="https://github.com/sanidhyy"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#FF2625", textDecoration: "none" }}
          >
            Sanidhya
          </a>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
