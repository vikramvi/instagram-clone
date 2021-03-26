import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
////import { seedDatabase } from "../seed";


const config = {
    //Fill this data from firebase

};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//console.log("FieldValue", FieldValue);

//to check if DB connection is established
//console.log("firebase", firebase);

//call only ONCE
////seedDatabase(firebase);

export { firebase, FieldValue };