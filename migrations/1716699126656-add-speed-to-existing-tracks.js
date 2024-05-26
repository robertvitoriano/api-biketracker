
const {Track} = require(`${__filename.split('/migrations/')[0]}/build/src/database/connection.js`);

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
  const alltracks = await Track.find({});
  
  for (const track of alltracks) {
    track.speed = "";
    await track.save();
  }
}

module.exports = { up, down };
