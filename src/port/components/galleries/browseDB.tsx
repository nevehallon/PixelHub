/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import { toast } from "react-toastify";

import { Button } from "primereact/button";
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
  search: string;
}

export default class Browse extends Component {
  state: State = {
    drawings: [],
    favorites: [],
    loading: true,
    first: 0,
    rows: 10,
    total: 0,
    search: "",
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
    const { search: q } = this.state;
    await this.getData(first, q && `&$search=${q}`);
    this.setState(
      {
        first,
      },
      () => console.log(q, this.state)
    );
  };

  async getData(_skip?: number, ...rest: any): Promise<void> {
    console.log(rest);
    try {
      const {
        data: { favorites },
      } = await getCurrentUserDetails();

      const {
        data: { data, total, skip: first },
      } = await getDrawing("", _skip ?? 0, true, rest);

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

  handleSearch = async (val: string): Promise<void> => {
    await this.getData(0, `&$search=${val}`);
  };

  render(): React.ReactNode {
    const {
      drawings,
      loading,
      favorites,
      first,
      total,
      rows,
      search,
    } = this.state;

    const $paginator = total > rows - 1 && (
      <Paginator
        first={first}
        onPageChange={this.onPageChange}
        pageLinkSize={3}
        rows={rows}
        totalRecords={total}
      />
    );

    return (
      <div className="container">
        <PageHeader titleText="Find what you're looking for" />

        <div className="my-4 col-12 text-center">
          <div className="p-inputgroup">
            <span className="p-input-icon-left p-float-label">
              <i className="pi pi-search" />
              <InputText
                id="search"
                onChange={(e) => this.setState({ search: e.target.value })}
                onKeyUp={({ key }) =>
                  key === "Enter" && this.handleSearch(search.trim())
                }
                type="search"
                value={search}
              />
              <label htmlFor="search">Search</label>
            </span>
            <Button
              label="Go!"
              onClick={() => search && this.handleSearch(search.trim())}
            />
          </div>
          {$paginator}
          <div className="row drawingListContainer">
            {total ? (
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
          {$paginator}
        </div>
      </div>
    );
  }
}
