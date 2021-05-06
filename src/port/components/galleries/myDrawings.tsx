import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Paginator } from "primereact/paginator";

// import DrawingCard from '../../common/drawingCard';
import PageHeader from "../../common/pageHeader";
import { GOP } from "../../interfaces/genericObjectProps";
import { deleteDrawing, getMyDrawings } from "../../services/drawingsService";
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

class MyDrawings extends Component {
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
        data: { data, total, skip: first },
      } = await getMyDrawings(_skip ?? 0);

      const {
        data: { favorites },
      } = await getCurrentUserDetails();

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

  handleDeleteDrawing = async (id: string, index: number): Promise<void> => {
    const { drawings } = this.state;
    try {
      this.setState({ drawings: [...drawings].filter((_, i) => i !== index) });
      await deleteDrawing(id);
      await this.getData();
    } catch (error) {
      this.setState({ drawings });
      // eslint-disable-next-line no-console
      const {
        response: {
          data: { code, name },
        },
      } = error;
      toast.error(`Error(${code}): ${name}`, {
        position: "top-center",
        autoClose: 2500,
      });
    }
  };

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
        <PageHeader titleText="Drawing Collection" />
        <div className="my-4 col-12 text-center">
          <h6>Your drawing Collection</h6>

          {$paginator}
          <div className="row drawingListContainer">
            {total ? (
              <FavoritesContext.Provider value={favorites}>
                <List
                  basePath="my-drawings"
                  drawings={drawings}
                  emitDelete={(id: string, i: number) =>
                    this.handleDeleteDrawing(id, i)
                  }
                  emitFavoriteAction={(dNum: string | number, isAdd: boolean) =>
                    this.handleFavorite(dNum, isAdd)
                  }
                />
              </FavoritesContext.Provider>
            ) : (
              <div className={`mx-auto ${loading ? "text-info" : ""}`}>
                {loading ? "LOADING" : "No drawings yet"}...
              </div>
            )}
          </div>
          {$paginator}
          <Link className="btn btn-info mt-2" to="/create-drawing">
            Create a new drawing
          </Link>
        </div>
      </div>
    );
  }
}

export default MyDrawings;
