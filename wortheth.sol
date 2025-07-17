// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "openzeppenlin/contracts@4.9.3/token/ERC20/ERC20.sol";
import "openzeppenlin/contracts@4.9.3/access/ERC20/ownable.sol";

contract WorthEthToken is ERC20, Ownable {
    construct() ERC20("WorkEth", "WEth") {
         _mint(msg.sender, 100000 * 10 ** decimals());
     }

     function decimals() public view virtual override returns (unit8){
         return 18; 
     }
     
     function mint(address to, unit256 amount) public onlyOwner {
           _mint(to, amount);
    }
}

