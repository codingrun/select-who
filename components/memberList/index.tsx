import memberType from "../../interface/member";

const MemberList = ({ data }: { data: memberType[] }) => {
  return (
    <>
      <div>
        {data.map((item: memberType, index) => {
          return <div key={index}>{item.option}</div>;
        })}
      </div>
    </>
  );
};

export default MemberList;
