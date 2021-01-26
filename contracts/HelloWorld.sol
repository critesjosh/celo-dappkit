// Learn more about Solidity here: https://solidity.readthedocs.io

// This statement specifies the compatible compiler versions
pragma solidity >=0.5.0;

// Declare a contract called HelloWorld
contract HelloWorld {
  
  // Define a string called name, initialize it to 'Celo'
  string name = 'Celo';

  // Declares a function called getName
  // The 'public' label means the function can be called internally, by transactions or other contracts
  // The 'view' label indicates that the function does not change the state of the contract
  // The function returns a string, from the memory data location  
  function getName() 
    public 
    view 
    returns (string memory) 
  {
    // Return the storage variable 'name'
    return name;
  }

  // Declare a function called setName
  // The function takes 1 parameter, a string, called newName, with the calldata data location in the Ethereum Virtual Machine  
  // The 'external' label means the function can only be called from an external source
  function setName(string calldata newName) 
    external 
  {
    // Set the storage variable, name, to the value passed in as newName
    name = newName;
  }
}
