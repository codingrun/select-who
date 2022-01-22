import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
import MemberList from "../components/memberList";
import memberType from "../interface/member";
import { useRef, useState } from "react";

const CircleRoller = dynamic(
  () => import("../components/circleRoller/circleRoller"),
  { ssr: false }
);

const data = [
  {
    option: "이미지",
    isGift: true,
    isMe: false,
    style: { backgroundColor: "yellow" },
    selected: false,
  },
  {
    option: "이수연",
    isGift: true,
    isMe: false,
    style: { backgroundColor: "red" },
    selected: false,
  },
  {
    option: "한누리",
    isGift: true,
    isMe: false,
    style: { backgroundColor: "blue", textColor: "white" },
    selected: false,
  },
  {
    option: "이은비",
    isGift: true,
    isMe: false,
    style: { backgroundColor: "yellow" },
    selected: false,
  },
  {
    option: "천성",
    isGift: true,
    isMe: false,
    style: { backgroundColor: "red" },
    selected: false,
  },
  {
    option: "김은애",
    isGift: true,
    isMe: false,
    style: { backgroundColor: "blue", textColor: "white" },
    selected: false,
  },
];

interface giftMember {
  sender: string;
  receiver: string;
}

const Home: NextPage = () => {
  const [members, setMembers] = useState<memberType[]>(data);
  const [giftMembers, setGiftMembers] = useState<giftMember[]>([]);
  const removeMember = (selectedMember: memberType) => {
    const receiver = members.find((mem) => mem.isMe);
    if (selectedMember && receiver) {
      setGiftMembers([
        ...giftMembers,
        { sender: selectedMember.option, receiver: receiver.option },
      ]);

      setTimeout(() => {
        const convertMembers = members.map((oldMember) => {
          if (oldMember.option === selectedMember.option) {
            return { ...oldMember, selected: true, isGift: false };
          }

          if (oldMember.option === receiver.option) {
            return { ...oldMember, isMe: false };
          }

          return oldMember;
        });
        setMembers(convertMembers);
      }, 5000);
    }
  };
  const checkIsMe = (member: memberType) => {
    if (!member.isMe && members.find((mem) => mem.isMe)) {
      alert("한사람만 선택할 수 있습니다!");
      return;
    }
    const convertMembers = members.map((oldMember) => {
      if (oldMember.option === member.option) {
        return { ...oldMember, isMe: !member.isMe };
      }
      return oldMember;
    });
    setMembers(convertMembers);
  };

  const checkIsGift = (member: memberType) => {
    const convertMembers = members.map((oldMember) => {
      if (oldMember.option === member.option) {
        return { ...oldMember, isGift: !member.isGift };
      }
      return oldMember;
    });
    setMembers(convertMembers);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>동물원 선물추첨</title>
        <meta name="description" content="동물원 선물추첨 룰렛입니당" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Zoo!</h1>
        <div className={styles.content}>
          <div className={styles.giftContainer}>
            <div className={styles.memberList}>
              <MemberList
                data={members}
                checkIsMe={checkIsMe}
                checkIsGift={checkIsGift}
              />
            </div>
            <div style={{ marginLeft: "20px" }}>
              <p className="text-slate-500 dark:text-slate-400">진행현황</p>
              {giftMembers.map((giftMember, index) => {
                return (
                  <div key={index} className="flex">
                    <span>{giftMember.sender}</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                    <span>{giftMember.receiver}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <CircleRoller data={members} removeMember={removeMember} />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        Powered by <span className={styles.logo}>soo</span>
      </footer>
    </div>
  );
};

export default Home;
