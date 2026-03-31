import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Pencil, Trash2, X, Loader2, Briefcase, CheckCircle, XCircle } from "lucide-react";

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  is_active: boolean;
  created_at: string;
}

const jobSchema = z.object({
  title: z.string().min(2, "Title is required"),
  department: z.string().min(2, "Department is required"),
  location: z.string().min(2, "Location is required"),
  type: z.enum(["Full-time", "Part-time", "Contract", "Internship"], {
    errorMap: () => ({ message: "Select a job type" }),
  }),
  description: z.string().min(20, "Description must be at least 20 characters"),
  is_active: z.boolean(),
});
type JobForm = z.infer<typeof jobSchema>;

async function fetchJobs(): Promise<Job[]> {
  const res = await fetch("/api/admin/jobs");
  if (!res.ok) throw new Error("Failed to load jobs");
  return (await res.json()).data;
}

async function createJob(data: JobForm): Promise<Job> {
  const res = await fetch("/api/admin/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create job");
  return (await res.json()).data;
}

async function updateJob({ id, ...data }: JobForm & { id: number }): Promise<Job> {
  const res = await fetch(`/api/admin/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update job");
  return (await res.json()).data;
}

async function deleteJob(id: number): Promise<void> {
  const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete job");
}

function JobFormModal({ job, onClose }: { job: Job | null; onClose: () => void }) {
  const qc = useQueryClient();
  const isEdit = job !== null;

  const { register, handleSubmit, formState: { errors } } = useForm<JobForm>({
    resolver: zodResolver(jobSchema),
    defaultValues: job
      ? { title: job.title, department: job.department, location: job.location, type: job.type as JobForm["type"], description: job.description, is_active: job.is_active }
      : { type: "Full-time", is_active: true },
  });

  const createMut = useMutation({
    mutationFn: createJob,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-jobs"] }); qc.invalidateQueries({ queryKey: ["admin-stats"] }); onClose(); },
  });

  const updateMut = useMutation({
    mutationFn: updateJob,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-jobs"] }); qc.invalidateQueries({ queryKey: ["admin-stats"] }); onClose(); },
  });

  const onSubmit = (data: JobForm) => {
    if (isEdit) updateMut.mutate({ id: job.id, ...data });
    else createMut.mutate(data);
  };

  const fieldClass = "w-full bg-[#0a0f1e] border border-[#1e2a3a] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:border-[#d4af37]/60 focus:ring-1 focus:ring-[#d4af37]/30 transition-colors";
  const labelClass = "block text-xs font-medium text-[#8a9bb0] mb-1.5 uppercase tracking-wide";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#0d1526] border border-[#1e2a3a] rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e2a3a] sticky top-0 bg-[#0d1526] z-10">
          <h2 className="text-lg font-semibold text-white">{isEdit ? "Edit Job" : "Add Job Posting"}</h2>
          <button onClick={onClose} className="text-[#8a9bb0] hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelClass}>Job Title</label>
              <input {...register("title")} className={fieldClass} placeholder="e.g. Senior Software Engineer" />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Department</label>
              <input {...register("department")} className={fieldClass} placeholder="e.g. Technology" />
              {errors.department && <p className="text-red-400 text-xs mt-1">{errors.department.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input {...register("location")} className={fieldClass} placeholder="e.g. New York, NY" />
              {errors.location && <p className="text-red-400 text-xs mt-1">{errors.location.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Type</label>
              <select {...register("type")} className={fieldClass}>
                {["Full-time", "Part-time", "Contract", "Internship"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3 pt-5">
              <input {...register("is_active")} type="checkbox" id="is_active" className="w-4 h-4 accent-[#d4af37]" />
              <label htmlFor="is_active" className="text-sm text-[#f0f4f8]">Active / Visible</label>
            </div>
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea {...register("description")} rows={4} className={fieldClass + " resize-none"} placeholder="Role responsibilities and requirements…" />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-[#1e2a3a] text-[#8a9bb0] hover:text-white transition-colors text-sm">
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMut.isPending || updateMut.isPending}
              className="flex-1 py-2.5 rounded-lg bg-[#d4af37] text-[#0a0f1e] font-semibold hover:bg-[#e6c875] disabled:opacity-60 transition-colors text-sm flex items-center justify-center gap-2"
            >
              {(createMut.isPending || updateMut.isPending) && <Loader2 size={14} className="animate-spin" />}
              {isEdit ? "Save Changes" : "Create Posting"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ManageJobs() {
  const qc = useQueryClient();
  const [modal, setModal] = useState<{ open: boolean; job: Job | null }>({ open: false, job: null });
  const { data: jobs = [], isLoading } = useQuery({ queryKey: ["admin-jobs"], queryFn: fetchJobs });

  const deleteMut = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-jobs"] }); qc.invalidateQueries({ queryKey: ["admin-stats"] }); },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Job Postings</h1>
          <p className="text-[#8a9bb0] text-sm mt-1">{jobs.filter((j) => j.is_active).length} active of {jobs.length} total</p>
        </div>
        <button
          onClick={() => setModal({ open: true, job: null })}
          className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-[#0a0f1e] font-semibold rounded-lg hover:bg-[#e6c875] transition-colors text-sm"
        >
          <Plus size={16} />
          Add Posting
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={28} className="animate-spin text-[#d4af37]" />
        </div>
      )}

      {!isLoading && jobs.length === 0 && (
        <div className="bg-[#0d1526] border border-[#1e2a3a] rounded-xl p-12 text-center">
          <Briefcase size={40} className="text-[#1e2a3a] mx-auto mb-3" />
          <p className="text-[#8a9bb0]">No job postings yet.</p>
        </div>
      )}

      {!isLoading && jobs.length > 0 && (
        <div className="grid gap-3">
          {jobs.map((job) => (
            <div key={job.id} className="bg-[#0d1526] border border-[#1e2a3a] rounded-xl p-4 flex items-center gap-4 hover:border-[#d4af37]/20 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="text-sm font-semibold text-white">{job.title}</p>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-[#1e2a3a] text-[#8a9bb0]">{job.type}</span>
                  {job.is_active ? (
                    <span className="flex items-center gap-1 text-xs text-green-400"><CheckCircle size={10} /> Active</span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-[#4a5568]"><XCircle size={10} /> Inactive</span>
                  )}
                </div>
                <p className="text-xs text-[#8a9bb0]">{job.department} · {job.location}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setModal({ open: true, job })} className="p-2 rounded-lg text-[#8a9bb0] hover:text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors">
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => { if (confirm(`Delete "${job.title}"?`)) deleteMut.mutate(job.id); }}
                  disabled={deleteMut.isPending}
                  className="p-2 rounded-lg text-[#8a9bb0] hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-40"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal.open && <JobFormModal job={modal.job} onClose={() => setModal({ open: false, job: null })} />}
    </div>
  );
}
