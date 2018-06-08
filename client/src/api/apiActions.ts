import IPlayer from "../IPlayer";
import * as apiUrls from "./apiUrls";

const conditionallyHandleError = (okState: boolean, response: any) => {
	if (!okState) {
		if (response && !response.success) {
			throw new Error(response.errorMessage);
		} else {
			throw new Error("An error occured!");
		}
	}
};

export async function addPlayer(newPlayer: IPlayer): Promise<IPlayer> {
	const request = await fetch(apiUrls.CREATE_PLAYER, {
		body: JSON.stringify({ newPlayer }),
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST"
	});

	const raw = await request.text();
	const response = JSON.parse(raw);

	conditionallyHandleError(request.ok, response);

	return {
		_id: response.result.createdId,
		...newPlayer
	};
}

export async function deletePlayer(playerId: string): Promise<void> {
	const request = await fetch(`${apiUrls.DELETE_PLAYER}?playerId=${playerId}`, {
		method: "DELETE"
	});

	const raw = await request.text();
	const response = JSON.parse(raw);

	conditionallyHandleError(request.ok, response);
}

export async function getPlayers(): Promise<IPlayer[]> {
	const request = await fetch(apiUrls.GET_PLAYERS);
	const raw = await request.text();
	const response = JSON.parse(raw);

	conditionallyHandleError(request.ok, response);

	return response.result.players;
}

export async function updatePlayer(
	id: string,
	updatedFields: {
		fieldName: string;
		value: string | number;
	}
): Promise<IPlayer> {
	const request = await fetch(apiUrls.UPDATE_PLAYER, {
		body: JSON.stringify({
			playerId: id,
			updatedFields
		}),
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST"
	});

	const raw = await request.text();
	const response = JSON.parse(raw);
	conditionallyHandleError(request.ok, response);

	return response.result.newPlayer;
}
