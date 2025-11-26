
 import React, { useContext, useMemo } from 'react';
import { ProductContext } from '../contextAPI/productContext';

function Pagination() {
    const { state, dispatch } = useContext(ProductContext);
    const { totalCount, page, limit } = state;

    const totalPages = Math.ceil((totalCount || 0) / (limit || 1));

    const pageNumbers = useMemo(() => {
        const pageNum = [];
        if (page <= totalPages) pageNum.push(page);
        if (page + 1 < totalPages) pageNum.push(page + 1);
        if (page + 2 < totalPages) pageNum.push(page + 2);
        if (!pageNum.includes(totalPages) && totalPages > 0) pageNum.push(totalPages);
        return pageNum;
    }, [page, totalPages]);

    const handleButton = (pageAction) => {
        dispatch({ type: 'SET_PAGE', payload: pageAction });
    }

    if (totalPages === 0) return null;

    return (
        <div className='flex justify-center mt-8 '>
            <div className='flex items-center space-x-2 bg-white p-2 rounded-full shadow-md'>
                {/* Previous */}
                <button
                    disabled={page === 1}
                    onClick={() => handleButton(page - 1)}
                    className='px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 transition'
                >
                    &#8592;
                </button>

                {/* Page Numbers */}
                {pageNumbers.map((num, index) => (
                    <React.Fragment key={index}>
                        <button
                            onClick={() => handleButton(num)}
                            className={`px-4 py-2 rounded-full transition
                                ${num === page ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200'}
                            `}
                        >
                            {num}
                        </button>
                        {index < pageNumbers.length - 1 && pageNumbers[index + 1] - num > 1 && (
                            <span className='px-2 text-gray-500 select-none'>...</span>
                        )}
                    </React.Fragment>
                ))}

                {/* Next */}
                <button
                    disabled={page === totalPages}
                    onClick={() => handleButton(page + 1)}
                    className='px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 transition'
                >
                    &#8594;
                </button>
            </div>
        </div>
    );
}

export default Pagination;
