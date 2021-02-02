import app from 'firebase/app';
import Firebase from '../components/Firebase';

const firebase = new Firebase();

export const getAllFirebaseUsers = (): Promise<app.firestore.QuerySnapshot> => {
  return firebase
    .users()
    .get()
    .then(doc => {
      return doc;
    })
    .catch(error => {
      alert(error);
      return error;
    });
};

export const getFirebaseUser = (uid: string): Promise<app.firestore.QuerySnapshot> => {
  return firebase
    .user(uid)
    .get()
    .then(doc => {
      return doc;
    })
    .catch(error => {
      alert(error);
      return error;
    });
};

export const getSurveys = (uid: string): Promise<app.firestore.QuerySnapshot> => {
  return firebase
    .surveys(uid)
    .get()
    .then(doc => {
      return doc;
    })
    .catch(error => {
      alert(error);
      return error;
    });
};

export const getSurvey = (uid: string, surveyId: string): Promise<app.firestore.DocumentData> => {
  return firebase
    .surveys(uid)
    .doc(surveyId)
    .get()
    .then(doc => {
      return doc.data();
    })
    .catch(error => {
      alert(error);
      return error;
    });
};

export const addQuestions = questions => {
  return firebase
    .questions()
    .add(questions)
    .then(doc => {
      return doc;
    })
    .catch(err => {
      return err;
    });
};
