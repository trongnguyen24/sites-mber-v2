import { e as error, r as redirect } from "../../../chunks/index.js";
const actions = {
  login: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    try {
      await locals.pb.collection("users").authWithPassword(body.email, body.password);
      if (!locals.pb?.authStore?.model?.verified) {
        locals.pb.authStore.clear();
        return {
          notVerified: true
        };
      }
    } catch (err) {
      console.log("Error: ", err);
      throw error(500, "Something went wrong logging in");
    }
    throw redirect(303, "/");
  }
};
export {
  actions
};
