import { map } from 'lodash';
import React from 'react';

const RenderPagination = ({ currentPage, postCount, pageCount, goTo }) => {
	return (
		<span>
			<ul className="pagination-container text-center">
				<li className={currentPage === 1 ? 'disable-chevron' : ''}>
					<button onClick={() => goTo(currentPage - 1, postCount)}>
						<span className="small-font">&#60;</span>
					</button>
				</li>
				{map(pageCount, page => {
					return (
						<li
							key={page}
							className={currentPage === page + 1 ? 'active-page' : ''}>
							<button onClick={() => goTo(page + 1, postCount)}>
								{page + 1}
							</button>
						</li>
					);
				})}
				<li
					className={
						(currentPage + 1) * 10 <= postCount ? '' : 'disable-chevron'
					}>
					<button onClick={() => goTo(currentPage + 1, postCount)}>
						<span className="small-font">&#62;</span>
					</button>
				</li>
				<hr />
			</ul>
		</span>
	);
};

export default RenderPagination;
