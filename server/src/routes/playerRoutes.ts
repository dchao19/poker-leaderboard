import { Router } from "express";
import DB from "../db";
import { ObjectID } from "mongodb";
import IPlayer from "../IPlayer";

const router = Router();

router.get("/", async (req, res) => {
	try {
		const players: IPlayer[] = await DB.Players()
			.find({})
			.toArray();

		res.send({
			success: true,
			result: {
				players
			}
		});
	} catch (e) {
		res.status(500).send({
			success: false,
			errorMessage: "An internal server error occured!",
			errorCode: 0
		});
	}
});

router.delete("/delete", async (req, res) => {
	try {
		if (typeof req.query.playerId === "undefined") {
			return res.status(400).send({
				success: false,
				errorMessage: "The request was missing a required parameter!",
				errorCode: 100
			});
		}

		console.log(req.query);

		const playerId = new ObjectID(req.query.playerId);
		const result = await DB.Players().findOneAndDelete({ _id: playerId });

		if (!result.value) {
			return res.status(404).send({
				success: false,
				errorMessage: "The player with the provided ID could not be found.",
				errorCode: 200
			});
		}

		res.send({
			success: true
		});
	} catch (e) {
		res.status(500).send({
			success: false,
			errorMessage: "An internal server error occured!",
			errorCode: 0
		});
		console.error(e);
	}
});

router.post("/create", async (req, res) => {
	try {
		const toAdd: IPlayer = {
			winnings: 0,
			name: "",
			nativeOf: "",
			...req.body.newPlayer
		};

		const newPlayer = await DB.Players().insertOne(toAdd);
		res.send({
			success: true,
			result: {
				createdId: newPlayer.insertedId
			}
		});
	} catch (e) {
		res.status(500).send({
			success: false,
			errorMessage: "An internal server error occurred!",
			errorCode: 0
		});
	}
});

router.post("/update", async (req, res) => {
	try {
		if (
			typeof req.body.playerId === "undefined" ||
			typeof req.body.updatedFields === "undefined" ||
			typeof req.body.updatedFields.fieldName === "undefined" ||
			typeof req.body.updatedFields.value === "undefined" ||
			!req.body.updatedFields.fieldName
		) {
			return res.status(400).send({
				success: false,
				errorMessage: "The request was missing a required parameter!",
				errorCode: 100
			});
		}

		const playerId = new ObjectID(req.body.playerId);
		const changedPlayer = await DB.Players().findOneAndUpdate(
			{
				_id: playerId
			},
			{
				$set: {
					[req.body.updatedFields.fieldName]: req.body.updatedFields.value
				}
			}
		);

		if (!changedPlayer.value) {
			return res.status(404).send({
				success: false,
				errorMessage: "The player with the provided ID could not be found.",
				errorCode: 201
			});
		}

		const newPlayer = {
			...changedPlayer.value,
			[req.body.updatedFields.fieldName]: req.body.updatedFields.value
		};

		res.send({
			success: true,
			result: {
				newPlayer
			}
		});
	} catch (e) {
		res.status(500).send({
			success: false,
			errorMessage: "An internal server error occurred!",
			errorCode: 0
		});
	}
});

export default router;
