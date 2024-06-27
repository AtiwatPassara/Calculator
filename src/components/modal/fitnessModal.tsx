import { useEffect, useState } from 'react';

interface FitnessTableProps {
  showTableModal: boolean;
  handleCloseTableModal: () => void;
}

const FitnessTable: React.FC<FitnessTableProps> = ({
  handleCloseTableModal,
  showTableModal,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showTableModal) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 300); // Duration matches the transition duration
    }
  }, [showTableModal]);

  if (!visible && !showTableModal) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ${
        showTableModal ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-black  p-5 rounded-lg shadow-lg w-[800px] max-h-[90vh] transform transition-transform duration-300 overflow-y-auto ${
          showTableModal ? 'scale-100' : 'scale-95'
        }`}
      >
        <div className="text-lg font-bold mb-4">Fitness Information</div>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Fitness Level</th>
              <th className="px-4 py-2">Participation in Physical Activity</th>
              <th className="px-4 py-2">Activity Content</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 text-center">0</td>
              <td className="px-4 py-2">Do not engage in any physical activity</td>
              <td className="px-4 py-2">Avoid any activities that make you feel physically tired.</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-center">1</td>
              <td className="px-4 py-2">Do not regularly participate in physical activity</td>
              <td className="px-4 py-2">Walk for pleasure or for daily necessities (such as in the metro or RER, for example). Use the stairs routinely.</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-center">2</td>
              <td className="px-4 py-2">Participate regularly in a low-intensity physical activity that does not cause shortness of breath</td>
              <td className="px-4 py-2">10 to 60 minutes of weekly activity</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-center">3</td>
              <td className="px-4 py-2">Regularly participate in light-intensity physical activity that does not cause shortness of breath</td>
              <td className="px-4 py-2">More than 60 minutes 3 of weekly activity</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-center">4</td>
              <td className="px-4 py-2">Participates fairly regularly in fairly intense physical activity which causes shortness of breath</td>
              <td className="px-4 py-2">Runs on average over 1 month 2 km per week or participates in another activity (cycling, rollerblading, swimming, dancing, gym) 30 min to 1 hour per week</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-center">5</td>
              <td className="px-4 py-2">Participate regularly in a fairly intense physical activity that causes shortness of breath</td>
              <td className="px-4 py-2">Runs on average over 1 month 2 to 8 km per week or participates in another activity (cycling, rollerblading, swimming, dancing, gym) 1 to 2 hours per week.</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-center">6</td>
              <td className="px-4 py-2">Follows diligent training including fairly intense sessions which cause shortness of breath</td>
              <td className="px-4 py-2">Runs on average over 1 month less than 10 to 30 km per week or participates in another activity (cycling, rollerblading, swimming, dancing. gym) for 2 to 4 hours per week</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-center">7</td>
              <td className="px-4 py-2">Follows very diligent training including fairly intense sessions which cause shortness of breath</td>
              <td className="px-4 py-2">Runs on average more than 30 km per week or participates in another activity (cycling, rollerblading, swimming, dancing, gym) more than 4 hours per week</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end">
          <button
            onClick={handleCloseTableModal}
            className="mt-4 bg-black border-white border text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FitnessTable;
