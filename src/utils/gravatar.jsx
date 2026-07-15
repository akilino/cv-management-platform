import crypto from 'crypto-js';

export const GravatarAvatar = ({ email, size = 100 }) => {
  // 1. Clean the email: trim spaces and make it lowercase
  const cleanedEmail = email.trim().toLowerCase();
  
  // 2. Create the SHA-256 hash
  const hash = crypto.SHA256(cleanedEmail).toString();
  
  // 3. Construct the Gravatar image URL
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=mp`; 
  // 'd=mp' provides a clean mystery person placeholder if they don't have a Gravatar account

  return (
    <img 
      src={gravatarUrl} 
      alt="User Profile" 
      className="profile-gravatar-img"
      style={{ borderRadius: '50%', width: size, height: size }}
    />
  );
};