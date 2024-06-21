module.exports = async (client, node, error) => {

	client.logger.log(`Node "${node.options.identifier}" terjadi kesalahan: ${error.message}.`, "error");

}