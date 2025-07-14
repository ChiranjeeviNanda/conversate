import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";

const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
	className = "",
	showInfo = false,
	totalItems = 0,
	itemsPerPage = 4,
}) => {
	const handlePrevPage = () => {
		onPageChange(Math.max(0, currentPage - 1));
	};

	const handleNextPage = () => {
		onPageChange(Math.min(totalPages - 1, currentPage + 1));
	};

	const handleFirstPage = () => {
		onPageChange(0);
	};

	const handleLastPage = () => {
		onPageChange(totalPages - 1);
	};

	// Calculate visible page numbers (current page ± 2)
	const getVisiblePages = () => {
		const pages = [];
		const start = Math.max(0, currentPage - 2);
		const end = Math.min(totalPages - 1, currentPage + 2);
		
		for (let i = start; i <= end; i++) {
			pages.push(i);
		}
		
		return pages;
	};

	// Calculate items range for display
	const startIndex = currentPage * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

	if (totalPages <= 1) return null;

	return (
		<div className={`space-y-4 ${className}`}>
			{/* Pagination Info */}
			{showInfo && totalItems > 0 && (
				<div className="flex items-center justify-center text-sm text-base-content/70">
					<span>
						Showing {startIndex + 1}-{endIndex} of {totalItems}
					</span>
				</div>
			)}

			{/* Pagination Controls */}
			<div className="flex items-center justify-center gap-2">
				{/* Go to Start */}
				<button
					onClick={handleFirstPage}
					disabled={currentPage === 0}
					className="btn btn-soft flex items-center  rounded-full cursor-pointer"
					aria-label="Go to first page"
				>
					<ChevronsLeftIcon className="size-4" />
				</button>

				{/* Previous */}
				<button
					onClick={handlePrevPage}
					disabled={currentPage === 0}
					className="btn btn-soft flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer"
					aria-label="Go to previous page"
				>
					<ChevronLeftIcon className="size-4" />
					<span className="hidden sm:inline">Prev</span>
				</button>

				{/* Page Numbers */}
				<div className="flex items-center gap-1">
					{getVisiblePages().map((pageNum) => (
						<button
							key={pageNum}
							onClick={() => onPageChange(pageNum)}
							className={`btn btn-circle ${
								currentPage === pageNum
									? "btn-primary"
									: "btn-soft"
							}`}
							aria-label={`Go to page ${pageNum + 1}`}
							aria-current={currentPage === pageNum ? "page" : undefined}
						>
							{pageNum + 1}
						</button>
					))}
				</div>

				{/* Next */}
				<button
					onClick={handleNextPage}
					disabled={currentPage === totalPages - 1}
					className="btn btn-soft flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer"
					aria-label="Go to next page"
				>
					<span className="hidden sm:inline">Next</span>
					<ChevronRightIcon className="size-4" />
				</button>

				{/* Go to End */}
				<button
					onClick={handleLastPage}
					disabled={currentPage === totalPages - 1}
					className="btn btn-soft flex items-center rounded-full cursor-pointer"
					aria-label="Go to last page"
				>
					<ChevronsRightIcon className="size-4" />
				</button>
			</div>
		</div>
	);
};

export default Pagination;