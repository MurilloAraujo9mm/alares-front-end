import { FiPlusCircle } from "react-icons/fi";

const AddPlanButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            <FiPlusCircle size={20} />
            <span>Adicionar Plano</span>
        </button>
    );
};

export default AddPlanButton