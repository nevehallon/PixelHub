import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";

import PageHeader from "../../common/pageHeader";
import { GOP } from "../../interfaces/genericObjectProps";
import { getDrawing } from "../../services/drawingsService";
import FavoritesContext from "../../services/favoritesContext";
import {
  addFavorite,
  getCurrentUserDetails,
  removeFavorite,
} from "../../services/userService";
import "./styles.scss";
import { List } from "./CardList";

interface State {
  drawings: any[];
  favorites: any[];
  loading: boolean;
  first: number;
  rows: number;
  total: number;
}

export default class Browse extends Component {
  state: State = {
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

      const {
        data: { data, total, skip: first },
      } = await getDrawing("", _skip ?? 0);

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
        <PageHeader titleText="Find what you're looking for" />

        <div className="my-4 col-12 text-center">
          <InputText
            placeholder="Search"
            style={{ width: "100%" }}
            type="text"
          />
          {display && P}
          <div className="row drawingListContainer">
            {display ? (
              // path={['/:id', '/']}
              <FavoritesContext.Provider value={favorites}>
                <List
                  basePath="browse"
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
          {display && P}
        </div>
      </div>
    );
  }
}
