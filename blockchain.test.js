const Blockchain = require("./blockchain")
const Block  = require("./block")

describe("Blockchain" , ()=>{
    let blockchain, newChain , originalChian;

    beforeEach(()=>{
        blockchain = new Blockchain()
        newChain = new Blockchain()

        originalChian = blockchain.chain
    })

    // first check is there a proper chain 
    // for that
    it('contains a `chain` Array instance',()=>{
        expect(blockchain.chain instanceof Array).toBe(true)
    })

    it('starts with the genesis block',()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis())
    })

    it('adds a new block to the chain',()=>{
        const newData = 'foo-bar';
        blockchain.addBlock({data:newData})
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData)
    })
    

    // test for isValidChain function
    describe('isValidChain()' , ()=>{
        
        // There are 2 possible major case either the chain has 
        // start with genesis block or not
        describe("when the block does not start with a genesis block",()=>{
            it('returns false' , ()=>{
            
                blockchain.chain[0] = {data : 'fake-data'}
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
            } )
        })
        
        // check if altercation happens between chain policy
        // like invalid lastHash reference 
        // invalid chain structure
        describe("when the block does  start with a genesis block has multiple blocks",()=>{
            beforeEach(()=>{
                blockchain.addBlock({data : 'Bears'});
                blockchain.addBlock({data : 'Beets'});
                blockchain.addBlock({data : 'Battlestar Galactica'})
            })

           describe('and a lastHash reference has changed ' ,()=>{
            it('returns false' , ()=>{
            
               blockchain.chain[2].lastHash = 'broken-lastHash';
               expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
            })
           })


           describe("and the chain contains a block with invalid field", ()=>{
            it("returns false" , ()=>{
                blockchain.chain[2].data = "some-bad-data";
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
            })
           })

        //    describe("and the chain does not contain any invalid blocks",()=>{
        //     it('return true',()=>{
                
        //         expect(Blockchain.isValidChain(blockchain.chain)).toBe(true)
        //     })
        //    })

        })
    })

    // chain replacement 
    describe('replacement()',()=>{
        describe("when the new chain is not longer",()=>{
            it('does not replace the chain',()=>{
                newChain.chain[0] = {new : "chain"}
                blockchain.replaceChain(newChain.chain)
                // if chain replacement is not done then the original chain is same as
                // existing blockchain
                expect(blockchain.chain).toEqual(originalChian)
            })
        })

        describe('when the chain is longer ',()=>{
            beforeEach(()=>{
                newChain.addBlock({data : 'Bears'});
                newChain.addBlock({data : 'Beets'});
                newChain.addBlock({data : 'Battlestar Galactica'})
            })
            describe('and the chin is invalid', () => {
               it("does not replace the chain",()=>{
                newChain.chain[2].hash = 'some-fake-hash'
                blockchain.replaceChain(newChain.chain)
                expect(blockchain.chain).toEqual(originalChian)
               })
             })
            //  describe('and the chain is valid', () => { 
            //     it("replaces the chain", ()=>{
            //      blockchain.replaceChain(newChain.chain)
            //      expect(blockchain.chain).toEqual(newChain.chain)
            //     })
            //   })
        })
    })
})
