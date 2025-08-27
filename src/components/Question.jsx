import Question1Img from "../../public/question1.svg";

const Question = ({ title, label, onStartFunction, buttonLabel }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-6">
            <img
                src={Question1Img}
                alt="Question illustration"
                className="w-56 h-56 object-contain mb-6 drop-shadow-md"
            />

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600 mb-6 max-w-md">{label}</p>

            <button
                onClick={onStartFunction}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700
                 text-white text-sm font-medium rounded-2xl shadow-md"
            >
                {buttonLabel}
            </button>
        </div>
    );
};

export default Question;
