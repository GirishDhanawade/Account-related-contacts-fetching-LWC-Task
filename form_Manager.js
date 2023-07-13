import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import retrieveContact from '@salesforce/apex/fetchRelatedRecords.retrieveContact';
import retrieveOnlyContactData from '@salesforce/apex/fetchRelatedRecords.retrieveOnlyContactData';
export default class DisplayContactsOnAccountName extends LightningElement {
    @track currentAccountName;
    @track searchName;
    @track searchContactName;
    @track contactSize;
    @track showTable = false;
    @track showContactTable = false;
    handleChangeAccName(event) {
        this.currentAccountName = event.target.value;
        console.log('currentAccountName ==> '+this.currentAccountName);
    }
    handleAccountSearch() {
        console.log('Enter into search bar = ');
        let searchedName = this.currentAccountName;
        console.log('searchName ==> '+searchedName);
        this.retrieveContact(searchedName);
    }
    handleContactSearch(){
        let searchContactName = this.currentAccountName;
        console.log('searchContactName ==> '+searchContactName);
        this.retrieveOnlyContactData(searchContactName);
    }

    retrieveContact(searchedName) {
        return new Promise((resolve, reject) => {
            retrieveContact({ searchedName: searchedName })
                .then(result => {
                    console.log('Result', JSON.stringify(result));
                    this.records = result;
                    if (this.records != null && this.records.length > 0) {
                        this.contactSize = this.records.length;
                        this.showTable = true;
                        this.showContactTable = false;
                    } else {
                        this.showErrorToast('This account doesn\'t have any related contacts');
                    }
                    resolve(result);
                })
                .catch(error => {
                    const evt = new ShowToastEvent({
                        title: 'Error',
                        message: error.message,
                        variant: 'error',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(evt);
                    console.log("Error: ", JSON.stringify(error));
                    reject(null);
                });
        });
    }

    retrieveOnlyContactData(searchContactName) {
        return new Promise((resolve, reject) => {
            retrieveOnlyContactData({ searchContactName: searchContactName })
                .then(result => {
                    console.log('Result', JSON.stringify(result));
                    this.Result = result;
                    if (this.Result != null && this.Result.length > 0) {
                        this.contactSize = this.Result.length;
                        this.showContactTable = true;
                        this.showTable = false;
                    } else {
                        this.showErrorToast('There is no any contact with this name');
                        this.showContactTable = false;
                        this.showTable = false;
                    }
                    resolve(result);
                })
                .catch(error => {
                    const evt = new ShowToastEvent({
                        title: 'Error',
                        message: error.message,
                        variant: 'error',
                        mode: 'dismissable'
                    });
                    this.dispatchEvent(evt);
                    console.log("Error: ", JSON.stringify(error));
                    reject(null);
                });
        });
    }


    showErrorToast(message) {
        const event = new ShowToastEvent({
            title: 'Error',
            message: message,
            variant: 'error'
        });
        this.dispatchEvent(event);
    }
    
    // @track records;
    // @track dataNotFound;
    // @wire(retrieveContactData, { keySearch: '$searchName' })
    // wireRecord({ data, error }) {
    //     if (data) {
    //         console.log('My Data --> '+JSON.stringify(data));
    //         this.records = data;
    //        // this.showTable = true;
    //         this.error = undefined;
    //         this.dataNotFound = '';
    //         if (this.records == '') {
    //             this.dataNotFound = 'There is no Contact found related to Account name';
    //         }
    //     } else {
    //         this.error = error;
    //         this.data = undefined;
    //     }
    // }
    
    // @track Result;
    // @wire(retrieveOnlyContactData, { keySearch: '$searchContactName' })
    // wireRecord({ data, error }) {
    //     if (data) {
    //         console.log('My Data --> '+JSON.stringify(data));
    //         this.Result = data;
    //        // this.showTable = true;
    //         this.error = undefined;
    //         this.dataNotFound = '';
    //         if (this.records == '') {
    //             this.dataNotFound = 'There is no Contact found related to Account name';
    //         }
    //     } else {
    //         this.error = error;
    //         this.data = undefined;
    //     }
    // }
}

   
