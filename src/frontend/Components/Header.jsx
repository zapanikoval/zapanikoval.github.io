import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import CloseIcon from "@material-ui/icons/Close";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "../Styles/Header.scss";
import logoTheme from "../Images/logo-theme.png";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { logOutUser } from "../Redux/Actions/auth/actions";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      showMenuContent: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    this.props.dispatch(logOutUser());
  }

  toggleMenu() {
    this.setState(prevState => {
      return {
        menuActive: !prevState.menuActive
      };
    });
    if (this.state.showMenuContent === false) {
      setTimeout(() => {
        this.setState(prevState => {
          return {
            showMenuContent: !prevState.showMenuContent
          };
        });
      }, 200);
    } else if (this.state.showMenuContent === true) {
      this.setState(prevState => {
        return {
          showMenuContent: !prevState.showMenuContent
        };
      });
    }
  }

  componentDidUpdate() {
    if (this.state.menuActive === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  render() {
    console.log(this.props.auth);

    return (
      <header className="header">
        <div
          className="back-blur"
          style={
            this.state.menuActive
              ? { height: "100vh", width: "100vw", zIndex: 2001 }
              : { height: "0", width: "0", zIndex: 0 }
          }
          onClick={this.toggleMenu}
        ></div>
        <div
          className="menu"
          style={
            this.state.menuActive
              ? { marginLeft: "0" }
              : { marginLeft: "-320px" }
          }
        >
          {this.state.showMenuContent && (
            <div className="close-button">
              <Fab className="close-fab" size="small" onClick={this.toggleMenu}>
                <CloseIcon fontSize="small" />
              </Fab>
            </div>
          )}
          {this.state.showMenuContent && (
            <nav className="nav flex-column nav-menu">
              <img src={logoTheme} alt="Кинотеатр имени Маяковского" />
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/release"
                onClick={this.toggleMenu}
              >
                Сейчас в кино
              </NavLink>
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/soon"
                onClick={this.toggleMenu}
              >
                Скоро в прокате
              </NavLink>
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/cinema"
                onClick={this.toggleMenu}
              >
                Кинотеатр
              </NavLink>
              {this.props.auth.role === "admin" && (
                <NavLink
                  activeClassName="active"
                  className="nav-link"
                  to="/admin"
                  onClick={this.toggleMenu}
                >
                  Редактировать
                </NavLink>
              )}
            </nav>
          )}
        </div>
        <div className="contorls">
          <Button
            style={{ height: "100%", outline: "none" }}
            onClick={this.toggleMenu}
          >
            <MenuIcon style={{ color: "white" }} />
          </Button>
          <NavLink className="header-name" to="/">
            <h1>Кинотеатр имени Маяковского</h1>
            <div className="logo">
              <img src={logoTheme} alt="logo" className="logo-img"></img>
            </div>
          </NavLink>
        </div>
        {!this.props.auth.userName ? (
          <div className="login">
            <NavLink to="/auth/login" className="nav-link">
              <ExitToAppIcon />
              <p>Войти</p>
            </NavLink>
          </div>
        ) : (
          <div className="logged">
            <p>
              Привет, <span>{this.props.auth.userName}</span>
            </p>
            <div className="logout" onClick={this.handleLogOut}>
              <p>Выйти</p>
            </div>
          </div>
        )}
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Header);
