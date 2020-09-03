const BigNumber = require('bignumber.js')

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, get, log } = deployments
  const { deployer } = await getNamedAccounts()
  const config = require('../deploy-configs/mainnet.json')

  const treeDeployment = await get('TREE')

  const deployResult = await deploy('TREEReserve', {
    from: deployer,
    args: [BigNumber(config.govCut).toFixed(), BigNumber(config.rewardsCut).toFixed(), BigNumber(config.saleLength).toFixed(),
      BigNumber(config.govTimelockLength).toFixed(), treeDeployment.address, config.gov,
      config.reserveToken]
  })
  if (deployResult.newlyDeployed) {
    log(`TREEReserve deployed at ${deployResult.address}`)
  }
}
module.exports.tags = ['TREEReserve', 'stage1']
module.exports.dependencies = ['TREE']
