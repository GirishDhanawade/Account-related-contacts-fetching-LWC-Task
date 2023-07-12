import { LightningElement, track, wire } from 'lwc';
import retrieveContactData from '@salesforce/apex/fetchRelatedRecords.retrieveContact';
export default class DisplayContactsOnAccountName extends LightningElement {
    @track currentAccountName;
    @track searchName;
    @track showTable = false;
    handleChangeAccName(event) {
        this.currentAccountName = event.target.value;
    }
    handleAccountSearch() {
        console.log('Enter into search bar = ');
        this.searchName = this.currentAccountName;
        this.showTable = true;
    }
    @track records;
    @track dataNotFound;
    @wire(retrieveContactData, { keySearch: '$searchName' })
    wireRecord({ data, error }) {
        if (data) {
            console.log('My Data --> '+JSON.stringify(data));
            this.records = data;
           // this.showTable = true;
            this.error = undefined;
            this.dataNotFound = '';
            if (this.records == '') {
                this.dataNotFound = 'There is no Contact found related to Account name';
            }
        } else {
            this.error = error;
            this.data = undefined;
        }
    }
}

   