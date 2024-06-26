import { Admin } from "../models/Admin.model";
const config = useRuntimeConfig();
const roles = config.rolesType;

export const checkUserMaster = async (event) => {
	if (event.context.auth) {
		const roleUser = await Admin.Role.findOne({
			where: { type: event.context.auth.role },
		});

		return roleUser.type === roles[0];
	}
};
