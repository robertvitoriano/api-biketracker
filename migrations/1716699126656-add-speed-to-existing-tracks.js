const {Track} = require("/media/robert/storage9/Central/projetos/backend/javascript/node/biketracker-api/build/src/database/connection.js");

async function up() {
  const alltracks = await Track.find({});
  for (const track of alltracks) {
    track.speed = track.distance / (track.time / 3600);
    await track.save();
  }
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  const alltracks = Track.find({});
  for (const track of alltracks) {
    track.speed = "";
    track.save();
  }
}

module.exports = { up, down };
