import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Paginator } from "primereact/paginator";

// import DrawingCard from '../../common/drawingCard';
import PageHeader from "../../common/pageHeader";
import { GOP } from "../../interfaces/genericObjectProps";
import { getDrawing } from "../../services/drawingsService";
import FavoritesContext from "../../services/favoritesContext";
import {
  addFavorite,
  getCurrentUserDetails,
  removeFavorite,
} from "../../services/userService";
import { List } from "./CardList";
import "./styles.scss";

interface MyDrawingsState {
  drawings: any[];
  favorites: any[];
  loading: boolean;
  first: number;
  rows: number;
  total: number;
}

class MyFavorites extends Component {
  state: MyDrawingsState = {
    drawings: [],
    favorites: [],
    loading: true,
    first: 0,
    rows: 10,
    total: 0,
  };

  async componentDidMount(): Promise<void> {
    await this.getData();
  }

  componentWillUnmount(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.setState = (state, callback) => {};
    // ? making sure there are no data leaks
  }

  onPageChange = async ({ first }: GOP): Promise<void> => {
    await this.getData(first);
    this.setState({
      first,
    });
  };

  async getData(_skip?: number): Promise<void> {
    try {
      const {
        data: { favorites },
      } = await getCurrentUserDetails();

      const fav = favorites.map((x) => `&drawingNumber[$in][]=${x}`);

      const {
        data: { data, total, skip: first },
      } = await getDrawing("", _skip ?? 0, true, `?${fav.join("")}`);

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      data.length
        ? this.setState({
            loading: false,
            drawings: data,
            favorites,
            total,
            first,
          })
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
    const { drawings } = this.state;
    try {
      const { data } = isAdd
        ? await addFavorite(drawingNumber)
        : await removeFavorite(drawingNumber);

      this.setState({
        favorites: data.favorites,
        drawings: [...drawings].filter(
          (x) => x.drawingNumber !== drawingNumber
        ),
      });
    } catch (error) {
      // console.error(error);
    }
  };

  render(): React.ReactNode {
    const { drawings, loading, favorites, first, total, rows } = this.state;

    const display = !!drawings.length;

    const P = (
      <Paginator
        first={first}
        onPageChange={this.onPageChange}
        rows={rows}
        totalRecords={total}
      />
    );

    return (
      <div className="container">
        <PageHeader titleText="Favorite Drawing Collection" />
        <div className="my-4 col-12 text-center">
          <h6>Your Favorites</h6>

          {display && P}

          <div className="row drawingListContainer">
            {display ? (
              // path={['/:id', '/']}
              <FavoritesContext.Provider value={favorites}>
                <List
                  basePath="my-favorites"
                  drawings={drawings}
                  emitFavoriteAction={(dNum: string | number, isAdd: boolean) =>
                    this.handleFavorite(dNum, isAdd)
                  }
                />
              </FavoritesContext.Provider>
            ) : (
              <div className={`mx-auto ${loading ? "text-info" : ""}`}>
                {loading ? "LOADING" : "No favorites yet"}...
              </div>
            )}
          </div>
          {display && P}
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

export default MyFavorites;
