import { Router, Route, Switch, Redirect } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/components/layout/AdminLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Inquiries from "@/pages/Inquiries";
import ManageSectors from "@/pages/ManageSectors";
import ManageJobs from "@/pages/ManageJobs";
import Settings from "@/pages/Settings";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Redirect to="/login" />;
  return (
    <AdminLayout>
      <Component />
    </AdminLayout>
  );
}

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard">
          <ProtectedRoute component={Dashboard} />
        </Route>
        <Route path="/inquiries">
          <ProtectedRoute component={Inquiries} />
        </Route>
        <Route path="/sectors">
          <ProtectedRoute component={ManageSectors} />
        </Route>
        <Route path="/jobs">
          <ProtectedRoute component={ManageJobs} />
        </Route>
        <Route path="/settings">
          <ProtectedRoute component={Settings} />
        </Route>
        <Route>
          {isAuthenticated ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}
