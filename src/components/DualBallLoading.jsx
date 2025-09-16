import DualBallLoadingSVG from "../assets/dual-ball-loading.svg";


const DualBallLoading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <img
                src={DualBallLoadingSVG}
                alt="Loading animation"
                className="w-16 h-16"
            />
            <p className="text-lg text-gray-600 font-medium">Loading...</p>
        </div>
    );
};

export default DualBallLoading;