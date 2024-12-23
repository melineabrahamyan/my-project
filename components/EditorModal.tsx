import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Editor from "./Editor";
import { Template } from "@/app/admin/(dashboard)/send-email/page";

interface EditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (templateName: string, templateContent: string) => void;
  templateToEdit: Template | null;
}

const EditorModal: React.FC<EditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  templateToEdit,
}) => {
  const [templateName, setTemplateName] = useState<string>("");
  const [templateContent, setTemplateContent] = useState<string>("");

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (templateToEdit) {
      setTemplateName(templateToEdit.name);
      setTemplateContent(templateToEdit.content);
    } else {
      setTemplateName("");
      setTemplateContent("");
    }
  }, [templateToEdit]);

  const handleClose = () => {
    if (!templateToEdit) {
      setTemplateName("");
      setTemplateContent("");
    }

    onClose();
  };

  const handleSave = () => {
    if (templateName.trim() && templateContent.trim()) {
      onSave(templateName, templateContent);
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-6 sm:p-10">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[600px]"
      >
        <h2 className="text-lg font-semibold mb-4">
          {templateToEdit ? "Edit Template" : "Create New Template"}
        </h2>
        <Input
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="Template Name"
          className="mb-4"
        />
        <Editor value={templateContent} onChange={setTemplateContent} />
        <div className="flex justify-end gap-2 mt-[90px]">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default EditorModal;
