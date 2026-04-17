import { useState } from "react";
import Layout from "@/components/Layout";
import Home from "./Home";
import Chemistry from "./Chemistry";
import Food from "./Food";
import Price from "./Price";
import About from "./About";
import Admin from "./Admin";

export default function Index() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home": return <Home onNavigate={setPage} />;
      case "chemistry": return <Chemistry />;
      case "food": return <Food />;
      case "price": return <Price />;
      case "about": return <About />;
      case "admin": return <Admin />;
      default: return <Home onNavigate={setPage} />;
    }
  };

  return (
    <Layout currentPage={page} onNavigate={setPage}>
      {renderPage()}
    </Layout>
  );
}
