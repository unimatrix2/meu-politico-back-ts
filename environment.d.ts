import { Secret } from "jsonwebtoken";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: number;
			FRONT_END_URL: string;
			MONGODB_URI: string;
			COOKIE_SECRET: string;
			TOKEN_SECRET: Secret;
			TOKEN_EXPIRATION: string;
			COOKIE_EXPIRY: number;
		}
	}
}

	// If this file has no import/export statements (i.e. is a script)
	// convert it into a module by adding an empty export statement.
	export {}