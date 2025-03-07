import React, { useEffect, useState, useRef } from "react";

const StatsCounter = () => {
  const [counts, setCounts] = useState({
    events: 0,
    customers: 0,
    comments: 0,
    trophies: 0,
  });

  const statsRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const endValues = { events: 320, customers: 156, comments: 594, trophies: 167 };
          const duration = 2000; // 2 seconds
          const stepTime = Math.floor(duration / Math.max(...Object.values(endValues)));

          const counterInterval = setInterval(() => {
            start++;
            setCounts({
              events: Math.min(start, endValues.events),
              customers: Math.min(start, endValues.customers),
              comments: Math.min(start, endValues.comments),
              trophies: Math.min(start, endValues.trophies),
            });

            if (start >= Math.max(...Object.values(endValues))) {
              clearInterval(counterInterval);
            }
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observerRef.current.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observerRef.current.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <div ref={statsRef} className="stats-counter">
      <div className="overlay">
        <div className="row text-white text-center">
          <div className="col-md-3">
            <h2 className="fw-bold">{counts.events}</h2>
            <p className="text-uppercase">Featured Events</p>
          </div>
          <div className="col-md-3">
            <h2 className="fw-bold">{counts.customers}</h2>
            <p className="text-uppercase">Loyal Customers</p>
          </div>
          <div className="col-md-3">
            <h2 className="fw-bold">{counts.comments}</h2>
            <p className="text-uppercase">Good Comments</p>
          </div>
          <div className="col-md-3">
            <h2 className="fw-bold">{counts.trophies}</h2>
            <p className="text-uppercase">Trophies Won</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;
