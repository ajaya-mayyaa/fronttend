import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Ensures consistent styling

function CodeEditor({ code, setCode, reviewCode }) {
  return (
    <div className="left">
      <div className="code" style={{ maxHeight: "1000px", overflowY: "auto" }}>
        <Editor
          value={code}
          onValueChange={(newCode) => setCode(newCode)}
          highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
          padding={10}
          style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: 16,
            border: "1px solid #ddd",
            borderRadius: "5px",
            minHeight: "200px",
            width: "100%",
            overflow: "hidden",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            backgroundColor: "transparent", // Keeps the same background
            color: "inherit", // Keeps the same text color
          }}
        />
      </div>
      <div onClick={reviewCode} className="review-btn">Review</div>
    </div>
  );
}

export default CodeEditor;
