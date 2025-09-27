import { Editor, type OnMount } from "@monaco-editor/react";
import { JEX_LANGUAGE_ID, registerJexLangFeatures } from "jexlang-editor";
import { JexEvaluator, toNumber, toString, type Context, type JexValue } from "jexlang-ts";
import { useRef, useEffect, useState } from "react";

export const ReactJexLangEditor = ({
  context = {},
}: {
  context?: Context;
}) => {

  const isLanguageRegisteredRef = useRef(false);
  const evaluatorRef = useRef<JexEvaluator | null>(new JexEvaluator(context));
  const [editor, setEditor] = useState<string>("");
  const [editor2, setEditor2] = useState<string>("");
  const [result, setResult] = useState<JexValue | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onMount: OnMount = (_, m) => {
    if (isLanguageRegisteredRef.current) return;
    isLanguageRegisteredRef.current = true;
    registerJexLangFeatures(m);
  };

  useEffect(() => {
    evaluatorRef.current = new JexEvaluator(context);

    evaluatorRef.current.addFunction('httpGet', async (url: JexValue) => {
          try {
            const response = await fetch(toString(url));
            return await response.json();
          } catch (error) {
            console.error("Error fetching HTTP GET:", error);
            throw error;
          }
      });

    evaluatorRef.current.addFunction('setTimeout', async (ms: JexValue) => {
        return await new Promise<string>((resolve) => setTimeout(() => resolve("hello"), toNumber(ms)));
    });


    evaluatorRef.current.addFunction('getAsyncValueForSetTimeout', async (ms: JexValue) => {
        return await new Promise<number>((resolve) => setTimeout(() => resolve(toNumber(ms)), 1000));
    });

    // register methods;
  }, [context]);

  const validate = async (value: string) => {
    // Perform validation logic here
    try {
      const jexEvaluator = evaluatorRef.current;
      setResult((await jexEvaluator?.evaluate(value)) ?? null);
      setError(null);
    } catch (error) {
      setResult(null);
      console.error("Error evaluating JexLang code:", error);
      setError((error instanceof Error) ? error.message : String(error));
    }
  };

  const onChange = (value: string | undefined) => {
    setEditor(value || "");
    validate(value || "");
  };

  const onChange2 = (value: string | undefined) => {
    setEditor2(value || "");
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
      <div style={{ display: "flex", height: "70%", gap: "10px" }}>
      <Editor
        defaultLanguage={JEX_LANGUAGE_ID}
        onMount={onMount}
        defaultValue={editor}
        onChange={onChange}
        options={{
        minimap: { enabled: false },
          fontLigatures: true,
          tabSize: 2,
        }}
      />
      <Editor
        defaultLanguage={JEX_LANGUAGE_ID}
        onMount={onMount}
        defaultValue={editor2}
        onChange={onChange2}
        options={{
        minimap: { enabled: false },
          fontLigatures: true,
          tabSize: 2,
        }}
      />
      </div>
    </div>
  );
};
