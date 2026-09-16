import { useEffect } from "react";
import { useRoute } from "./router.js";
import TopNav from "./components/TopNav.jsx";
import GridBackdrop from "./components/GridBackdrop.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Guides from "./pages/Guides.jsx";

const PAGES = {
  "/": Home,
  "/projects": Projects,
  "/guides": Guides,
};

function Footer() {
  return (
    <footer className="footer">
      <p>
        Christos Karagiannis · <a href="mailto:christos.s.karagiannis@gmail.com">christos.s.karagiannis@gmail.com</a>{" "}
        ·{" "}
        <a href="https://www.linkedin.com/in/chris-karagiannis/" target="_blank" rel="noopener">
          linkedin.com/in/chris-karagiannis
        </a>{" "}
        · <a href={`${import.meta.env.BASE_URL}christos-karagiannis-cv.pdf`} download>CV</a>
      </p>
    </footer>
  );
}

export default function App() {
  const [route, navigate] = useRoute();
  const Page = PAGES[route] ?? Home;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  return (
    <>
      <GridBackdrop />
      <span className="side-label is-left" aria-hidden="true">
        Shipping infrastructure since 2020
      </span>
      <span className="side-label is-right" aria-hidden="true">
        37.98°N, 23.75°E
      </span>
      <TopNav route={route} navigate={navigate} />
      <div className="wrap">
        <Page />
      </div>
      <Footer />
    </>
  );
}
