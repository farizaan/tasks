import { TableRow } from "./TableRow"

export function Table({tracks=[]}){
    
    return(
            <table className="table">
                <thead>
                    <tr>
                        <th id="avatar"></th>
                        <th id="title">ПЕСНЯ</th>
                        <th id="artist">АРТИСТ</th>
                        <th id="album">АЛЬБОМ</th>
                        <th id="link"></th>
                    </tr>
                </thead>
                <tbody>
                    { console.log("tracks", tracks)}
                   { tracks && tracks.map((track,i) => (
                        <TableRow key={i} track={track}/>
                    ))}
                </tbody>
            </table>
    )
}