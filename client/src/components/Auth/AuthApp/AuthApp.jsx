import React from "react";
import {Route, Redirect} from "react-router-dom";

import decode from "jwt-decode";
import {AuthAdmin} from "../AuthAdmin/AuthAdmin";

export const checkAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const {exp} = decode(token);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

export const AuthApp = ({
  ...rest
}) => {
  return (<Route {...rest} render={props => checkAuth()
      ? (<AuthAdmin/>)
      : (<Redirect from="/" exact="exact" to={{
          pathname: "/login"
        }}/>)}/>);
};
