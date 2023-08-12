import React, { useEffect, useState } from "react";
import { setUserData } from "../../store/auth";
import { privateAxios } from "../../utils/privateAxios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingSplash from "../LoadingSplash/LoadingSplash";

function Guard({ children }) {
  const nav = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [pending, setPending] = useState(true);

  const getUserInfo = async () => {
    try {
      setPending(true);
      let res = await privateAxios.get("/users/get-user");
      let data = await res.data.data;
      dispatch(setUserData(data));
      setPending(false);
    } catch (error) {
      setPending(false);
      nav("/login");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUserInfo();
    }else {
      setPending(false)
      nav("/login");  
    }
  }, [isLoggedIn]);

  if (pending || !isLoggedIn) {
    return <LoadingSplash />;
  } else {
    return children;
  }
}

export default Guard;
