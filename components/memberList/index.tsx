import memberType from "../../interface/member";

const MemberList = ({ data }: { data: memberType[] }) => {
  return (
    <>
      {data.map((item: memberType) => {
        <div>{item.name}</div>;
      })}
    </>
  );
};

export default MemberList;
