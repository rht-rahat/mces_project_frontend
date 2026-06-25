"use client";

import { useEffect, useRef } from "react";

export default function JoditEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    const initEditor = async () => {
      const { Jodit } = await import("jodit");
      await import("jodit/es2015/jodit.min.css");

      if (!editorRef.current) return;

      const instance = Jodit.make(editorRef.current, {
        height: 400,
        uploader: { insertImageAsBase64URI: true },
        buttons: [
          "source", "bold", "italic", "underline", "strikethrough",
          "|", "ul", "ol", "|", "outdent", "indent",
          "|", "font", "fontsize", "brush", "paragraph",
          "|", "image", "table", "link", "|",
          "align", "undo", "redo", "hr", "eraser", "fullsize"
        ],
        style: {
          fontFamily: "'Noto Sans Bengali', sans-serif",
        },
        image: {
          openOnDblClick: true,
          editSrc: false,
          defaultWidth: null,
          defaultHeight: null,
        },
        filebrowser: {
          buttons: ["image", "link"],
        },
      });

      if (value) {
        instance.value = value;
      }

      instance.events.on("change", () => {
        if (onChange) {
          onChange(instance.value);
        }
      });

      instanceRef.current = instance;
    };

    initEditor();

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destruct();
        instanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (instanceRef.current && value !== undefined && value !== instanceRef.current.value) {
      instanceRef.current.value = value;
    }
  }, [value]);

  return <div ref={editorRef} />;
}
