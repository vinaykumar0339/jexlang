import { Editor, type OnMount } from "@monaco-editor/react";
import { JEX_LANGUAGE_ID, registerJexLangFeatures } from "jexlang-editor";
import { useRef, useEffect } from "react";

export const ReactJexLangEditor = () => {

  const disposeRef = useRef<() => void>(undefined);

  const onMount: OnMount = (editor, m) => {
    registerJexLangFeatures(m);
  };

  useEffect(() => () => disposeRef.current?.(), []);
  
  return (
    <Editor 
        defaultLanguage={JEX_LANGUAGE_ID}
        onMount={onMount}
        options={{
        minimap: { enabled: false },
          fontLigatures: true,
          tabSize: 2,
        }}
      />
  );
};
