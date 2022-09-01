import useAdminTable from "../hooks/useAdminTable";
import useUpdateCase from "../hooks/useUpdateCase";

const AdminTable = () => {
  const { data, pending } = useAdminTable("cases");
  const { actionPending, actionError, updateDocument } = useUpdateCase();

  const handleDocUpdate = (e) => {
    // updateDocument(e.target.id);
    if(e.target.innerText === "Approve") {
      updateDocument(e.target.id, true)
    }
    if(e.target.innerText === "Disapprove") {
      updateDocument(e.target.id, false)
    }
  };
  return (
    <div className="bg-gray-900 text-gray-50 py-12 sm:py-16 md:py-24 lg:pt-24 lg:pb-36">
      <div className="text-left mx-auto w-full max-w-screen-xl pb-12 px-4 md:px-8">
        <h1 className="text-2xl text-left font-bold mt-5 mb-4">
          Cases Information
        </h1>
        <table className="table-auto w-full shadow-lg shadow-gray-800">
          <thead className="w-full">
            <tr>
              <th className="py-5 px-2 bg-gray-800 border border-gray-700">
                Name
              </th>
              <th className="py-5 px-2 bg-gray-800 border border-gray-700">
                Case Type
              </th>
              <th className="py-5 px-2 bg-gray-800 border border-gray-700">
                Status
              </th>
              <th className="py-5 px-2 bg-gray-800 border border-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {/* Pending State */}
            {pending && (
              <tr className="text-2xl text-left font-bold mt-5 mb-4">
                <td>Loading...</td>
              </tr>
            )}
            {/* Action Error */}
            {actionError && (
              <tr className="text-2xl text-left font-bold mt-5 mb-4">
                <td>{actionError}</td>
              </tr>
            )}
            {data &&
              data.map((item) => (
                <tr key={item.id}>
                  <td className="py-4 px-2 border border-gray-700">
                    {item.name}
                  </td>
                  <td className="py-4 px-2 border border-gray-700">
                    {item.caseType}
                  </td>
                  <td className="py-4 px-2 border border-gray-700">
                    {item.approved ? "approved" : "disapproved"}
                  </td>
                  <td
                    id={item.id}
                    className={`py-4 px-2 border border-gray-700 underline cursor-pointer ${
                      actionPending ? "pointer-events-none" : ""
                    }`}
                    onClick={handleDocUpdate}
                  >
                    {item.approved ? "Disapprove" : "Approve"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminTable;
