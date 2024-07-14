import React, { useEffect, useState } from "react";
import * as monaco from "monaco-editor";
import Editor, { loader } from "@monaco-editor/react";
import "./App.css";

loader.config({ monaco });

const ReactMonacoEditor = ({ filePath, initialValue, onValueChange }) => {
  const hostname = "localhost";
  const urlPath = "";
  const port = "4000";
  const [code, setCode] = useState(initialValue);
  useEffect(() => {
    // Send the initial value to the parent
    onValueChange(code);
  }, []);

  const handleChange = (eCode) => {
    setCode(eCode);
    // Send the updated value to the parent
    onValueChange(eCode);
  };
  const [codeError, setCodeError] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState('Click "Evaluate" button to execute the Code...');

  const onMount = (editor, monacoInstance) => {
    monacoInstance.languages.register({
      id: "java",
      extensions: [".java"],
      aliases: ["JAVA", "java"],
      mimetypes: ["application/text"],
    });
    // MonacoServices.install() and other setup should be done here
  };

   useEffect(() => {
     // WebSocket and language client setup should be done here
   }, []);

  

  return (
    <Editor
          path={filePath}
          height="75vh"
          value={code}
          onChange={(newCode) => {
            if (newCode) {
              handleChange(newCode);
              setCode(newCode);
            }
          }}
          options={{
            acceptSuggestionOnEnter: 'smart',
            glyphMargin: true,
            lightbulb: {
              enabled: true,
            },
          }}
          loading={"Loading..."}
          keepCurrentModel={true}
          theme={"vs-dark"}
          onMount={onMount}
        />
  );
};

export default ReactMonacoEditor;