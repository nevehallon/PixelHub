/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component, FormEvent } from "react";
import { toast } from "react-toastify";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";

import PageHeader from "../../common/pageHeader";
import { GOP } from "../../interfaces/genericObjectProps";
import { UserDetails } from "../../interfaces/UserDetails";
import { getDrawing } from "../../services/drawingsService";
import FavoritesContext from "../../services/favoritesContext";
import {
  addFavorite,
  getUserDetails,
  removeFavorite,
} from "../../services/userService";
import "./styles.scss";
import { List } from "./CardList";

interface favoritesProps {
  id?: string;
  userToDisplay?: UserDetails;
}

interface State {
  drawings: any[];
  favorites: any[];
  loading: boolean;
  first: number;
  rows: number;
  total: number;
  search: string;
}

const resetState = { loading: false, drawings: [], first: 0, total: 0 };

export default class Browse extends Component<favoritesProps> {
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
    window.scrollTo(0, 0);
    await this.getData();
  }

  componentWillUnmount(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.setState = (state, callback) => {};
    // ? insure there are no data leaks
  }

  onPageChange = async ({ first }: GOP): Promise<void> => {
    const { search: q } = this.state;
    await this.getData(first, q.trim() || "");
    this.setState({
      first,
    });
  };

  async getData(_skip?: number, ...rest: any): Promise<void> {
    const { id } = this.props as GOP;

    try {
      const {
        data: { favorites },
      } = await getUserDetails();

      const restArg = id ? `&painterInfo._id=${id}` : rest;

      const {
        data: { data, total, skip: first },
      } = await getDrawing("", _skip ?? 0, true, restArg);

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      data.length
        ? this.setState({
            loading: false,
            drawings: data,
            favorites,
            total,
            first,
          })
        : this.setState(resetState);
    } catch (error) {
      this.setState(resetState);
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
      throw new Error(error);
    }
  };

  handleSearch = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const { value } = (
      e.nativeEvent.target as HTMLFormElement
    )[0] as HTMLInputElement;
    const search = `&$search=${value.trim() || ""}`;

    this.setState({ search });
    await this.getData(0, search);
  };

  render(): React.ReactNode {
    const { id } = this.props;
    const { drawings, loading, favorites, first, total, rows } = this.state;

    const $paginator = total > rows - 1 && (
      <>
        <Paginator
          first={first}
          onPageChange={this.onPageChange}
          pageLinkSize={3}
          rows={rows}
          totalRecords={total}
        />
      </>
    );

    return (
      <div className="container text-center">
        {!id && (
          <>
            <PageHeader titleText="Find what you're looking for" />
            <form onSubmit={(e) => this.handleSearch(e)}>
              <div className="p-inputgroup pt-5">
                <span className="p-input-icon-left p-float-label">
                  <i className="pi pi-search" />
                  <InputText id="search" type="search" />
                  <label htmlFor="search">Search</label>
                </span>
                <Button label="Go!" type="submit" />
              </div>
            </form>
          </>
        )}
        {$paginator}

        <div className="p-card">
          {id && "User has"} {total} drawings <br />
          {!!total && (
            <span>
              displaying {first + 1} - {first + drawings.length}
            </span>
          )}
        </div>

        <div className="row drawingListContainer">
          {total ? (
            <FavoritesContext.Provider value={favorites}>
              <List
                basePath={id ? `user/${id}` : "browse"}
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
    );
  }
}
