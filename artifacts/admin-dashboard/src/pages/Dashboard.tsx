import { useQuery } from "@tanstack/react-query";
import { MessageSquare, Building2, Briefcase, TrendingUp, Clock, CheckCircle } from "lucide-react";

interface Stats {
  totalContacts: number;
  unreadContacts: number;
  totalSectors: number;
  totalJobs: number;
  activeJobs: number;
}

async function fetchStats(): Promise<Stats> {
  const res = await fetch("/api/admin/stats");
  if (!res.ok) throw new Error("Failed to fetch stats");
  const json = await res.json();
  return json.data;
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  sub?: string;
  color: string;
}) {
  return (
    <div className="bg-[#0d1526] border border-[#1e2a3a] rounded-xl p-5 hover:border-[#d4af37]/30 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-[#8a9bb0]">{label}</p>
      {sub && <p className="text-xs text-[#4a5568] mt-1">{sub}</p>}
    </div>
  );
}

export default function Dashboard() {
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: fetchStats,
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-[#8a9bb0] text-sm mt-1">Welcome back, Administrator</p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-[#0d1526] border border-[#1e2a3a] rounded-xl p-5 animate-pulse h-32" />
          ))}
        </div>
      )}

      {isError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-400">
          Failed to load dashboard stats. Make sure the API server is running.
        </div>
      )}

      {stats && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <StatCard
              icon={MessageSquare}
              label="Total Inquiries"
              value={stats.totalContacts}
              sub={`${stats.unreadContacts} unread`}
              color="bg-[#d4af37]/10 text-[#d4af37]"
            />
            <StatCard
              icon={Clock}
              label="Unread Inquiries"
              value={stats.unreadContacts}
              color="bg-blue-500/10 text-blue-400"
            />
            <StatCard
              icon={Building2}
              label="Business Sectors"
              value={stats.totalSectors}
              color="bg-purple-500/10 text-purple-400"
            />
            <StatCard
              icon={Briefcase}
              label="Job Postings"
              value={stats.totalJobs}
              sub={`${stats.activeJobs} active`}
              color="bg-green-500/10 text-green-400"
            />
            <StatCard
              icon={CheckCircle}
              label="Active Jobs"
              value={stats.activeJobs}
              color="bg-emerald-500/10 text-emerald-400"
            />
            <StatCard
              icon={TrendingUp}
              label="Read Rate"
              value={
                stats.totalContacts > 0
                  ? `${Math.round(((stats.totalContacts - stats.unreadContacts) / stats.totalContacts) * 100)}%`
                  : "—"
              }
              color="bg-orange-500/10 text-orange-400"
            />
          </div>

          <div className="bg-[#0d1526] border border-[#1e2a3a] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-2">Quick Links</h2>
            <p className="text-[#8a9bb0] text-sm">
              Navigate to <span className="text-[#d4af37]">Inquiries</span> to review contact submissions, or{" "}
              <span className="text-[#d4af37]">Manage Sectors</span> to update the public site content.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
