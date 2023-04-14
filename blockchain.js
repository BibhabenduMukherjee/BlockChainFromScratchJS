const Block = require("./block")
const { GENESIS_DATA } = require("./config")
const cryptoHash = require("./crypto-hash")

class Blockchain{
    constructor(){
        this.chain =[]
        this.chain.push(GENESIS_DATA)
    }


    // comes with data and the 
    // find the last block in the chain
    addBlock({data}){
        const newBlock=Block.mineBlock({
            lastBlock : this.chain[this.chain.length-1],
            data
        })
        this.chain.push(newBlock)
    }

    static isValidChain(chain){
      // return false if first block is not a genesis block
       if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false

       // check one by one hash field
       for(let i = 1 ; i < chain.length ; i++){
        const block = chain[i];

        const actualLastHash = chain[i-1].hash;
        const {timestamp,lastHash,hash,data} = block;
        if(lastHash !== actualLastHash) return false

        const validHash = cryptoHash(timestamp,lastHash,data)
        if(hash !== validHash) return false
       }
       return true
    }
}

module.exports = Blockchain