/* eslint-disable react/jsx-max-props-per-line */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { Box, Container, Grid } from "@material-ui/core";

import PageHeader from "../../../common/pageHeader";
import { UserDetails } from "../../../interfaces/UserDetails";
import { getCurrentUserDetails } from "../../../services/userService";
import AccountProfile from "./accountProfile";
import AccountProfileDetails from "./accountProfileForm";

const MyProfile = (): any => {
  const [user, setUser] = useState({} as UserDetails);
  const populateUserDetails = async () => {
    const { data } = await getCurrentUserDetails();
    setUser(data);
    console.log(data);
  };

  useEffect(() => {
    populateUserDetails();
  }, []);

  return (
    <>
      <Helmet>
        <title>Account | PixelHub</title>
      </Helmet>
      <PageHeader titleText="My PixelHub Profile" />
      {/* ${(<i className="fas fa-paint-brush"></i>)}
     {JSON.stringify(user.data)} */}
      <Box
        {...{
          sx: {
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 3,
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile user={user} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails user={user} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default MyProfile;
