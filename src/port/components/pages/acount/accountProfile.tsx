/* eslint-disable react/jsx-max-props-per-line */
import { useState } from "react";

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
import InputFeedback from "../../drawingActions/inputTextFeedback";
import AlertDialogSlide from "../../galleries/Card/share action/shareDialog";

const handleSaveAvatar = (e) => {
  e.preventDefault();
  console.log(e.nativeEvent.srcElement[0].value);
};
// const user = {
//   avatar: "",
//   country: "",
// };

const AccountProfile = ({
  user: { avatar, name, country },
}: {
  user: UserDetails & GOP;
}): JSX.Element => {
  const [openDialog, setOpenDialog] = useState(false);

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
            //   src={avatar}
            style={{
              height: 100,
              width: 100,
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
          <form onSubmit={handleSaveAvatar}>
            <InputFeedback
              currentValue={avatar}
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
