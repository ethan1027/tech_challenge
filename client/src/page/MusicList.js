import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import './MusicList.css';

const buttonMsg1 = 'show full view';
const buttonMsg2 = 'show compact view (GraphQL)';

const MusicList = () => {
	const [songs, setSongs] = useState([]);
	const [ascendingOrder, setAscendingOrder] = useState(true);
	const [isGql, setIsGql] = useState(false);
	const [buttonMsg, setButtonMsg] = useState(buttonMsg2);
	const [loading, setLoading] = useState(0);
	
	useEffect(() => {
		loadTable(0);
		loadTable();
		setIsGql(i => !i);
	}, []);
	
	const toggleGql = () => {
		setIsGql(i => !i);
		loadTable();
		if (isGql) {
			setButtonMsg(buttonMsg1);
		} else {
			setButtonMsg(buttonMsg2);
		}
	}

	const loadTable = (errorSignal = -1) => {
		setLoading(0);
		const url = isGql ? "http://localhost:8080/songs/compact" : "http://localhost:8080/songs"
		axios.get(url)
      .then(res => {
				console.log('call api')
				setSongs(res.data);
				setLoading(1)
			}, () => setLoading(errorSignal))
	}
	
	const sortByAttr = (attrName) => {
		const sortedSongs = songs.sort((song1, song2) => {
			const attr1 = song1[attrName];
			const attr2 = song2[attrName];
			if (ascendingOrder) {
				if (attr1 > attr2) return 1;
				else if (attr1 < attr2) return -1;
				return 0;
			} else {
				if (attr1 > attr2) return -1;
				else if (attr1 < attr2) return 1;
				return 0;
			}
		});
		setAscendingOrder(a => !a)
		setSongs([...sortedSongs]);
	}
	return (
		<Container>
			<h2>Music List 🎵</h2>
			{ loading === -1 ? <div> Something went wrong. Please try again 🌼 </div> : null }
			{ loading === 0 ? <div>Loading... <span className="Loading-logo">⌛</span></div> :
				<div>
					<button onClick={toggleGql}>{buttonMsg}</button>
					<ScrollContainer>
						<table>
							<thead>
								<tr>
									{songs.length > 0 && Object.entries(songs[0]).map(([attrName, _]) => {
										return (
											<th key={attrName}><div onClick={() => sortByAttr(attrName)}>{attrName}</div></th>
										)
									})}
								</tr>
							</thead>
							<tbody>
								{songs.map((song, songIndex) => {
									return (
										<tr key={songIndex}>
											{Object.entries(song).map(([key, attr], attrIndex) => {
												return (
													<td key={key + songIndex + attrIndex}>{attr}</td>
												)
											})}
										</tr>
									)
								})}
							</tbody>
						</table>
					</ScrollContainer>
				</div>
			}
		</Container>
	);
}

// try styled-components
const ScrollContainer = styled.div`
	overflow-x: auto;
	height: 600px;
	margin-right: 20px;
	margin-top: 20px;
`;

const Container = styled.div`
	margin: 30px
`;

export default MusicList;