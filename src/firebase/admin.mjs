import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Initialize Firebase Admin SDK
const serviceAccount = {
  type: "service_account",
  project_id: "moviebooking-ca757",
  private_key_id: "d13f813846b4c5783313e549f9d1117187f0b9b3",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCeo7f7uhXbFVuH\nH3LQ9T1FzaWbCYEaWAoc7MgB5QPKjPrsl0nMaUCeQxO267/T3vnCIG2RsRbIke2L\nBS4FiPVxfVBBzCiei4TQrnY8zCbRPct/To4tPzHRWNakr4CzmCHfOHlCXG41rkEK\nnk8KrZ0Rf5U/BuklRhKR5qTMKfVnzTZsNpMkB6WmMTmFHPyE1Aka00ZEprbizxbJ\nPYeKj40lV3Nsd6p4THTanZgT3VbHCzgyHEnNm5vUftTYWGXap0Y9bTP/Oo4RpEO+\nmcM3KRSBqKZK6lWMd+cQKyjEllGCrQ7igy/U4dmkZJpDytluHlxzm9QnzpwBEgmm\n6xrU09UpAgMBAAECggEAGpfDPbVh+InKAAqrio+xp8PjYOvk8m+TsmmW1Yp4ajnb\nzlFGE7gJFv6TjXRTgca9A2fANk4DTbf4o/dIUbE1w8KH85+vp3Qn3XuBYouubiD3\nve2DM96GEVvdD1pELtbvxqWG3jL0XpdJW+hRw656x/YlJJ2Z85+deUu6kGbwNmgS\nbQvrV97C5sxnukfU+HVWHSNaoHnxZzBvGbVGjS537RJfnzCtPkVkpv73GVMrBPfv\n1ZUHu1r8aEuIkPHxbsa8nj5DqbpzYONdC0kW6t7l2u7jlLfBeBjCWPMpSdGxClWR\nb0I2778FLBdA1jj7cVfDvhzwlPcgSjwQOa6mjwN/IQKBgQDVUhFb8qy4DRRoRMjv\nzDs+hApKEmv2wpxZPI0wgdZArpOyb593uBVa3Jor03+hYugpv2N4PP7obRpbRPrE\na63JylkUMVKR9S+DB8vKa/TpOi1yorB8vzrA6nOY28OyAWUFhLu4FVzlVgMaDnl7\nGWukIvzzHwVkUylnUh4PEhEwhQKBgQC+YPoA/xDyyA9KLLfNJTm0TQWrhv2Dvwfz\nVAI38COr69QwbgphqOXk/lk4U7NoHgVlqChQLlo/d8x6B9G22txTXi3aLU2yfbPz\nT84PcdH0tX9uS4tmn5uDaQaZKTUsEHvR4yuR/M4+Ak/c0vxqcMXNefFyTbikv9fk\nbDkGCUWlVQKBgER32eCETJGqiRFKeqAVEjLnmJHbxdFm913hBIQ8ODN8lSVhlHKN\noDUQt183vDBlmZTEvD18fmjFk/8VbdObqCUrkFnd1t3IL57D4tIuwmYVaT7xHup7\nSnVfCwlWCELbFbymtMXJ/Y4ShF5ZpP4w047UOBIks8tWseRaxBEcQG4tAoGAQVNV\ndfIQBr7PQEyH5UTYwB2NzIXNh9+NAtnYyQkFtIB/lv6rYUdrW2BLjSBrd1aV04QY\nEStWnGCnMVhthakj4Rd39F2HQ7AOh3bi5jnQKX/98gLKGrS50CXBtdyF+lDNq/+f\ne8CbpHt2m/dp1bxMo20shGRW73FEy4S3LHMSCuECgYBZ68oODhrlrm8+PE4UNmXO\nC5qObXCp9zxFc+/shOw1iCHRe4Fh0512j1hhUB/UM33wpsuU1eP16SHLMymx/EGi\nFdPRbQblcnW7OAb4FlkcaB5MKRFJDfJqzuxoJ3EyIrTFv0ANMplFAl+fwFOG5gMF\nfIzwhmHHjRChECN/kgzGLg==\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-7x7fg@moviebooking-ca757.iam.gserviceaccount.com",
  client_id: "116236825995771637324",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7x7fg%40moviebooking-ca757.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

initializeApp({
  credential: cert(serviceAccount),
});

const auth = getAuth();

// User id's can be found on firebase
const makeAdmin = "kEwCflY2WTQlPoUiGRlNSDpzpEG3"; //Patrick is admin!

async function makeUserAdmin(uid) {
  try {
    await auth.setCustomUserClaims(uid, { admin: true });
    console.log(`${uid} is now an Admin`);
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

// Run the function
makeUserAdmin(makeAdmin);
