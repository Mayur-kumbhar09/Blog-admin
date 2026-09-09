import React, { useRef, useState } from "react";
import Editor from "./Editor";
import Quill from "quill";
import { useDispatch } from "react-redux";
import { setFormData } from "../../store/postSlice";

const Delta = Quill.import("delta");

const FormCompo = () => {
  const quillRef = useRef(null);
  const dispatch = useDispatch();

  const [readOnly] = useState(false);
  const [range, setRange] = useState(null);
  const [lastChange, setLastChange] = useState(null);

  // store editor content here
  const [content, setContent] = useState("");

  // console.log("range:", range);
  // console.log("lastChange:", lastChange);

  // 🔥 handle text change
  const handleTextChange = (delta, oldDelta, source, editor) => {
    const data = editor.getText();
    setContent(data);

    dispatch(
      setFormData({
        content: data,
      }),
    );
  };

  return (
    <div style={{ padding: "20px", width:"100%" }}>
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta().insert("")}
        onSelectionChange={setRange}
        onTextChange={handleTextChange}
      />
    </div>
  );
};

export default FormCompo;
