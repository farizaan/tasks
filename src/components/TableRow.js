export function TableRow({track}) {
	return (
		<tr>
			<td>
				<img
					className="avatar"
					src={track.image[0]['#text']}
					alt="avatar"
				></img>
			</td>
			<td className="track_title">{track.name}</td>
			<td className="grey_text">{track.artist.name}</td>
			<td className="grey_text"></td>
			<td className="url"><a href={track.url} target="_blank">Shazam</a></td>
		</tr>
	);
}
