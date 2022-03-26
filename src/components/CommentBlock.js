import Moment from "moment";
function formateToDigits(number) {
	if (number > 10) {
		return "0" + number;
	}
	return number;
}
function formatDate(data) {
	let date = new Date(data);
	// let day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate()
	// let month = date.getMonth()+1 < 10 ? '0'+date.getMonth()+1 : date.getMonth()+1
	return (
		formateToDigits(date.getHours()) + ":" + formateToDigits(date.getMinutes()) + " " + date.toLocaleDateString()
	);
}
export function CommentBlock({ comment, depth = 0 }) {
	return (
		<div>
			<div className="commentBlock" style={{ marginLeft: depth * 30 + "px" }}>
				<div className="top">
					<img
						className="avatar"
						src={comment.author.avatarUrl}
						alt="avatar"
					></img>
					<span className="name">{comment.author.name}</span>

					{/* <p className="date">{formatDate(comment.created)}</p> */}
					<p className="date">
						{Moment(comment.created).format("HH:mm DD.MM.yyyy")}
					</p>
				</div>
				<div className="content">{comment.text}</div>
			</div>
			{comment.answers &&
				comment.answers.map((answer, i) => (
					<div className="answer">
						<CommentBlock key={i} comment={answer} depth={depth + 1} />
					</div>
				))}
		</div>
	);
}
