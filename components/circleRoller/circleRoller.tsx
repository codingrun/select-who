import circleRollerStyle from "./circleRoller.module.css";
import { Wheel } from "react-custom-roulette";
import { useState } from "react";

const data = [
  { option: "Mansión", style: { backgroundColor: "yellow" } },
  { option: "Coche", style: { backgroundColor: "red" } },
  {
    option: "Sorpresa",
    style: { backgroundColor: "blue", textColor: "white" },
  },
  {
    option: "Viaje",
    style: { backgroundColor: "yellow" },
  },
  { option: "Boda", style: { backgroundColor: "red" } },
  { option: "Cena", style: { backgroundColor: "blue", textColor: "white" } },
];

const CircleRoller = () => {
  const [isWheeled, setIsWheeled] = useState(false);
  const [selectedNum, setSelectedNum] = useState(0);

  const endSpin = () => {
    setIsWheeled(false);
    removeList();
  };

  const removeList = () => {};

  const onWheelClick = () => {
    setIsWheeled(true);
    setSelectedNum(Math.floor(Math.random() * data.length));
  };

  return (
    <div className={circleRollerStyle.App} onClick={(ev) => onWheelClick()}>
      <div className={circleRollerStyle.group1}>
        <Wheel
          mustStartSpinning={isWheeled}
          prizeNumber={selectedNum}
          data={data}
          onStopSpinning={() => endSpin()}
        />
        <h2 className={circleRollerStyle.clickDesc}>clickHere!</h2>
      </div>
    </div>
  );
};

export default CircleRoller;
