import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

import "highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";

import "./editor.css";
import axios from "axios";
import { Card } from "antd";
import Title from "antd/es/typography/Title";

hljs.registerLanguage("html", xml);
window.hljs = hljs;

const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const saveTimerRef = useRef(null);

    const isHtmlModeRef = useRef(false);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (ref.current) {
        ref.current.enable(!readOnly);
      }
    }, [readOnly, ref]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const editorContainer = document.createElement("div");
      container.appendChild(editorContainer);

      const quill = new Quill(editorContainer, {
        theme: "snow",
        placeholder: "Enter your content...",
        modules: {
          toolbar: [
            [{ font: [] }, { size: [] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["blockquote", "code-block"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            [{ direction: "rtl" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
          ],
          syntax: { hljs },
        },
      });

      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      // ==========================
      // SAVE DATA TO BACKEND
      // ==========================
      const saveEditorContent = async () => {
        try {
          const text = quill.getText();

          const lines = text
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);

          const [heading = "", subHeading = "", ...contentLines] = lines;

          const payload = {
            heading,
            subHeading,
            content: contentLines.join("\n"),
          };

          console.log("===== SENDING TO BACKEND =====");
          console.log(JSON.stringify(payload, null, 2));
          console.log("==============================");

          const response = await axios.post(
            "http://localhost:5000/api/save-content",
            payload,
          );

          // console.log("Backend Response:", response.data);
        } catch (error) {
          console.error("Save failed:", error.response?.data || error.message);
        }
      };

      // ==========================
      // QUILL TEXT CHANGE
      // ==========================
      quill.on("text-change", (delta, oldDelta, source) => {
        if (isHtmlModeRef.current) return;

        const editor = {
          getText: () => quill.getText(),
          getHTML: () => quill.root.innerHTML,
          getContents: () => quill.getContents(),
        };

        onTextChangeRef.current?.(delta, oldDelta, source, editor);

        clearTimeout(saveTimerRef.current);

        saveTimerRef.current = setTimeout(() => {
          saveEditorContent();
        }, 1000);
      });

      quill.on("selection-change", (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        clearTimeout(saveTimerRef.current);
        ref.current = null;
        container.innerHTML = "";
      };
    }, [ref]);

    return (
      <Card
        title={<Title level={5}>Rich Text Editor</Title>}
        style={{
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(19, 0, 128, 0.15)",
          marginTop: 20,
        }}
      >
        <div ref={containerRef} />
      </Card>
    );
  },
);

Editor.displayName = "Editor";

export default Editor;
