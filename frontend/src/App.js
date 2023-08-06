
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes/Routes";

function App() {
  return (
    <>
      <Routes>
        {routes &&
          routes.map((item, key) => {
            return <Route key={key} path={item.path} element={item.element} />;
          })}
      </Routes>
    </>
  );
}

export default App;
