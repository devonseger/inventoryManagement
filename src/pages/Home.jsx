import { useState } from "react";
import LoginForm from "../components/LoginForm";
import { isAuthenticated } from "../util/auth";
import Dashboard from "./Dashboard";

export default function Home() {
  return isAuthenticated() ? <Dashboard /> : <LoginForm />;
}
