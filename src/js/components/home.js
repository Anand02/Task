import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Row, Col } from "react-bootstrap";
import LazyLoad from "react-lazy-load";
import {getMovies,updateSearchKey,filterMovies,asyncFilterMovies} from "../actions/index";
import Spinner from '../Spinner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      searchKey: "",
      page: 1,
      init: true,
      isVisible: false,
      isMobile: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.showHead = this.showHead.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    this.props.actions.getMovies(this.state.page, false);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  genImage(image, index, length) {
    return (
      <LazyLoad height={158}>
        <div
          style={{
            alignItems: "center",
            overflow: "hidden"
          }}
        >
          <img
            style={{
              width: "100%"
            }}
            src={
              `./assets/${image}` ||
              `./assets/placeholder_for_missing_posters.png`
            }
            alt={`./assets/placeholder_for_missing_posters.png`}
          />
        </div>
      </LazyLoad>
    );
  }

  showPosts() {
    return this.props.movies.length > 1 ? (
      this.props.movies.map((post, index) => {
          console.log("check--->",post)
        const image = post["poster-image"];
        return (
          <Col
            xs={4}
            key={index}
            style={{
              float: "left",
              marginBottom: "-15px",
              marginRight: "0px",
              marginLeft: "0px"
            }}
          >
            <div
              style={{
                display: "inline-block"
              }}
            >
              <div style={{ paddingBottom: "-80px" }}>
                {this.genImage(image, index, this.props.movies.length)}
              </div>
              <p style={{ color: "#ffffff", fontSize: "3vw" }}>{post.name}</p>
            </div>
          </Col>
        );
      })
    ) : (
        <Spinner />
    );
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({ searchKey: e.target.value });
    if (e.target.value.trim().length > 1) {
      this.props.actions.updateSearchKey(this.state.searchKey);
      this.props.actions.asyncFilterMovies(this.props.search.searchKey);
    }
    return;
  }

  onKeyDown(e) {
    if (e.keyCode === 8) {
      this.setState({ page: 1 });
      this.setState({ searchKey: "" });
      this.props.actions.getMovies(1, true);
      this.props.actions.updateSearchKey("");
    }
  }

  showHead() {
    return (
      <div style={{ position: "sticky", top: "0" }}>
        <div
          style={{
            marginTop: "30px",
            marginBottom: "10px",
            maxHeight: "190px"
          }}
        >
          <span>
            {/* <p style={{ color: 'white' }}>Search :  */}
              <input
              type="text"
              placeholder="Enter Name To Search"
              onChange={e => this.handleSearch(e)}
              onKeyDown={this.onKeyDown}
              value={this.state.searchKey}
              style={{
                border: "1px solid #2c2c2d",
                display: "inline",
                backgroundColor: "#C0C0C0",
                color: "#212F3D",
                fontSize: "4vw",
                marginLeft: "20px",
                outline: "none",
               
              }}
             
            />
           {/* <button> Search </button> */}
           {/* </p> */}
          </span>
          <button  style={{
              display: "inline",
              float: "right",
              paddingTop: "0px",
              paddingRight: "20px",
              position: 'absolute',
              margin: "-6px",
              right:" 38px",
              bottom: "4px",
            }} onClick={e => this.handleSearch(e)}>
           Search
        </button>
          {/* <input
            type="button"
            src="./assets/search.png"
            // value="Search"
            alt="search"
            width="48"
            height="28"
            onClick={e => this.handleSearch(e)}
            style={{
              display: "inline",
              float: "right",
              paddingTop: "0px",
              paddingRight: "20px",
              position: 'absolute',
              margin: "-6px",
              right:" 38px",
              bottom: "4px",
            }}
          /> */}
        </div>
      </div>
    );
  }
  fetchMovies(page) {
    this.props.actions.getMovies(this.state.page, false);
  }

  handleScroll = event => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 400
    ) {
      if (this.state.page < 3) {
        this.setState({ page: this.state.page + 1 });
        this.fetchMovies(this.state.page);
      }
    }
  };

  render() {
    const renderMovies = this.showPosts();
    const renderHead = this.showHead();
    return(
      <div className="" style={{ backgroundColor: '#000000'}}>
        <div>{renderHead}</div>
        {renderMovies
        ?  <Container>
            <div>
                <Row>{renderMovies}</Row>
            </div>
            </Container>
        :  <Spinner/>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { movies: state.movies, search: state.search };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { getMovies, updateSearchKey, filterMovies, asyncFilterMovies },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);