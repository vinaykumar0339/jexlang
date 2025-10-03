import { Editor, type OnMount } from "@monaco-editor/react";
import { JEX_LANGUAGE_ID, registerJexLangFeatures } from "jexlang-editor";
import { JexEvaluator, type Context, type JexValue } from "jexlang-ts";
import { useRef, useEffect, useState } from "react";
import unescapeJs from 'unescape-js';

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
    evaluatorRef.current?.resetContext();
    for (const key in context) {
      evaluatorRef.current?.declareContextValue(key, context[key]);
    }
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

  useEffect(() => {
    validate(editor);
  }, [editor])

  useEffect(() => {
    validate(editor2);
  }, [editor2]);

  const onChange = (value: string | undefined) => {
    setEditor(unescapeJs(value || ""));
  };

  const onChange2 = (value: string | undefined) => {
    console.log(value, "before unescape");
    console.log(unescapeJs(value || ""), "after unescape");
    setEditor2(unescapeJs(value || ""));
  };

  const displayValue = (value: JexValue): string => {
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean") return value.toString();
    if (value === null || value === undefined) return "null";
    if (Array.isArray(value)) return `[${value.map(displayValue).join(", ")}]`;
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value);
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
      </div>
      <div>
        Entered Code1: {editor}
      </div>
      <div>
        Entered Code2: {editor2}
      </div>
      <div>
        {result !== null && result !== undefined ? <pre>{displayValue(result)}</pre> : <p>No result or might be invalid syntax</p>}
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
