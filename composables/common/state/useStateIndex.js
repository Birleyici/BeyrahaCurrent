import { useNewProductStore } from "~/store/newProduct.js";
import { useProductState } from "~/store/frontend/product";
import { useAttrsAndVarsState } from "~/store/attrsAndVariations";
import { useCategoryState } from "~/store/common/category";

export function useStateIndex() { 

    return {
        useNewProductStore,
        useAttrsAndVarsState,
        useProductState,
        useCategoryState
    }
}