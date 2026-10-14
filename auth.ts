import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { Resend } from 'resend';

const client = new MongoClient(process.env.MONGO_DB_URL!);
const db = client.db('FabBox-Database');
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: { 
    enabled: true, 
    sendResetPassword: async({ user, url }) => {
      void resend.emails.send({
        from: 'Acme <fab-box-api-key@resend.dev>',
        to: user.email,
        subject: 'Reset your password',
        html: `Click <a href="${url}">here</a> to reset your password.`,
      });
    },
  }, 

  socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    }, 
    google: {
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,   
    }
  }, 

  database: mongodbAdapter(db, {
    client,
  }),

  emailVerification: {
    sendOnSignUp : true,
    sendVerificationEmail: async({ user, url }) => {
      void resend.emails.send({
        from: 'Acme <fab-box-api-key@resend.dev>',
        to: user.email,
        subject: 'Verify your email address',
        html: `Click <a href="${url}">here</a> to verify your email.`,
      });
    },
  },
});