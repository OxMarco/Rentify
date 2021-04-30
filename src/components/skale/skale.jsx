const Filestorage = require('@skalenetwork/filestorage.js');
const Web3 = require('web3');


export default class Skale {
    constructor(props) {
        super(props);
        const web3Provider = new Web3.providers.HttpProvider('----SKALE ENDPOINT----');
        const web3 = new Web3(web3Provider);
        this.state = {
            filestorage: new Filestorage(web3, true),
            reader: new FileReader(),
            privateKey: '0x' + '[YOUR_PRIVATE_KEY]',
            account: "[YOUR_ACCOUNT_ADDRESS]",
        };
    }

    async uploadFile(event, specificDirectory = '') {
        event.preventDefault();
        let file = document.getElementById('files').files[0];
        //file path in account tree (dirA/file.name)
        let filePath;
        if (specificDirectory === '') {
            filePath = file.name;
        } else {
            filePath = specificDirectory + '/' + file.name;
        }
        //file storage method to upload file
        reader.onload = async function (e) {
            const arrayBuffer = reader.result
            const bytes = new Uint8Array(arrayBuffer);
            let link = this.state.filestorage.uploadFile(
                account,
                filePath,
                bytes,
                privateKey
            );
        };
        this.state.reader.readAsArrayBuffer(file);
    }

    async getFile(storagePath, image = true) {
        let file = await this.state.filestorage.downloadToBuffer(storagePath);
        if(image)
            file = 'data:image/png;base64,' + file.toString('base64');
        else
            file = file.toString('base64');

        return file;
    }

    async deleteFile(filePath) {
        await this.state.filestorage.deleteFile(this.state.account, filePath, this.state.privateKey);
    }

    async createDirectory(directoryPath) {
        await this.state.filestorage.createDirectory(this.state.account, directoryPath, this.state.privateKey);
    }

    async deleteDirectory(directoryPath) {
        await this.state.filestorage.deleteDirectory(this.state.account, directoryPath, this.state.privateKey);
    }
}