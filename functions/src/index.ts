import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {cronSchedule, logger} from "./config";
import {performBackup} from "./usecases/perform_backup";
import {GoogleCloudStorageService} from "./services/GoogleCloudStorageService";
import {FirebaseAuthService} from "./services/FirebaseAuthService";

exports.backupAuthUsers = functions.pubsub.schedule(cronSchedule).onRun(async () => {
  admin.initializeApp({credential: admin.credential.applicationDefault()});

  const googleCloudStorageService = new GoogleCloudStorageService();
  const firebaseAuthService = new FirebaseAuthService(admin.auth());

  const curr_datetime = new Date().toISOString().split('T')[0];

  return performBackup(
    {
      storageService: googleCloudStorageService,
      authService: firebaseAuthService,
      bucketName: process.env.BUCKET_NAME,
      folderName: curr_datetime,
      loggerInstance: logger,
    }
  );
});
