import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
import MemberList from "../components/memberList";
import memberType from "../interface/member";
import { useEffect, useState } from "react";

const CircleRoller = dynamic(
  () => import("../components/circleRoller/circleRoller"),
  { ssr: false }
);

const data = [
  {
    option: "이미지",
    isGift: true,
    isMe: false,
    selected: false,
  },

  {
    option: "이수연",
    isGift: true,
    isMe: false,
    selected: false,
  },
  {
    option: "한누리",
    isGift: true,
    isMe: false,
    selected: false,
  },
  {
    option: "이은비",
    isGift: true,
    isMe: false,
    selected: false,
  },
  {
    option: "천성",
    isGift: true,
    isMe: false,
    selected: false,
  },
  {
    option: "김은애",
    isGift: true,
    isMe: false,
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
  const [isCongratulation, setCongratulation] = useState<string>();
  const [timeoutFn, setTimeoutFn] = useState();
  const removeMember = (selectedMember: memberType) => {
    const receiver = members.find((mem) => mem.isMe);
    if (selectedMember && receiver) {
      setGiftMembers([
        ...giftMembers,
        { sender: selectedMember.option, receiver: receiver.option },
      ]);

      setCongratulation(selectedMember.option);

      const setting = setTimeout(() => {
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
        setCongratulation(undefined);
      }, 5000);
      setTimeoutFn(setting);
    }
  };

  useEffect(() => {
    if (!isCongratulation) {
      clearTimeout(timeoutFn);
    }
  }, [isCongratulation, timeoutFn]);
  const checkIsMe = (member: memberType) => {
    const already = giftMembers.find(
      (giftM) => member.option === giftM.receiver
    );
    if (!member.isMe && members.find((mem) => mem.isMe)) {
      alert("한사람만 선택할 수 있습니다!");
      return;
    }
    if (!member.isMe && already) {
      if (!confirm("이미 룰렛을 돌린 이력이 있습니다 선택하시겠습니까?")) {
        return;
      }
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
            <div className={styles.currentGiftList}>
              <table className="border-collapse table-auto w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                    <th className="border-b dark:border-slate-600 font-medium p-2 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center"></th>
                    <th className="border-b dark:border-slate-600 font-medium p-2 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center">
                      룰렛돌리는자
                    </th>
                    <th className="border-b dark:border-slate-600 font-medium p-2 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center">
                      당첨선물
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800">
                  {giftMembers.map((giftMember, index) => {
                    return (
                      <tr key={index}>
                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-center">
                          {index + 1}
                        </td>
                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-center">
                          {giftMember.receiver}
                        </td>
                        {/* <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-center">
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
                        </span> */}
                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-center">
                          {giftMember.sender}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <CircleRoller data={members} removeMember={removeMember} />
          </div>
        </div>
      </main>
      {isCongratulation && (
        <div className={styles.congratulation}>
          <div className={styles.congratulationImage}></div>
          <div className={styles.congratulationTitle}>
            {isCongratulation} 선물 당첨!!
          </div>
        </div>
      )}
      <footer className={styles.footer}>
        Powered by <span className={styles.logo}>soo</span>
      </footer>
    </div>
  );
};

export default Home;
