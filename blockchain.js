const Block = require("./block")
const { GENESIS_DATA } = require("./config")

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
}

module.exports = Blockchain