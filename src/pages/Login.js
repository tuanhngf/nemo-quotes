import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input } from "antd";
import useViewport from "../hooks/useViewport";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [input, setInput] = useState("");
  const { isMobile } = useViewport();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const isAdmin = useSelector((state) => state.QuotesReducer.isAdmin);

  const rootEl = document.getElementById("root");

  if (isMobile) {
    rootEl.style.placeContent = "center";
  }

  if (!isMobile) {
    rootEl.style.placeContent = "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === process.env.REACT_APP_ADMIN) {
      dispatch({ type: "SET_ADMIN" });
      alert("Welcome Back");
      return navigate('/admin')
    }

    return alert("Invalid Code");
  };

  return (
    <S.Box>
      <S.Form onSubmitCapture={handleSubmit}>
        <S.Input
          placeholder={isAdmin ? "Welcome Back" : "Enter admin code"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </S.Form>
    </S.Box>
  );
}

const S = {
  Box: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `,
  Form: styled(Form)`
    width: 300px;
    margin: 1rem;
  `,
  Input: styled(Input)`
    width: 100%;
  `,
};