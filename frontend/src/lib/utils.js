import { LANGUAGE_TO_FLAG } from "../constants";

export const getLanguageFlag = (language) => {
	if (!language) return null;
	const countryCode = LANGUAGE_TO_FLAG[language.toLowerCase()];
	if (countryCode) {
		return (
			<img
				src={`https://flagcdn.com/24x18/${countryCode}.png`}
				alt={`${language} flag`}
				className="flex items-center h-4 m-1"
			/>
		);
	}
	return null;
};

export const capitalize = (str) => {
	if (!str) return "";
	return str.charAt(0).toUpperCase() + str.slice(1);
};