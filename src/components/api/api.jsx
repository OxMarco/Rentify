import ABI from '../../abi.json';

export default class Api {
    constructor(web3, contractAddress) {
        this.web3 = web3;
        this.contract = new this.web3.eth.Contract(ABI, '0x9108212DF22184C26Eb301B90ce4B30D1A4B942D')
        this.contract.setProvider(this.web3.currentProvider)
    }

    async get(id) {
        const [metadataCID, collateral, rentee] = await this.contract.get(id);

        const res = await fetch(`https://ipfs.io/ipfs/${metadataCID}`);
        const response = await res.json();

        const metadata = {
            latitude: response['latitude'],
            longitude: response['longitude'],
            country: response['country'],
            region: response['region'],
            zip: response['zip'],
            title: response['title'],
            description: response['description'],
            surface: response['surface'],
            price: response['price'],
            deposit: response['deposit'],
            image: `https://ipfs.io/ipfs/${response['image']}`,
            rentee: rentee
        };

        return metadata;
    }

    async create(metadata, collateral) {
        const tokenId = await this.contract.create(metadata, collateral);

        return tokenId;
    }
}
