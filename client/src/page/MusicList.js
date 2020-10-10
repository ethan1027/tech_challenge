import React, { useState, useEffect, setError } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SongTable = styled.table`
	border-spacing: 0px;
	background: #fff;
	box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);
	margin-left: 20px;
	margin-right: 20px;
	width: 100%;
	border-collapse: collapse;
	border-spacing: 0;
`;
const Cell = styled.td`
	border: 1px solid #f4f6f8;
	padding: 6px;
	text-align: left;
	color: #2f3133;
	white-space: nowrap;
`;
const HeaderCell = styled.th`
	border: 3px solid #f4f6f8;
	padding: 6px;
	text-align: left;
	color: #2f3133;
	cursor: pointer;
`;
const ScrollContainer = styled.div`
	overflow-x: auto;
	height: 600px;
	margin: 10px;
	margin-right: 20px;
`;

const Title = styled.h2`
	margin-left: 30px
`;

const MusicList = () => {
	const [songs, setSongs] = useState([])
	const [ascendingOrder, setAscendingOrder] = useState(true);

	useEffect(() => {
    axios.get("http://127.0.0.1:8080/songs")
      .then(res => {
				console.log('call api')
				setSongs(res.data);
			});
	}, []);

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
		setAscendingOrder(!ascendingOrder)
		setSongs([...sortedSongs]);
	}
	return (
		<div>
			<Title>Music List 🎵</Title>
			<ScrollContainer>
				<SongTable>
					<thead>
						<tr>
							{songs.length > 0 && Object.entries(songs[0]).map(([attrName, _]) => {
								return (
									<HeaderCell key={attrName}><div onClick={() => sortByAttr(attrName)}>{attrName}</div></HeaderCell>
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
											<Cell key={key + songIndex + attrIndex}>{attr}</Cell>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</SongTable>
			</ScrollContainer>
		</div>
	);
}

export default MusicList;