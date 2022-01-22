import memberType from "../../interface/member";

const MemberList = ({ data }: { data: memberType[] }) => {
  return (
    <>
      <div>
        {data.map((item: memberType, index) => {
          return (
            <div key={index}>
              <div>{item.option}</div>
              <input
                type="checkbox"
                className="
                          rounded
                          border-gray-300
                          text-indigo-600
                          shadow-sm
                          focus:border-indigo-300
                          focus:ring
                          focus:ring-offset-0
                          focus:ring-indigo-200
                          focus:ring-opacity-50
                        "
              />
              <input
                type="checkbox"
                className="
                          rounded
                          border-gray-300
                          text-indigo-600
                          shadow-sm
                          focus:border-indigo-300
                          focus:ring
                          focus:ring-offset-0
                          focus:ring-indigo-200
                          focus:ring-opacity-50
                        "
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MemberList;
