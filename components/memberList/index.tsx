import memberType from "../../interface/member";

const MemberList = ({
  data,
  checkIsMe,
  checkIsGift,
}: {
  data: memberType[];
  checkIsMe: (member: memberType) => void;
  checkIsGift: (member: memberType) => void;
}) => {
  return (
    <>
      <table className="border-collapse table-auto w-full text-sm">
        <thead>
          <tr className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
            <th className="border-b dark:border-slate-600 font-medium p-2 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center">
              이름
            </th>
            <th className="border-b dark:border-slate-600 font-medium p-2 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center">
              선물여부
            </th>
            <th className="border-b dark:border-slate-600 font-medium p-2 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center">
              룰렛돌리는자
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800">
          {data.map((item: memberType, index) => {
            return (
              <tr key={index}>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-center">
                  {item.option}
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-center">
                  <input
                    type="checkbox"
                    checked={item.isGift}
                    onClick={() => checkIsGift(item)}
                    disabled={item.selected}
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
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 text-center">
                  <input
                    type="checkbox"
                    checked={item.isMe}
                    onClick={() => checkIsMe(item)}
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default MemberList;
