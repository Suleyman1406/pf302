import { createRoot } from "react-dom/client";
// import Card from "./Card.tsx";
// import Wrapper from "./Wrapper.tsx";
import App from "./App.tsx";

// createRoot(document.getElementById("root")!).render(
// <Card
//   title="PF302"
//   description={`
//     This is a card component. It has a title and a description.
//     The title is a string and the description is a string.
//     The title is displayed in a header and the description is displayed in a paragraph.
//     The title is required and the description is optional
//   `}
//   handleClick={(title) => console.log("clicked", title)}
//   sum={(a, b) => a + b}
// />
// );

createRoot(document.getElementById("root")!).render(<App />);
