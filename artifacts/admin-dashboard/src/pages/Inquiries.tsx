import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Mail, MailOpen, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { formatDate, truncate } from "@/lib/utils";

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read_at: string | null;
  created_at: string;
}

async function fetchContacts(): Promise<Contact[]> {
  const res = await fetch("/api/admin/contacts");
  if (!res.ok) throw new Error("Failed to load contacts");
  const json = await res.json();
  return json.data;
}

async function markRead(id: number): Promise<void> {
  const res = await fetch(`/api/admin/contacts/${id}/read`, { method: "PATCH" });
  if (!res.ok) throw new Error("Failed to mark as read");
}

async function deleteContact(id: number): Promise<void> {
  const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete contact");
}

function Badge({ read }: { read: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
        read
          ? "bg-green-500/10 text-green-400"
          : "bg-[#d4af37]/10 text-[#d4af37]"
      }`}
    >
      {read ? <MailOpen size={10} /> : <Mail size={10} />}
      {read ? "Read" : "Unread"}
    </span>
  );
}

function ExpandableRow({ contact, onRead, onDelete, isDeleting, isReading }: {
  contact: Contact;
  onRead: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  isReading: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const isRead = contact.read_at !== null;

  return (
    <>
      <tr
        className={`border-b border-[#1e2a3a] hover:bg-[#162032]/50 transition-colors cursor-pointer ${
          !isRead ? "bg-[#d4af37]/5" : ""
        }`}
        onClick={() => setExpanded((v) => !v)}
      >
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <Badge read={isRead} />
          </div>
        </td>
        <td className="px-4 py-3">
          <p className="text-sm font-medium text-white">{contact.name}</p>
          <p className="text-xs text-[#8a9bb0]">{contact.email}</p>
        </td>
        <td className="px-4 py-3 text-sm text-[#f0f4f8] max-w-[200px]">
          {contact.subject}
        </td>
        <td className="px-4 py-3 text-xs text-[#8a9bb0] whitespace-nowrap">
          {formatDate(contact.created_at)}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {!isRead && (
              <button
                onClick={onRead}
                disabled={isReading}
                title="Mark as read"
                className="p-1.5 rounded-lg text-[#8a9bb0] hover:text-green-400 hover:bg-green-400/10 transition-colors disabled:opacity-40"
              >
                {isReading ? <Loader2 size={14} className="animate-spin" /> : <MailOpen size={14} />}
              </button>
            )}
            <button
              onClick={onDelete}
              disabled={isDeleting}
              title="Delete"
              className="p-1.5 rounded-lg text-[#8a9bb0] hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-40"
            >
              {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            </button>
          </div>
        </td>
        <td className="px-4 py-3 text-[#8a9bb0]">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-[#1e2a3a] bg-[#0d1526]">
          <td colSpan={6} className="px-6 py-4">
            <div className="bg-[#0a0f1e] border border-[#1e2a3a] rounded-lg p-4">
              <p className="text-xs text-[#8a9bb0] mb-2 uppercase tracking-wide">Full Message</p>
              <p className="text-sm text-[#f0f4f8] leading-relaxed whitespace-pre-wrap">{contact.message}</p>
              {contact.read_at && (
                <p className="text-xs text-[#4a5568] mt-3">Read at: {formatDate(contact.read_at)}</p>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function Inquiries() {
  const qc = useQueryClient();
  const { data: contacts = [], isLoading, isError } = useQuery({
    queryKey: ["admin-contacts"],
    queryFn: fetchContacts,
  });

  const [actionIds, setActionIds] = useState<Record<string, Set<number>>>({
    read: new Set(),
    delete: new Set(),
  });

  const readMutation = useMutation({
    mutationFn: markRead,
    onMutate: (id) => setActionIds((prev) => ({ ...prev, read: new Set([...prev.read, id]) })),
    onSettled: (_, __, id) => {
      setActionIds((prev) => { const s = new Set(prev.read); s.delete(id); return { ...prev, read: s }; });
      qc.invalidateQueries({ queryKey: ["admin-contacts"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteContact,
    onMutate: (id) => setActionIds((prev) => ({ ...prev, delete: new Set([...prev.delete, id]) })),
    onSettled: (_, __, id) => {
      setActionIds((prev) => { const s = new Set(prev.delete); s.delete(id); return { ...prev, delete: s }; });
      qc.invalidateQueries({ queryKey: ["admin-contacts"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  const unread = contacts.filter((c) => !c.read_at).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Contact Inquiries</h1>
          <p className="text-[#8a9bb0] text-sm mt-1">
            {contacts.length} total · <span className="text-[#d4af37]">{unread} unread</span>
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={28} className="animate-spin text-[#d4af37]" />
        </div>
      )}

      {isError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-400 text-sm">
          Failed to load inquiries.
        </div>
      )}

      {!isLoading && !isError && contacts.length === 0 && (
        <div className="bg-[#0d1526] border border-[#1e2a3a] rounded-xl p-12 text-center">
          <Mail size={40} className="text-[#1e2a3a] mx-auto mb-3" />
          <p className="text-[#8a9bb0]">No contact submissions yet.</p>
        </div>
      )}

      {!isLoading && contacts.length > 0 && (
        <div className="bg-[#0d1526] border border-[#1e2a3a] rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#1e2a3a]">
                {["Status", "Sender", "Subject", "Date", "Actions", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-[#8a9bb0] uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <ExpandableRow
                  key={contact.id}
                  contact={contact}
                  onRead={() => readMutation.mutate(contact.id)}
                  onDelete={() => deleteMutation.mutate(contact.id)}
                  isReading={actionIds.read.has(contact.id)}
                  isDeleting={actionIds.delete.has(contact.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
