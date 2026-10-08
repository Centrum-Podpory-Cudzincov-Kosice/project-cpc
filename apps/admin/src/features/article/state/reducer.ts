import {ArticleEditorState} from "@/features/article/types";
import {Action} from "@/features/article/state/actions";

export function articleReducer(
    state: ArticleEditorState,
    action: Action
): ArticleEditorState {
    switch (action.type) {
        case "SET_TITLE":
            return {
                ...state,

                titles: {
                    ...state.titles,
                    [action.lang]: action.value,
                },
            };

        case "SET_DESCRIPTION":
            return {
                ...state,

                descriptions: {
                    ...state.descriptions,
                    [action.lang]: action.value,
                },
            };

        case "SET_DATE":
            return {
                ...state,
                date: action.value,
            };

        case "SET_TYPE":
            return {
                ...state,
                type: action.value,
            };

        case "SET_CURRENT_IMAGE":
            return {
                ...state,
                currentImage: action.index,
            };

        case "SELECT_IMAGE":
            return {
                ...state,
                imageSelected: true,
            };

        case "UNSELECT_IMAGE":
            return {
                ...state,
                imageSelected: false,
            };

        case "ADD_IMAGE":
            return {
                ...state,
                images: [
                    ...state.images,
                    action.value,
                ],
            };

        case "UPDATE_IMAGE":
            return {
                ...state,
                images: state.images.map(
                    (image, index) =>
                        index === state.currentImage
                            ? action.value
                            : image
                ),
            };

        case "REMOVE_IMAGE": {
            if (state.images.length === 0) {
                return state;
            }

            const images = state.images.filter(
                (_, index) =>
                    index !== state.currentImage
            );

            let currentImage = state.currentImage;

            if (images.length === 0) {
                currentImage = 0;
            } else if (
                currentImage >= images.length
            ) {
                currentImage = images.length - 1;
            }

            return {
                ...state,
                images,
                currentImage,
                imageSelected: false,
            };
        }

        case "MOVE_IMAGE": {
            if (
                state.images.length === 0 ||
                state.currentImage === action.to
            ) {
                return state;
            }

            const images = [...state.images];

            const [image] = images.splice(
                state.currentImage,
                1
            );

            images.splice(
                action.to,
                0,
                image
            );

            return {
                ...state,
                images,
                currentImage: action.to,
            };
        }

        case "SET_PUBLISHED":
            return {
                ...state,
                published: action.value,
            };

        case "RESET":
            return action.value;

        default:
            return state;
    }
}