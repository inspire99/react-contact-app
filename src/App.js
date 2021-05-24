import React, { useState, useEffect } from "react";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import "./App.css";
import { uuid } from "uuidv4";

function App() {
  const [contacts, setContacts] = useState([]);

  const LOCAL_STORAGE_KEY = "contacts";

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    const retrievedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrievedItems) {
      setContacts(retrievedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Header></Header>

      <AddContact addContactHandler={addContactHandler}></AddContact>
      <ContactList
        contacts={contacts}
        getContactId={removeContactHandler}
      ></ContactList>
    </div>
  );
}

export default App;
// const contacts = [
//   {
//     "id": "1",
//     "name": "Adarsh",
//     "email": "adarsh@gmail.com"
//   },
//   {
//     "id": "2",
//     "name": "Dinesh",
//     "email": "dinesh@gmail.com"
//   }
// ];
