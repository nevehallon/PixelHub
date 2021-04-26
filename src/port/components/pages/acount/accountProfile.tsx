/* eslint-disable react/jsx-max-props-per-line */
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

import {
  Avatar,
  Box,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";

import { GOP } from "../../../interfaces/genericObjectProps";
import { UserDetails } from "../../../interfaces/UserDetails";
import httpService from "../../../services/httpService";
import InputFeedback from "../../drawingActions/inputTextFeedback";
import AlertDialogSlide from "../../galleries/Card/share action/shareDialog";

const url = process.env.GATSBY_API_URL;

const handleSaveAvatar = async (
  e: FormEvent,
  user: any,
  cb: (arg: GOP) => void,
  cb2: VoidFunction
): Promise<void> => {
  e.preventDefault();

  const { value } = (e.nativeEvent
    .target as HTMLFormElement)[0] as HTMLInputElement;

  const body = { ...user, avatarUrl: value };

  try {
    const {
      data: { avatarUrl },
    } = await httpService.patch(`${url}/users/${user._id}`, body);
    toast.success("Account Avatar updated!!", {
      position: "top-center",
      autoClose: 4000,
    });

    cb({ avatarUrl });
    cb2();
  } catch (error) {
    if (!error.response) {
      console.log(error);
      return;
    }

    const {
      response,
      response: { data },
    } = error;

    if (response && data.code) {
      toast.error(data.message, {
        position: "top-center",
        autoClose: data.message.length * 120,
      });
    }
  }
};

// const user = {
//   avatar: "",
//   country: "",
// };
const AccountProfile = ({
  user,
  setUserDetails,
}: {
  user: UserDetails & GOP;
  setUserDetails: (arg: GOP) => void;
}): JSX.Element => {
  const [openDialog, setOpenDialog] = useState(false);

  const { avatarUrl, name, country, _id } = user;

  const src = avatarUrl || "";

  return (
    <Card>
      <CardContent>
        <Box
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            alt="user profile avatar"
            imgProps={{ style: { height: "unset" } }}
            src={src}
            style={{
              height: 150,
              width: 150,
            }}
          />
          <Typography gutterBottom variant="h3">
            {name}
          </Typography>
          {country && <Typography variant="body1">{country}</Typography>}
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className="p-button p-button-rounded p-button-outlined p-button-text p-button-lg d-inline-block"
          icon="pi pi-pencil"
          label="Edit Picture"
          onClick={() => setOpenDialog(true)}
        />
      </CardActions>
      {openDialog && (
        <AlertDialogSlide
          emitClose={() => setOpenDialog(false)}
          title="enter valid image url"
        >
          <form
            onSubmit={(e) =>
              handleSaveAvatar(e, user, setUserDetails, () =>
                setOpenDialog(false)
              )
            }
          >
            <InputFeedback
              currentValue={src}
              label="Image Link"
              maxLength={2048}
              renderInput={(rest: GOP) => (
                <InputText id="avatar" name="avatar" type="url" {...rest} />
              )}
            />
            <Divider />
            <Button label="Save" />
          </form>
        </AlertDialogSlide>
      )}
    </Card>
  );
};

export default AccountProfile;
