import React from "react";

const sponsors = [
  { id: 1, event: "Tech Conference", company: "Google", status: "Active" },
  { id: 2, event: "Music Festival", company: "Spotify", status: "Pending" },
];

const Sponsorships = () => {
  return (
    <div className="card p-4 my-4">
      <h5>Sponsored Events</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sponsors.map(sponsor => (
            <tr key={sponsor.id}>
              <td>{sponsor.event}</td>
              <td>{sponsor.company}</td>
              <td>
                <span className={`badge ${sponsor.status === "Active" ? "bg-success" : "bg-warning"}`}>
                  {sponsor.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sponsorships;
