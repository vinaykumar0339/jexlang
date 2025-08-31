import { Editor } from "@monaco-editor/react";
import { ReactJexLangEditor } from "./jexlang";
import { useState } from "react";

function App() {
  const [context, setContext] = useState({});
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <h1>JexLang Editor</h1>
      <div style={{ display: "flex", height: "90vh" }}>
        <div style={{ flex: 0.7, marginRight: "8px" }}>
          <ReactJexLangEditor context={context} />
        </div>
        <div style={{ flex: 0.3, marginLeft: "8px" }}>
          <div>Context</div>
          <Editor
            defaultLanguage="json"
            height="100%"
            value={JSON.stringify(context, null, 2)}
            onChange={(value) => {
              if (value !== undefined) {
                try {
                  const context = JSON.parse(value);
                  setContext(context);
                } catch (error) {
                  console.error("Error parsing JSON:", error);
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
