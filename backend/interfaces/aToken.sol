// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;

interface IaToken {
    /**
     * @dev redeems aToken for the underlying asset
     * @param _amount the amount being redeemed
     */
    function redeem(uint256 _amount) external;

    /**
     * @dev calculates the balance of the user, which is the
     * principal balance + interest generated by the principal balance + interest generated by the redirected balance
     * @param _user the user for which the balance is being calculated
     * @return the total balance of the user
     */
    function balanceOf(address _user) external view returns (uint256);
}
