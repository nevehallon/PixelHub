import {
  Avatar,
  Box,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { GOP } from "../../../interfaces/genericObjectProps";
import { UserDetails } from "../../../interfaces/UserDetails";

// const user = {
//   avatar: "",
//   city: "",
//   country: "",
//   jobTitle: "",
//   name: "",
//   timezone: "",
// };

const AccountProfile = ({
  user: { avatar, name, country, timezone },
}: {
  user: UserDetails & GOP;
}): JSX.Element => (
  <Card /* {...props} */>
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
        <Typography variant="body1">
          {/* {`${moment().format("hh:mm A")} ${timezone}`} */}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        className="p-button p-button-rounded p-button-outlined p-button-text p-button-lg d-inline-block"
        icon="pi pi-pencil"
        label="Edit Picture"
      />
    </CardActions>
  </Card>
);

export default AccountProfile;
