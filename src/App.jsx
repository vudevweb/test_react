import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [statusGame, setStatusGame] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [circles, setCircles] = useState([]);
  const [nextNumber, setNextNumber] = useState(0); // Số tiếp theo cần click

  const startGame = () => {
    if (points < 1) {
      alert("Please enter the points!");
      return;
    }
    resetGame();
    setItemGame(points);
    countTime();
    setStatusGame(true);
  };

  const resetGame = () => {
    setTime(0);
    setCircles([]);
    setNextNumber(0);
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const countTime = () => {
    if (!intervalId) {
      const interval = setInterval(() => {
        setTime((prevTime) => (parseFloat(prevTime) + 0.1).toFixed(1));
      }, 100);
      setIntervalId(interval);
    }
  };

  const setItemGame = (points) => {
    const circlesArray = [];
    for (let i = 0; i < points; i++) {
      const circle = {
        id: i,
        number: i,
        x: Math.random() * 80,
        y: Math.random() * 80,
        zIndex: points - i,
      };
      circlesArray.push(circle);
    }
    setCircles(circlesArray);
  };

  const handleClickCircle = (number) => {
    setTimeout(() => {
      if (number === nextNumber) {
        setNextNumber(nextNumber + 1);
        setCircles(circles.filter((circle) => circle.number !== number));
        if (nextNumber + 1 === parseInt(points)) {
          setCircles(circles.filter((circle) => circle.number !== number));
          alert("Congratulations! You won!");
          resetGame();
        }
      } else {
        setCircles(circles.filter((circle) => circle.number !== number));
        alert("Game Over! You clicked the wrong number.");
        resetGame();
      }
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <>
      <div className="container">
        <div>
          <h1>LET'S PLAY</h1>
          <div className="form-group mb-3">
            <label htmlFor="pointsInput">Points</label>
            <input
              type="number"
              className="form-control"
              id="pointsInput"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="time">Time: &nbsp;</label>
            <span>{time}s</span>
          </div>
          <div className="">
            <button onClick={startGame} className="btn btn-primary">
              {statusGame ? "Restart" : "Start"}
            </button>
          </div>
        </div>

        <div className="border my-5 boxGame">
          {circles.map((circle) => (
            <div
              key={circle.id}
              className="circle"
              onClick={() => handleClickCircle(circle.number)}
              style={{
                left: `${circle.x}%`,
                top: `${circle.y}%`,
                zIndex: circle.zIndex,
              }}
            >
              <div>{circle.number}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
