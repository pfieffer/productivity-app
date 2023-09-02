import "./App.css";
import { useState, useEffect } from "react";


const App = () => {
  const token = localStorage?.getItem("token");
  const [activities, setActivities] = useState([]);

  /* Fetching the data from the backend and setting the state of activities to the data. */
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/activities`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await result.json();
      setActivities(data);
    };
    fetchData();
  }, [token]);

  const addActivity = async (event) => {
    event.preventDefault();

    const newActivity = {
      name: event.target.activity.value,
      time: event.target.time.value,
    };

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/activity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newActivity),
    });

    event.target.activity.value = ""; // sets input empty after clicking submit
    event.target.time.value = ""; // sets input empty after clicking submit
    window.location.reload(); // reloads the window after sending request
  };


  return <div className="app">
    <header className="app-header">
      <h1>Productivity Tracker</h1>
      <form onSubmit={addActivity}>
        <div>
          <label htmlFor="activity">Activity:</label>
          <input
            type="text"
            id="activity"
            name="activity"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="time">Time Taken:</label>
          <input type="text" id="time" name="time" autoComplete="off" />
        </div>
        <button type="submit">Add</button>
      </form>
    </header>
    <main className="app-main">
      <h2>Today</h2>
      {activities && activities.length > 0 ? (
        <ol>
          {activities.map((activity) => (
            <li key={activity._id}>
              {activity.name} - {activity.time}
            </li>
          ))}
        </ol>
      ) : (
        <p>No activities yet</p>
      )}
    </main>
  </div>;
}

export default App;