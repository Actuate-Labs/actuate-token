const ActuateToken = artifacts.require("ActuateToken")

module.exports = function(deployer) {
  deployer.deploy(ActuateToken);
};
