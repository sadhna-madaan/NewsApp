import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component"; // Uncomment if InfiniteScroll will be used

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired, // apiKey is assumed required
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
      totalResults: 0, // Corrected to start from 0
    };
    document.title = `${this.capitalFirstletter(this.props.category)} - NewsTime`;
  }

  async updateNews() {
    this.setState({ loading: true });
    const { country, category, apiKey, pageSize } = this.props;
    const { page } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`); // Error handling if fetch fails
      const parsedData = await response.json();

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

  componentDidMount() {
    this.updateNews();
  }

  handleNextClick = () => {
    // Guard against moving past the last page
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) return;

    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      () => this.updateNews()
    );
  };

  handlePrevClick = () => {
    // Guard against moving before the first page
    if (this.state.page <= 1) return;

    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      () => this.updateNews()
    );
  };

  render() {
    const { articles, loading, page, totalResults } = this.state;
    const { category, pageSize } = this.props;
    return (
      <div style={{ padding: "20px 0" }}>
        <h1 className="text-center" style={{ margin: "90px 0px 40px 0px" }}>
          NewsTime - Top {this.capitalFirstletter(category)} Headlines
        </h1>
        {loading && <Spinner />}
        {/* Uncomment the following block if using InfiniteScroll */}
        {/* <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        > */}
        <div className="container">
          <div className="row">
            {!loading &&
              articles.map((element) => (
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
              ))}
          </div>
        </div>
        {/* </InfiniteScroll> */}
        <div className="container d-flex justify-content-between" style={{ marginBottom: "20px" }}>
          <button
            type="button"
            className="btn btn-dark"
            disabled={page <= 1}
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            disabled={page + 1 > Math.ceil(totalResults / pageSize)}
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
