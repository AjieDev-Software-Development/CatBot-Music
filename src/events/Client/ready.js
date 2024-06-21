const { prefix } = require("../../config.js");
                   
module.exports = async (client) => {
  client.manager.init(client.user.id);
  client.logger.log(`${client.user.username} online!`, "ready");
  client.logger.log(`Menyiapkan ${client.guilds.cache.size} servers, untuk  ${client.users.cache.size} pengguna total`, "ready");
  
  //Status
  let statuses = [
    `/help atau cbm!help`, `Mendukung VC Berkualitas Tinggi`, `Kami sekarang rilis beta!`, `Bergabunglah dengan Server Dukungan di dsc.gg/ajidevserver`, `Digunakan dalam ${client.guilds.cache.size} server`];


    setInterval(function() {
  		let status = statuses[Math.floor(Math.random()*statuses.length)];
  		client.user.setActivity(status, {type: "LISTENING"});
  	}, 10020)

}
