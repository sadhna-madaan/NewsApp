import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  // Corrected propTypes
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired, // Assuming apiKey is required
  };

  capitalFirstletter = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults: 1,
    };
    document.title = `${this.capitalFirstletter(this.props.category)} - NewsTime`;
  }

  async updateNews() {
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to fetch news:", error);
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    // Guard against moving past the last page
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) return;

    // Update the page state correctly and fetch new data
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      () => this.updateNews()
    );
  };

  handlePrevClick = async () => {
    // Guard against moving before the first page
    if (this.state.page <= 1) return;

    // Update the page state correctly and fetch new data
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      () => this.updateNews()
    );
  };

  render() {
    return (
      <div style={{ padding: "20px 0" }}>
        <div>
          <h1 className="text-center" style={{ margin: "90px 0px 40px 0px" }}>
            NewsTime - Top {this.capitalFirstletter(this.props.category)} Headlines
          </h1>
          {this.state.loading && <Spinner />}
          {/* <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.totalResults}
            loader={<Spinner />}
          > */}
          <div className="container">
            <div className="row">
              {!this.state.loading &&
                this.state.articles &&
                this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title || "No Title"}
                        description={element.description || "No Description"}
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author || "Unknown"}
                        date={element.publishedAt}
                        source={element.source.name || "Unknown"}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          {/* </InfiniteScroll> */}
          <div className="container d-flex justify-content-between" style={{ marginBottom: "20px" }}>
            <button
              type="button"
              className="btn btn-dark"
              disabled={this.state.page <= 1}
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="btn btn-dark"
              disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
              onClick={this.handleNextClick}
            >
              Next &rarr; For more
            </button>
          </div>
        </div>
      </div>
    );
  }
}
