public with sharing class fetchRelatedRecords {

    @AuraEnabled
    public static List<Contact> retrieveContact(string searchedName){
    List<Contact> mycontactList = [Select Id, FirstName, LastName, Email, Phone, Account.Name From Contact Where Account.Name=:searchedName];
    return mycontactList;
    }

    @AuraEnabled
    public static List<Contact> retrieveOnlyContactData(string searchContactName){
    List<Contact> myContactListOnly = [SELECT Id, FirstName, LastName, Email, Phone, Name FROM Contact WHERE FirstName = :searchContactName OR LastName = :searchContactName];
    if(mycontactListOnly.size() == 0)
    {
        System.debug('No data found');

    }
    else {
         System.debug('Contact.Name ==> '+mycontactListOnly[0].FirstName);
         System.debug('searchContactName ==> '+searchContactName);
        
    }
   
    return mycontactListOnly;
   
    }

    }
