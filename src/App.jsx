import { AiFillPlusCircle } from "react-icons/ai";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from "./config/firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddandUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import NotFoundContacts from "./components/NotFoundContacts";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filteredContacts = contactLists.filter((contact) =>
      contact.name.toLowerCase().includes(value.toLowerCase()));

      setContacts(filteredContacts);
      return filteredContacts;
    });
  }

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex-grow flex items-center">
            <FiSearch className="absolute text-white text-3xl m-1" />
            <input onChange={filterContacts}
             type="text" className="h-10 flex-grow border border-white bg-transparent rounded-md pl-9 text-white" />
          </div>
          <AiFillPlusCircle
            onClick={onOpen}
            className="text-5xl cursor-pointer text-white" />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? (
            <NotFoundContacts/>
          ) : (contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          )))}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;