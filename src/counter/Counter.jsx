import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, decrenentByAmount } from '../utils/counterSlice';

const Counter = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    const handleDecrement = () => {
        dispatch(decrenentByAmount(3));
    };

    return (
        <div className="flex flex-col items-center p-6 rounded-lgw-80 mx-auto">
            <h2 className="text-2xl font-bold mb-4">Count: {count}</h2>
            <div className="flex gap-3">
                <button
                    onClick={() => dispatch(increment())}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Increment
                </button>
                <button
                    onClick={() => dispatch(decrement())}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                    Decrement
                </button>
                <button
                    onClick={handleDecrement}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                    Decrement 3
                </button>
                <button
                    onClick={() => dispatch(incrementByAmount(2))}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                    Increment by 2
                </button>
            </div>
        </div>
    );
};

export default Counter;
