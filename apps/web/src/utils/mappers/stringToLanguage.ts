import {Language} from "@cpc/languages";

export default function stringToLanguage(value: string): Language {
    switch (value) {
        case "sk":
            return "sk" as Language;
        case "en":
            return "en" as Language;
        case "uk":
            return "uk" as Language;
        default:
            return "sk" as Language;
    }
}