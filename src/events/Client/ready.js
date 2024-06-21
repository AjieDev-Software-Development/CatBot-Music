const { prefix } = require("../../config.js");
                   
module.exports = async (client) => {
  client.manager.init(client.user.id);
  client.logger.log(`${client.user.username} online!`, "ready");
  client.logger.log(`Menyiapkan ${client.guilds.cache.size} servers, untuk  ${client.users.cache.size} pengguna total`, "ready");
  
  //Status
  let statuses = [
    `/help or cbm!help`, `Support High Quality VC`, `We are now beta release!`, `Join Support Server at dsc.gg/ajidevserver`, `Used in ${client.guilds.cache.size} servers`];


    setInterval(function() {
  		let status = statuses[Math.floor(Math.random()*statuses.length)];
  		client.user.setActivity(status, {type: "LISTENING"});
  	}, 10020)

}
