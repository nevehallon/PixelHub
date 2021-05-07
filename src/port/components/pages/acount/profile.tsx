/* eslint-disable react/jsx-max-props-per-line */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import { Box, Container, Grid } from "@material-ui/core";

import PageHeader from "../../../common/pageHeader";
import { GOP } from "../../../interfaces/genericObjectProps";
import { UserDetails } from "../../../interfaces/UserDetails";
import { getCurrentUserDetails } from "../../../services/userService";
import AccountProfile from "./accountProfile";
import AccountProfileDetails from "./accountProfileForm";

const Profile = ({ owner }: { owner?: boolean }): any => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const { id } = useParams<GOP>();
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
      <PageHeader titleText={`${owner ? "My" : ""} PixelHub Profile`} />
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
        {user && (
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                {owner ? (
                  <AccountProfile
                    setUserDetails={(rest: GOP) =>
                      setUser({ ...user, ...rest })
                    }
                    user={user}
                  />
                ) : (
                  id
                )}
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                {owner ? <AccountProfileDetails user={user} /> : id}
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
    </>
  );
};

Profile.defaultProps = {
  owner: true,
};

export default Profile;
