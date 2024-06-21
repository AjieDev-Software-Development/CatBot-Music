module.exports = async (client, node, reason) => {

	client.logger.log(`Node "${node.options.identifier}" terputus karena ${reason}.`, "warn");

}