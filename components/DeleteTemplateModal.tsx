import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Template } from "@/app/admin/(dashboard)/send-email/page";

interface DeleteTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  templateToDelete: Template | null;
}

const DeleteTemplateModal: React.FC<DeleteTemplateModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  templateToDelete,
}) => {
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

  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-6 sm:p-10">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[600px]"
      >
        <h2 className="sm:text-lg font-semibold mb-4 text-center">
          Are you sure you want to delete {templateToDelete?.name} template?
        </h2>
        <div className="flex justify-center gap-2 ">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTemplateModal;
