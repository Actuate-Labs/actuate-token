// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// import SafeMath, Ownable, ReentrancyGuard 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ActuateToken is ERC20, Ownable, Pausable, ReentrancyGuard  {


    // Token distribution addresses
    address private constant foundationAddress = 0x49B953e39cf8B485635C486B1e33A397b33d5371;
    address private constant healthcareProjectsAddress = 0x9a85fF65498CBdEe424D881fde41E06863c45456;
    address private constant commercializationAddress = 0xfbeedB6481E26e62CFD4640BEf2e38e7f0aFC419;
    address private constant healthConsumersAddress = 0x16E8ee34e17FD7979948a4F27DAEcb0766F0ffA1;
    address private constant publicSaleAddress = 0xd6087cBad7C65CFD1bdB980b6ad912749bAcc38E; // owner
    address private constant healthcareIncentivesAddress = 0xfCE36d464bC8F508063c6dE36745f936b2Dc9B25;
    address private constant educatorIncentivesAddress = 0x7d159171f9c308598c97b94A90330be1d9f8DB49;
    address private constant founderAddress = 0x3401564B69A1D0F9439E6A66122cbcb87DB38d6A;
    address private constant faithOrganizationAddress = 0xc68c4C05E35BF2531A019cc4793AFDcB1cBb5C49;

    // constructor
        constructor() ERC20("Actuate", "ACT") {
        uint256 cap = 33_000_000_000 * 10**uint256(decimals());

        _mint(foundationAddress, cap * 15 / 100);
        _mint(healthcareProjectsAddress, cap * 20 / 100);
        _mint(commercializationAddress, cap * 10 / 100);
        _mint(healthConsumersAddress, cap * 5 / 100);
        _mint(publicSaleAddress, cap * 10 / 100);
        _mint(healthcareIncentivesAddress, cap * 5 / 100);
        _mint(educatorIncentivesAddress, cap * 5 / 100);
        _mint(founderAddress, cap * 5 / 100);
        _mint(faithOrganizationAddress, cap * 10 / 100);
    }
    // Set the public sale address as the owner's address
    function transferOwnership(address newOwner) public override onlyOwner {
        super.transferOwnership(newOwner);
        _mint(newOwner, balanceOf(publicSaleAddress));
        _burn(publicSaleAddress, balanceOf(publicSaleAddress));
    }

    // mint new tokens
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // burn tokens
    function burn(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }

    // airdrop tokens to many addresses
    function airdrop(address[] memory recipients, uint256[] memory amounts) public onlyOwner {
        require(recipients.length == amounts.length, "ActuateToken: recipients and amounts length mismatch");

        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], amounts[i]);
        }
    }

    // withdraw ether from the contract
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    // withdraw tokens from the contract
    function withdrawTokens(address token) public onlyOwner {
        uint256 balance = IERC20(token).balanceOf(address(this));
        IERC20(token).transfer(msg.sender, balance);
    }

    // pause and unpause 
    function pause() external onlyOwner() {
        _pause();
    }

    function unpause() external onlyOwner() {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal whenNotPaused override {
        super._beforeTokenTransfer(from, to, amount);
    }

}