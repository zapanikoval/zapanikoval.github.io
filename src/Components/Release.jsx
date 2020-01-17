import React from "react";
import "../Styles/Release.scss";
import FilmCard from "./FilmCard";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

class Release extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftScrollVisible: false,
      rightScrollVisible: true
    };
    this.rightScroll = this.rightScroll.bind(this);
    this.leftScroll = this.leftScroll.bind(this);
    //  this.handleScroll = this.handleScroll.bind(this);
  }

  rightScroll() {
    const width = 306;
    let currentWidth = 0;
    const interval = setInterval(() => {
      if (currentWidth <= width) {
        this.refs.content.scrollBy(4, 0);
        currentWidth += 4;
      } else clearInterval(interval);
    }, 0.3);
    if (this.refs.content.scrollLeft + 308 === 1540) {
      this.setState({
        rightScrollVisible: false,
        leftScrollVisible: true
      });
    } else {
      this.setState({
        rightScrollVisible: true,
        leftScrollVisible: true
      });
    }
  }
  leftScroll() {
    const width = -306;
    let currentWidth = 0;
    const interval = setInterval(() => {
      if (currentWidth >= width) {
        this.refs.content.scrollBy(-4, 0);
        currentWidth -= 4;
      } else clearInterval(interval);
    }, 0.3);
    if (this.refs.content.scrollLeft - 308 === 0) {
      this.setState({
        rightScrollVisible: true,
        leftScrollVisible: false
      });
    } else {
      this.setState({
        rightScrollVisible: true,
        leftScrollVisible: true
      });
    }
  }

  render() {
    return (
      <div className="content" ref="content">
        {this.state.leftScrollVisible && (
          <div className="back">
            <Fab className="button" onClick={this.leftScroll}>
              <ArrowBackIcon fontSize="large" />
            </Fab>
          </div>
        )}
        <FilmCard />
        <FilmCard />
        <FilmCard />
        <FilmCard />
        <FilmCard />
        <FilmCard />
        <FilmCard />
        <FilmCard />
        <FilmCard />
        <FilmCard />
        {this.state.rightScrollVisible && (
          <div className="forward">
            <Fab className="button" onClick={this.rightScroll}>
              <ArrowForwardIcon fontSize="large" />
            </Fab>
          </div>
        )}
      </div>
    );
  }
}

export default Release;