import * as faker from 'faker';
import Database from '../db';

const fakePlayers = new Array(15).fill(0).map((value: number) => {
    return {
        name: faker.name.findName(),
        nativeOf: faker.address.country(),
        winnings: Math.floor(Math.random() * 1000)
    }
});

Database.connect().then(() => {
    Database
    .Players()
    .insertMany(fakePlayers).then((result) => {
        console.log(`Population successful. ${result.insertedCount} records added`);
    }).catch((error) => {
        console.error(`Population failed with error: ${error}`);
    });
});

