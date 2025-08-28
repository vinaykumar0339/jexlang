import { Editor, type OnMount } from "@monaco-editor/react";
import { JEX_LANGUAGE_ID, registerJexLangFeatures } from "jexlang-editor";
import { JexEvaluator, toNumber, toString, type Context, type JexValue } from "jexlang-ts";
import { useRef, useEffect, useState } from "react";

export const ReactJexLangEditor = ({
  context = {},
}: {
  context?: Context;
}) => {

  const disposeRef = useRef<() => void>(undefined);
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<JexValue | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onMount: OnMount = (editor, m) => {
    registerJexLangFeatures(m);
  };

  useEffect(() => () => disposeRef.current?.(), []);

  const validate = async (value: string) => {
    // Perform validation logic here
    try {

      const jexEvaluator = new JexEvaluator(context);

      jexEvaluator.addFunction('httpGet', async (url: JexValue) => {
          try {
            const response = await fetch(toString(url));
            return await response.json();
          } catch (error) {
            console.error("Error fetching HTTP GET:", error);
            throw error;
          }
      });

      jexEvaluator.addFunction('setTimeout', async (ms: JexValue) => {
          return await new Promise<string>((resolve) => setTimeout(() => resolve("hello"), toNumber(ms)));
      });


      jexEvaluator.addFunction('getAsyncValueForSetTimeout', async (ms: JexValue) => {
          return await new Promise<number>((resolve) => setTimeout(() => resolve(toNumber(ms)), 1000));
      });

      setResult(await jexEvaluator.evaluate(value));
      setError(null);
    } catch (error) {
      setResult(null);
      console.error("Error evaluating JexLang code:", error);
      setError((error instanceof Error) ? error.message : String(error));
    }
  };

  const onChange = (value: string | undefined) => {
    setText(value || "");
    validate(value || "");
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
      </div>
      <div>
        {result !== null && result !== undefined ? <pre>{JSON.stringify(result, null, 2)}</pre> : <p>No result or might be invalid syntax</p>}
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
