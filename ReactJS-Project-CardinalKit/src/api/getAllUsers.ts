import app from 'firebase/app';
import Firebase from '../components/Firebase';

export function getAllFirebaseUsers(): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  return firebase
    .users()
    .get()
    .then(function(doc) {
      return doc;
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
      return error;
    });
}

export function getFirebaseUser(uid: String): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  return firebase
    .user(uid)
    .get()
    .then(function(doc) {
      return doc;
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
      return error;
    });
}

export function getSurveys(uid: String): Promise<app.firestore.QuerySnapshot> {
  const firebase = new Firebase();
  return firebase
    .surveys(uid)
    .get()
    .then(function(doc) {
      return doc;
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
      return error;
    });
}

export function getSurvey(uid: String, surveyId: string): Promise<app.firestore.DocumentData> {
  const firebase = new Firebase();
  return firebase
    .surveys(uid)
    .doc(surveyId)
    .get()
    .then(function(doc) {
      return doc.data();
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
      return error;
    });
}

export function getQuestions(questionId): Promise<app.firestore.DocumentData> {
  const firebase = new Firebase();
  return firebase
    .questions(questionId)
    .get()
    .then(doc => {
      return doc.data();
    })
    .catch(err => {
      console.log('Error getting document:', err);
      return err;
    });
}
