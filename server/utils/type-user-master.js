import { Users } from "../models/Users.model";
const config = useRuntimeConfig();
const roles = config.rolesType;

export const checkUserMaster = async (event) => {
	if (event.context.auth) {
		const roleUser = await Users.Role.findOne({
			where: { type: event.context.auth.role },
		});

		return roleUser.type === roles[0];
	}
};
