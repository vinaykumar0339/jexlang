import { Editor, type OnMount } from "@monaco-editor/react";
import { JEX_LANGUAGE_ID, registerJexLangFeatures } from "jexlang-editor";
import { JexEvaluator, type JexValue } from "jexlang-ts";
import { useRef, useEffect, useState } from "react";

export const ReactJexLangEditor = () => {

  const disposeRef = useRef<() => void>(undefined);
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<JexValue | null>(null);

  const onMount: OnMount = (editor, m) => {
    registerJexLangFeatures(m);
  };

  useEffect(() => () => disposeRef.current?.(), []);

  const validate = (value: string) => {
    // Perform validation logic here
    try {
      const jexeval = new JexEvaluator();
      setResult(jexeval.evaluate(value));
    } catch (error) {
      console.error("Error evaluating JexLang code:", error);
    }
  };

  const onChange = (value: string | undefined) => {
    setText(value || "");
    validate(value || "");
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div>
        {result ? <pre>{JSON.stringify(result, null, 2)}</pre> : <p>No result or might be invalid syntax</p>}
      </div>
      <Editor
        defaultLanguage={JEX_LANGUAGE_ID}
        onMount={onMount}
        defaultValue={text}
        onChange={onChange}
        options={{
        minimap: { enabled: false },
          fontLigatures: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};
