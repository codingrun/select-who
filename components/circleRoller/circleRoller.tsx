import circleRollerStyle from "./circleRoller.module.css";
import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import memberType from "../../interface/member";

const CircleRoller = ({
  data,
  removeMember,
}: {
  data: memberType[];
  removeMember: (index: number) => void;
}) => {
  const [isWheeled, setIsWheeled] = useState(false);
  const [selectedNum, setSelectedNum] = useState(0);

  const endSpin = () => {
    setIsWheeled(false);
    removeMember(selectedNum);
  };

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
