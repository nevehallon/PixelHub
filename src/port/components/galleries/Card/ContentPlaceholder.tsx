import { memo } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "primereact/button";

export const ContentPlaceholder = memo(
  ({ description, painterInfo }: { description: string; painterInfo: any }) => {
    const history = useHistory();
    const { name, _id } = painterInfo;
    return (
      <div className="content-container">
        <p>{description}</p>
        {painterInfo && (
          <div className="d-flex justify-content-between mx-1">
            <span>By: {name}</span>
            <Button
              className="my-1 p-button-rounded p-button-text d-inline-block"
              icon="pi pi-user"
              label="See profile"
              onClick={() => {
                history.push(`/user/${_id}`);
              }}
            />
          </div>
        )}
      </div>
    );
  }
);

export default ContentPlaceholder;
