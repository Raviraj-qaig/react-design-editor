import ReactDOM from "react-dom/client";
import EditorProvider from "./EditorProvider";
import Router from "./Router";
import Container from "./Container";
import "./styles/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <EditorProvider>
    <Container>
      <Router />
    </Container>
  </EditorProvider>
);

