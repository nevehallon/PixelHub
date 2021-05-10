import PageHeader from "../../common/pageHeader";

const Home = (): any => (
  <div className="container text-center">
    <PageHeader titleText="PixelHub Home Page" />
    {/*           ${(<i className="fas fa-paint-brush"></i>)}  */}
    <div className="row pt-5">
      <div className="col-12">
        <h4>
          Create and share stunning pixel art, as well as game sprites and
          icons. PixelHub is a free and easy to use website for users of all
          ages!
        </h4>
      </div>
    </div>
  </div>
);

export default Home;
