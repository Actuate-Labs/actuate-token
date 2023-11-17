const { expect } = require("chai");

// Import the contract artifacts
const ActuateToken = artifacts.require("ActuateToken");

contract("ActuateToken", (accounts) => {
  let actuateToken;

  // Deploy a new instance of the contract before each test
  beforeEach(async () => {
    actuateToken = await ActuateToken.new();
  });

  it("should have correct initial supply", async () => {
    const totalSupply = await actuateToken.totalSupply();
    const expectedSupply = 33_000_000_000 * 10 ** 18; // 33 billion tokens with 18 decimal places
    expect(totalSupply.toString()).to.equal(expectedSupply.toString());
  });

  it("should allocate correct balances to distribution addresses", async () => {
    const foundationBalance = await actuateToken.balanceOf(accounts[0]);
    const healthcareProjectsBalance = await actuateToken.balanceOf(accounts[1]);
    const commercializationBalance = await actuateToken.balanceOf(accounts[2]);
    const healthConsumersBalance = await actuateToken.balanceOf(accounts[3]);
    const publicSaleBalance = await actuateToken.balanceOf(accounts[4]);
    const healthcareIncentivesBalance = await actuateToken.balanceOf(accounts[5]);
    const educatorIncentivesBalance = await actuateToken.balanceOf(accounts[6]);
    const founderBalance = await actuateToken.balanceOf(accounts[7]);
    const faithOrganizationBalance = await actuateToken.balanceOf(accounts[8]);

    // Calculate expected balances based on token distribution percentages
    const cap = 33_000_000_000 * 10 ** 18;
    const expectedFoundationBalance = cap * 15 / 100;
    const expectedHealthcareProjectsBalance = cap * 20 / 100;
    const expectedCommercializationBalance = cap * 10 / 100;
    const expectedHealthConsumersBalance = cap * 5 / 100;
    const expectedPublicSaleBalance = cap * 10 / 100;
    const expectedHealthcareIncentivesBalance = cap * 5 / 100;
    const expectedEducatorIncentivesBalance = cap * 5 / 100;
    const expectedFounderBalance = cap * 5 / 100;
    const expectedFaithOrganizationBalance = cap * 10 / 100;

    expect(foundationBalance.toString()).to.equal(expectedFoundationBalance.toString());
    expect(healthcareProjectsBalance.toString()).to.equal(expectedHealthcareProjectsBalance.toString());
    expect(commercializationBalance.toString()).to.equal(expectedCommercializationBalance.toString());
    expect(healthConsumersBalance.toString()).to.equal(expectedHealthConsumersBalance.toString());
    expect(publicSaleBalance.toString()).to.equal(expectedPublicSaleBalance.toString());
    expect(healthcareIncentivesBalance.toString()).to.equal(expectedHealthcareIncentivesBalance.toString());
    expect(educatorIncentivesBalance.toString()).to.equal(expectedEducatorIncentivesBalance.toString());
    expect(founderBalance.toString()).to.equal(expectedFounderBalance.toString());
    expect(faithOrganizationBalance.toString()).to.equal(expectedFaithOrganizationBalance.toString());
  });

  it("should allow transfer of tokens", async () => {
    const sender = accounts[0];
    const recipient = accounts[1];
    const transferAmount = 100;

    const senderBalanceBefore = await actuateToken.balanceOf(sender);
    const recipientBalanceBefore = await actuateToken.balanceOf(recipient);

    // Transfer tokens from sender to recipient
    await actuateToken.transfer(recipient, transferAmount, { from: sender });

    const senderBalanceAfter = await actuateToken.balanceOf(sender);
    const recipientBalanceAfter = await actuateToken.balanceOf(recipient);

    // Check updated balances
    expect(senderBalanceAfter.toNumber()).to.equal(senderBalanceBefore.toNumber() - transferAmount);
    expect(recipientBalanceAfter.toNumber()).to.equal(recipientBalanceBefore.toNumber() + transferAmount);
  });

  it("should not allow transfer of more tokens than the sender's balance", async () => {
    const sender = accounts[0];
    const recipient = accounts[1];
    const transferAmount = 100;

    const senderBalance = await actuateToken.balanceOf(sender);

    // Attempt to transfer more tokens than the sender's balance
    try {
      await actuateToken.transfer(recipient, senderBalance + transferAmount, { from: sender });
      expect.fail("Transfer should have thrown an error");
    } catch (error) {
      const expectedError = "Insufficient balance";
      expect(error.message).to.include(expectedError);
    }

    const recipientBalance = await actuateToken.balanceOf(recipient);

    // Verify that no tokens were transferred
    expect(senderBalance.toNumber()).to.equal(senderBalance.toNumber());
    expect(recipientBalance.toNumber()).to.equal(recipientBalance.toNumber());
  });
});
