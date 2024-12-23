import React from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill-new"), { ssr: false });

interface EditorProps {
  value: string;
  onChange: any;
}

export default function Editor({ value, onChange }: EditorProps) {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "align",
    "color",
    "code-block",
  ];

  return (
    <QuillEditor
      value={value}
      onChange={onChange}
      modules={quillModules}
      formats={quillFormats}
      className="w-full h-[200px] bg-white"
    />
  );
}
