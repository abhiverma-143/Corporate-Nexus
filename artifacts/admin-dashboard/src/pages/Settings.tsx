import { Shield, Key, Globe, Bell } from "lucide-react";

function SettingSection({ icon: Icon, title, description, children }: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0d1526] border border-[#1e2a3a] rounded-xl p-6">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center shrink-0">
          <Icon size={18} className="text-[#d4af37]" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="text-sm text-[#8a9bb0] mt-0.5">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-[#8a9bb0] text-sm mt-1">Configure admin panel preferences</p>
      </div>

      <div className="space-y-5 max-w-2xl">
        <SettingSection icon={Shield} title="Security" description="Admin credentials and access control">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#8a9bb0] mb-1.5 uppercase tracking-wide">Admin Username</label>
              <input
                defaultValue="admin"
                disabled
                className="w-full bg-[#0a0f1e]/50 border border-[#1e2a3a] rounded-lg px-3 py-2.5 text-sm text-[#4a5568] cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-[#4a5568]">
              Credentials are managed via environment variables in production. Set <code className="text-[#8a9bb0] bg-[#0a0f1e] px-1 rounded">ADMIN_USER</code> and <code className="text-[#8a9bb0] bg-[#0a0f1e] px-1 rounded">ADMIN_PASS</code>.
            </p>
          </div>
        </SettingSection>

        <SettingSection icon={Key} title="API Configuration" description="Backend service connection settings">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#8a9bb0] mb-1.5 uppercase tracking-wide">API Server</label>
              <input
                defaultValue="http://localhost:3001"
                disabled
                className="w-full bg-[#0a0f1e]/50 border border-[#1e2a3a] rounded-lg px-3 py-2.5 text-sm text-[#4a5568] cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-[#4a5568]">
              API requests are proxied via Vite dev server. Configured in <code className="text-[#8a9bb0] bg-[#0a0f1e] px-1 rounded">vite.config.ts</code>.
            </p>
          </div>
        </SettingSection>

        <SettingSection icon={Globe} title="Public Site" description="Links to the main corporate website">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1e2a3a] text-sm text-[#f0f4f8] hover:bg-[#d4af37]/10 hover:text-[#d4af37] hover:border-[#d4af37]/20 border border-[#1e2a3a] transition-colors"
          >
            <Globe size={15} />
            Open Corporate Website
          </a>
        </SettingSection>

        <SettingSection icon={Bell} title="Notifications" description="Alert preferences for new inquiries">
          <p className="text-sm text-[#4a5568]">
            Email notifications can be configured in the API server by connecting an email service. Currently logging all submissions to the database.
          </p>
        </SettingSection>
      </div>
    </div>
  );
}
