// SPDX-License-Identifier: MIT  

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract GiftCard{

    struct Product{
        address payable owner;
        string name;
        uint amount;
    }
    address internal admin;
    constructor (){
        admin = 0xE2a0411465fd913502A8390Fe22DC7004AC47A04;
    }

    mapping (uint => Product) internal products

    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    mapping(uint => Product) products;
    uint cardLength = 0;

    function addProduct(
        uint _index,
        string memory _name,
        uint memory _amount
    ) public (
        products[_index] = Product(
            payable(msg.sender),
            _name,
            _amount
        );
    )

    function getProduct(unit _index) public view returns(
        address payable,
        string memory,
        uint 
    ) {
        return (
            products[_index].owner,
            products[_index].name,
            products[_index].price,

        );
    }

    function buyProduct(uint _index)public payable{
        require(
                IERC20Token(cUsdTokenAddress).transferFrom(
                    msg.sender,
                    products[_index].owner,
                    productss[_index].price
            ),
            "Transaction could not be performed"
        );
        products[_index].owner = payable(msg.sender);
    }

}