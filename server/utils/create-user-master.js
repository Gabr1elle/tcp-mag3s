import { Admin } from '../models/Admin.model';
const config = useRuntimeConfig();
const roles = config.rolesType;

// Create Roles to users if it doesn't exist
async function createRoles() {
  const rolesData = await Admin.Role.findAll({ raw: true });

  if (!rolesData.length) {
    for (const role of roles) {
      try {
        await Admin.Role.create({ type: role });
      } catch (err) {
        console.log(err);
      }
    }
  }

  return await Admin.Role.findAll({ raw: true });
}

// creating a master user if it doesn't exist
export const createAdmin = async () => {
  const checkUserExists = await Admin.Users.findOne({where: {email: config.adminEmail}});

  if(!checkUserExists) {
    const rolesData = await createRoles();
    const adminMaterRole = rolesData.find((role) => roles[0] === role.type).type;

    const user = {
      name: config.adminName,
      email: config.adminEmail,
      password: await genPassHash(config.adminPass).then((hash) => hash),
      role: adminMaterRole,
    }

    try {
      await Admin.Users.create(user);
    } catch (err) {
      console.log(err);
    }
  }
}
