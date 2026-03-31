import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Pencil, Trash2, X, Loader2, Building2 } from "lucide-react";

interface Sector {
  id: number;
  name: string;
  description: string;
  icon_name: string;
  image_url: string;
}

const sectorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  icon_name: z.string().min(1, "Icon name is required"),
  image_url: z.string().url("Must be a valid URL"),
});
type SectorForm = z.infer<typeof sectorSchema>;

async function fetchSectors(): Promise<Sector[]> {
  const res = await fetch("/api/admin/sectors");
  if (!res.ok) throw new Error("Failed to load sectors");
  const json = await res.json();
  return json.data;
}

async function createSector(data: SectorForm): Promise<Sector> {
  const res = await fetch("/api/admin/sectors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create sector");
  return (await res.json()).data;
}

async function updateSector({ id, ...data }: SectorForm & { id: number }): Promise<Sector> {
  const res = await fetch(`/api/admin/sectors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update sector");
  return (await res.json()).data;
}

async function deleteSector(id: number): Promise<void> {
  const res = await fetch(`/api/admin/sectors/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete sector");
}

const ICON_OPTIONS = ["Building2", "Globe2", "TrendingUp", "Zap", "Truck", "HardHat", "Factory", "Layers"];

function SectorFormModal({
  sector,
  onClose,
}: {
  sector: Sector | null;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const isEdit = sector !== null;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SectorForm>({
    resolver: zodResolver(sectorSchema),
    defaultValues: sector
      ? { name: sector.name, description: sector.description, icon_name: sector.icon_name, image_url: sector.image_url }
      : { icon_name: "Building2" },
  });

  const createMut = useMutation({
    mutationFn: createSector,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-sectors"] }); qc.invalidateQueries({ queryKey: ["admin-stats"] }); onClose(); },
  });

  const updateMut = useMutation({
    mutationFn: updateSector,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-sectors"] }); onClose(); },
  });

  const onSubmit = (data: SectorForm) => {
    if (isEdit) updateMut.mutate({ id: sector.id, ...data });
    else createMut.mutate(data);
  };

  const fieldClass = "w-full bg-[#0a0f1e] border border-[#1e2a3a] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#4a5568] focus:outline-none focus:border-[#d4af37]/60 focus:ring-1 focus:ring-[#d4af37]/30 transition-colors";
  const labelClass = "block text-xs font-medium text-[#8a9bb0] mb-1.5 uppercase tracking-wide";
  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#0d1526] border border-[#1e2a3a] rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e2a3a]">
          <h2 className="text-lg font-semibold text-white">{isEdit ? "Edit Sector" : "Add New Sector"}</h2>
          <button onClick={onClose} className="text-[#8a9bb0] hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className={labelClass}>Name</label>
            <input {...register("name")} className={fieldClass} placeholder="e.g. Real Estate Development" />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea {...register("description")} rows={3} className={fieldClass + " resize-none"} placeholder="Short description of this sector…" />
            {errors.description && <p className={errorClass}>{errors.description.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Icon Name</label>
            <select {...register("icon_name")} className={fieldClass}>
              {ICON_OPTIONS.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            {errors.icon_name && <p className={errorClass}>{errors.icon_name.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Image URL</label>
            <input {...register("image_url")} className={fieldClass} placeholder="https://images.unsplash.com/…" />
            {errors.image_url && <p className={errorClass}>{errors.image_url.message}</p>}
          </div>

          {(createMut.error || updateMut.error) && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm">
              {isEdit ? "Failed to update sector." : "Failed to create sector."}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-[#1e2a3a] text-[#8a9bb0] hover:text-white hover:border-[#8a9bb0] transition-colors text-sm">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || createMut.isPending || updateMut.isPending}
              className="flex-1 py-2.5 rounded-lg bg-[#d4af37] text-[#0a0f1e] font-semibold hover:bg-[#e6c875] disabled:opacity-60 transition-colors text-sm flex items-center justify-center gap-2"
            >
              {(isSubmitting || createMut.isPending || updateMut.isPending) && <Loader2 size={14} className="animate-spin" />}
              {isEdit ? "Save Changes" : "Create Sector"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ManageSectors() {
  const qc = useQueryClient();
  const [modal, setModal] = useState<{ open: boolean; sector: Sector | null }>({ open: false, sector: null });
  const { data: sectors = [], isLoading, isError } = useQuery({
    queryKey: ["admin-sectors"],
    queryFn: fetchSectors,
  });

  const deleteMut = useMutation({
    mutationFn: deleteSector,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-sectors"] }); qc.invalidateQueries({ queryKey: ["admin-stats"] }); },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Sectors</h1>
          <p className="text-[#8a9bb0] text-sm mt-1">{sectors.length} sectors configured</p>
        </div>
        <button
          onClick={() => setModal({ open: true, sector: null })}
          className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-[#0a0f1e] font-semibold rounded-lg hover:bg-[#e6c875] transition-colors text-sm"
        >
          <Plus size={16} />
          Add Sector
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={28} className="animate-spin text-[#d4af37]" />
        </div>
      )}

      {isError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-400 text-sm">
          Failed to load sectors.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid gap-4">
          {sectors.length === 0 && (
            <div className="bg-[#0d1526] border border-[#1e2a3a] rounded-xl p-12 text-center">
              <Building2 size={40} className="text-[#1e2a3a] mx-auto mb-3" />
              <p className="text-[#8a9bb0]">No sectors yet. Add your first one.</p>
            </div>
          )}
          {sectors.map((sector) => (
            <div key={sector.id} className="bg-[#0d1526] border border-[#1e2a3a] rounded-xl p-4 flex items-center gap-4 hover:border-[#d4af37]/20 transition-colors">
              <img
                src={sector.image_url}
                alt={sector.name}
                className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#1e2a3a]"
                onError={(e) => { (e.target as HTMLImageElement).src = ""; }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-white truncate">{sector.name}</p>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-[#1e2a3a] text-[#8a9bb0] font-mono shrink-0">{sector.icon_name}</span>
                </div>
                <p className="text-xs text-[#8a9bb0] line-clamp-2">{sector.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setModal({ open: true, sector })}
                  className="p-2 rounded-lg text-[#8a9bb0] hover:text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => { if (confirm(`Delete "${sector.name}"?`)) deleteMut.mutate(sector.id); }}
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

      {modal.open && (
        <SectorFormModal sector={modal.sector} onClose={() => setModal({ open: false, sector: null })} />
      )}
    </div>
  );
}
