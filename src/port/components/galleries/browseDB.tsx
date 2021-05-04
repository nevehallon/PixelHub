import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { InputText } from "primereact/inputtext";

import PageHeader from "../../common/pageHeader";
import { getDrawing } from "../../services/drawingsService";
import FavoritesContext from "../../services/favoritesContext";
import {
  addFavorite,
  getCurrentUserDetails,
  removeFavorite,
} from "../../services/userService";
import { FavoritesList } from "./CardList";
import "./styles.scss";

interface MyDrawingsState {
  drawings: any[];
  favorites: any[];
  loading: boolean;
  // [x: string]: any;
}

export default class Browse extends Component {
  state: MyDrawingsState = {
    drawings: [],
    favorites: [],
    loading: true,
  };

  async componentDidMount(): Promise<void> {
    await this.getData();
  }

  componentWillUnmount(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.setState = (state, callback) => {};
    // ? making sure there are no data leaks
  }

  async getData(): Promise<void> {
    try {
      const {
        data: { favorites },
      } = await getCurrentUserDetails();

      const {
        data: { data },
      } = await getDrawing();

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      data.length
        ? this.setState({ loading: false, drawings: data, favorites })
        : this.setState({ loading: false, drawings: [] });
    } catch (error) {
      this.setState({ loading: false, drawings: [] });
      toast.error("Sorry, there was an unexpected error", {
        position: "top-center",
      });
    }
  }

  handleFavorite = async (
    drawingNumber: string | number,
    isAdd = false
  ): Promise<void> => {
    try {
      const { data } = isAdd
        ? await addFavorite(drawingNumber)
        : await removeFavorite(drawingNumber);

      this.setState({
        favorites: data.favorites,
      });
    } catch (error) {
      // console.error(error);
    }
  };

  render(): React.ReactNode {
    const { drawings, loading, favorites } = this.state;

    return (
      <div className="container">
        <PageHeader titleText="Find what you're looking for" />

        <div className="my-4 col-12 text-center">
          <InputText
            placeholder="Search"
            style={{ width: "100%" }}
            type="text"
          />

          <div className="row drawingListContainer">
            {drawings.length ? (
              // path={['/:id', '/']}
              <FavoritesContext.Provider value={favorites}>
                <FavoritesList
                  drawings={drawings}
                  emitFavoriteAction={(dNum: string | number, isAdd: boolean) =>
                    this.handleFavorite(dNum, isAdd)
                  }
                />
              </FavoritesContext.Provider>
            ) : (
              <div className={`mx-auto ${loading ? "text-info" : ""}`}>
                {loading ? "LOADING" : "Nothing to show yet"}...
              </div>
            )}
          </div>
          {/* <Link className="btn btn-info mt-2" to="/create-drawing">
            Create a new drawing
          </Link>
          // TODO: link to drawing browser
          */}
        </div>
      </div>
    );
  }
}
