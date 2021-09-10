import Profile from "../services/profiles";
const buildUserDto = async (user) => {
  const profile = await Profile.customFindOne({ user: user._id });
  const dto = {
    _id: profile._id,
    displayName: `${profile.name} ${profile.lastname}`,
    email: user.email,
    imageUrl: profile.imageUrl || null,
    documentType: profile.documentType,
    documentNumber: profile.documentNumber,
    userType: profile.userType,
    address: profile.address || null,
    phone: profile.phone || null,
    experience: profile.experience || null,
  };
  return dto;
};

export { buildUserDto };
