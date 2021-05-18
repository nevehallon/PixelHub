/* eslint-disable react/jsx-max-props-per-line */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Box, Container, Grid } from "@material-ui/core";
import PaletteIcon from "@material-ui/icons/Palette";

import PageHeader from "../../../common/pageHeader";
import { GOP } from "../../../interfaces/genericObjectProps";
import { UserDetails } from "../../../interfaces/UserDetails";
import { getCurrentUser, getUserDetails } from "../../../services/userService";
import Browse from "../../galleries/browseDB";
import AccountProfile from "./accountProfile";
import AccountProfileDetails from "./accountProfileForm";

const Profile = (): any => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const { id } = useParams<GOP>();

  const populateUserDetails = async () => {
    try {
      const visiter = getCurrentUser();
      const { data } = await getUserDetails(id);
      setUser(data);
      setIsOwner(data._id === (visiter as UserDetails)?._id);
    } catch (error) {
      toast.error(`Error(${error})`, {
        position: "top-center",
        autoClose: 2500,
      });
    }
  };

  useEffect(() => {
    populateUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Helmet>
        <title>Account | PixelHub</title>
      </Helmet>
      <PageHeader titleText={`${isOwner ? "My" : ""} PixelHub Profile`} />
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
                <AccountProfile
                  isOwner={!!isOwner}
                  setUserDetails={(rest: GOP) => setUser({ ...user, ...rest })}
                  user={user}
                />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                {isOwner ? (
                  <AccountProfileDetails user={user} />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyItems: "center",
                    }}
                  >
                    <PaletteIcon
                      className="paletteIcon"
                      style={{ width: "100%", height: "50px" }}
                    />
                  </div>
                )}
              </Grid>
            </Grid>
            {!isOwner && <Browse id={id} userToDisplay={user} />}
          </Container>
        )}
      </Box>
    </>
  );
};

export default Profile;
