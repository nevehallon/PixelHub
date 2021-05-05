import { useRouteMatch } from "react-router-dom";

import Card from "./Card";

export const List = ({
  drawings,
  emitDelete,
  emitFavoriteAction,
  basePath,
}: {
  basePath: string;
  drawings: any;
  emitDelete?: (id: string, i: number) => Promise<void> | undefined;
  emitFavoriteAction: (dNum: string | number, isAdd: boolean) => void;
}): any => {
  const match: any = useRouteMatch(`/${basePath}/:id`);

  return (
    <ul className="d-card-list">
      {drawings.map((drawing: any, i: number) => (
        <Card
          isSelected={match?.params.id === drawing._id}
          {...{ ...drawing, basePath }}
          key={drawing._id}
          onDelete={emitDelete && (() => emitDelete(drawing._id, i))}
          onFavoriteAction={(isAdd: boolean) =>
            emitFavoriteAction(drawing.drawingNumber, isAdd)
          }
        />
      ))}
    </ul>
  );
};

List.defaultProps = {
  emitDelete: undefined,
};

export default { List };
