import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardStats from "../components/DashboardStats";
import EventTable from "../components/EventTable";
import EventAnalytics from "../components/EventAnalytics";
import EventCalendar from "../components/EventCalendar";
import Sponsorships from "../components/Sponsorships";
import Notifications from "../components/Notifications";
import UserManagement from "../components/UserManagement";
import AdminImageUpload from "../components/ImageUploader";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("dashboard");

  return (
    <div className="vw-100 vh-100">
      <div
        className="bg-dark text-white p-3"
        style={{ width: "250px", height: "100vh", position: "fixed" }}
      >
        <Sidebar setSelectedSection={setSelectedSection} />
      </div>
      <div
        className="p-4"
        style={{ marginLeft: "250px", width: "calc(100% - 250px)" }}
      >
        <h2 className="mb-4">Admin Dashboard</h2>

        {selectedSection === "dashboard" && (
          <>
            <DashboardStats />
            <EventTable />
          </>
        )}
        {selectedSection === "pending" && <EventTable />}
        {selectedSection === "approved" && (
          <h5>Approved Events - Coming Soon</h5>
        )}
        {selectedSection === "rejected" && (
          <h5>Rejected Events - Coming Soon</h5>
        )}
        {selectedSection === "analytics" && <EventAnalytics />}
        {selectedSection === "calendar" && <EventCalendar />}
        {selectedSection === "images" && <AdminImageUpload />}
        {selectedSection === "usermanage" && <UserManagement />}
        {selectedSection === "notifications" && <Notifications />}
      </div>
    </div>
  );
};

export default AdminDashboard;
