import sha256 from 'crypto-js/sha256';
import Validation from './validation';

/**
 * Block class
 */
export default class Block {
  index: number;
  timestamp: number; //instante de criação do bloco, é um number porque é o número de segundos contabilizado desde 1/1/1970 até o momento, assim garantimos que será sempre UTC e não irá variar conforme a região
  hash: string;
  previousHash: string; //bloco que vem antes do bloco que está sendo criado
  data: string;



  /**
   * Creates a new block
   * @param index The block index in blockchain
   * @param previousHash The previous block hash
   * @param data The block data
   */
  constructor (index: number, previousHash: string, data: string){
    this.index = index;
    this.timestamp = Date.now();
    this.previousHash = previousHash;
    this.data = data;
    this.hash = this.getHash();
  }

  getHash(): string {
    return sha256(this.index + this.data + this.timestamp + this.previousHash).toString();
  }

  /**
   * Validate the blocks
   * @returns Returns true if the block is valid
   */
  isValid(previousHash: string, previousIndex: number): Validation{
    if(previousIndex !== this.index - 1) return new Validation(false, "Invalid index");
    if(this.hash !== this.getHash()) return new Validation(false, "Invalid hash");
    if(!this.data) return new Validation(false, "Invalid data");
    if(this.previousHash !== previousHash) return new Validation(false, "Invalid previousHash");
    if(this.timestamp < 1) return new Validation(false, "Invalid timestamp");

    return new Validation();
  }

}