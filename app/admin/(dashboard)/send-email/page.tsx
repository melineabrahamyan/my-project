"use client";

import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import EditorModal from "@/components/EditorModal";
import DeleteTemplateModal from "@/components/DeleteTemplateModal";
import { sendEmailNotification } from "@/actions/notification";
import { addFooter } from "@/lib/utils";
import { defaultTemplate } from "@/lib/detault";

export type Template = {
  id: string;
  name: string;
  content: string;
  editable: boolean;
};

const SendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [template, setTemplate] = useState<string>("");
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "editable_template",
      name: "Driver Invitation 1",
      editable: true,
      content: `<h1>Welcome to Our Logistics Platform!</h1>
                <p>Dear Driver,</p>
                <p>We are thrilled to invite you to join our logistics platform. It's an easy and efficient way to find delivery jobs and grow your income.</p>
             `,
    },
    {
      id: "default_template",
      name: "Driver Invitation 2",
      editable: false,
      content: defaultTemplate,
    },
  ]);

  const [templateToEdit, setTemplateToEdit] = useState<Template | null>(null);
  const [templateToDelete, setTemplateToDelete] = useState<Template | null>(
    null
  );
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { toast } = useToast();

  const handleNewTemplate = (templateName: string, templateContent: string) => {
    const templateExists = templates.some(
      (tpl) =>
        tpl.name.toLowerCase() === templateName.toLowerCase() &&
        tpl.id !== templateToEdit?.id
    );

    if (templateExists) {
      toast({
        title: "Template Name Exists",
        description: `A template with the name "${templateName}" already exists. Please choose a different name.`,
        variant: "destructive",
      });
      return;
    }

    if (templateToEdit) {
      setTemplates((prev) =>
        prev.map((tpl) =>
          tpl.id === templateToEdit.id
            ? { ...tpl, name: templateName, content: templateContent }
            : tpl
        )
      );
      setTemplate(templateToEdit.id);
      setTemplateToEdit(null);
      toast({
        title: "Template Updated",
        description: `Template "${templateName}" has been updated successfully.`,
      });
    } else {
      const newTemplate: Template = {
        id: templateName.toLowerCase().replace(/\s+/g, "-"),
        name: templateName,
        content: templateContent,
        editable: true,
      };
      setTemplates((prev) => [...prev, newTemplate]);
      setTemplate(newTemplate.id);
      toast({
        title: "Template Created",
        description: `Template "${templateName}" has been created successfully`,
      });
    }
  };

  const handleDeleteTemplate = () => {
    setTemplates((prev) =>
      prev.filter((tpl) => tpl.id !== templateToDelete?.id)
    );
    toast({
      title: "Template Deleted",
      description: `Template "${templateToDelete?.name}" has been deleted successfully`,
    });
    setTemplateToDelete(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const selectedTemplate = templates.find((tpl) => tpl.id === template);
      const footer = addFooter();
      const fullTemplate = selectedTemplate?.content + footer;

      await sendEmailNotification({
        from: { name: from.trim(), address: "email@example.com" },
        to: email.trim(),
        subject: title.trim(),
        html: selectedTemplate?.editable ? fullTemplate : defaultTemplate,
      });

      toast({
        title: "Email Sent Successfully",
        description: "Your email has been scheduled for delivery.",
      });
    } catch (error) {
    } finally {
      setLoading(false);
      setEmail("");
      setTitle("");
      setFrom("");
      setTemplate("");
      setTemplateToEdit(null);
    }
  };

  const handleValueChange = (value: string) => {
    if (value === "new-template") {
      setTemplateToEdit(null);
      setIsEditorModalOpen(true);
    } else {
      setTemplate(value);
    }
    setDropdownOpen(false);
  };

  const handleEditClick = (tpl: Template) => {
    setDropdownOpen(false);
    setTemplateToEdit(tpl);
    setIsEditorModalOpen(true);
  };

  const handleDeletClick = (tpl: Template) => {
    setDropdownOpen(false);
    setTemplateToDelete(tpl);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="min-h-[100vh] h-full p-6 sm:p-10 w-full">
      <div className="max-w-2xl mx-auto  pt-24">
        <div className="bg-white  bg-opacity-70 backdrop-blur-lg border border-white border-opacity-20 shadow-lg rounded-xl p-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground sm:mb-2">
            Email Campaign
          </h1>
          <p className="text-muted-foreground mb-5 sm:mb-8">
            Create and send email campaigns to your users
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Recipient Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-transition"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="from">Sender Email</Label>
              <Input
                id="from"
                placeholder="Freight Match"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="input-transition"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Email Title</Label>
              <Input
                id="title"
                placeholder="Enter email subject"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-transition"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template">Email Template</Label>
              <Select
                value={template}
                onValueChange={handleValueChange}
                required
                open={dropdownOpen}
                onOpenChange={setDropdownOpen}
              >
                <SelectTrigger className="input-transition">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((tpl) => (
                    <div
                      className="flex items-center justify-between"
                      key={tpl.id}
                    >
                      <SelectItem value={tpl.id}>
                        {tpl.name} {!tpl.editable && " - Default"}
                      </SelectItem>
                      {tpl.editable && (
                        <div className="px-2 flex items-center gap-2">
                          <button
                            onClick={() => handleEditClick(tpl)}
                            className="text-[#3B2F47] font-semibold"
                          >
                            Edit
                          </button>
                          <FaTrashAlt
                            onClick={() => handleDeletClick(tpl)}
                            className="w-4 h-4 cursor-pointer"
                            fill="red"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <SelectItem value="new-template">
                    + Create New Template
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              disabled={loading}
              type="submit"
              className="w-full hover-scale"
            >
              Send Email
            </Button>
          </form>
        </div>
      </div>

      <EditorModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        onSave={handleNewTemplate}
        templateToEdit={templateToEdit}
      />
      <DeleteTemplateModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteTemplate}
        templateToDelete={templateToDelete}
      />
    </div>
  );
};

export default SendEmail;
