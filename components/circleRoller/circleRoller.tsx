import circleRollerStyle from "./circleRoller.module.css";
import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import memberType from "../../interface/member";

const CircleRoller = ({
  data,
  removeMember,
}: {
  data: memberType[];
  removeMember: (member: memberType) => void;
}) => {
  const music = new Audio("/drum.mp3");
  const selectMusic = new Audio("/wow.wav");
  const wheelData = data.filter((member) => !member.isMe && member.isGift);
  const [isWheeled, setIsWheeled] = useState(false);
  const [selectedNum, setSelectedNum] = useState(0);

  const endSpin = () => {
    music.pause();
    selectMusic.play();
    setIsWheeled(false);
    removeMember(wheelData[selectedNum]);
  };

  const onWheelClick = () => {
    music.play();
    setIsWheeled(true);
    setSelectedNum(Math.floor(Math.random() * wheelData.length));
  };

  return (
    <div className={circleRollerStyle.App}>
      <div className={circleRollerStyle.group1}>
        <Wheel
          mustStartSpinning={isWheeled}
          prizeNumber={selectedNum}
          data={wheelData}
          onStopSpinning={() => endSpin()}
          radiusLineWidth={2}
          radiusLineColor="#c2fcfd"
          backgroundColors={["#fff"]}
          innerBorderWidth={70}
          outerBorderWidth={5}
          innerBorderColor="#3EBEC2"
          outerBorderColor="#3EBEC2"
        />
        <button
          className={circleRollerStyle.clickButton}
          onClick={() => onWheelClick()}
        >
          clickHere!
        </button>
      </div>
    </div>
  );
};

export default CircleRoller;
