import React from "react";
import Ex2 from "./components/Ex2";
import Ex1 from "./components/Ex1";
const loading = require("./media/loading.gif");

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  return (
    <>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "50%",
              heigth: "50%",
            }}
            src={loading.default}
          />
        </div>
      )}
      <div>
        <Ex1 setIsLoading={setIsLoading} />
        {!isLoading && <Ex2 />}
      </div>
    </>
  );

  isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        style={{
          width: "50%",
          heigth: "50%",
        }}
        src={loading.default}
      />
    </div>
  ) : (
    <div>
      <Ex1 setIsLoading={setIsLoading} />
      <Ex2 />
    </div>
  );
}

export default App;
