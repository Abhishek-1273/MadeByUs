import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export function useProducts(category) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let active = true;
        setLoading(true);
        getProducts(category)
            .then((list) => { if (active) { setProducts(list); setError(null); } })
            .catch((e) => { if (active) setError(e.message); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [category]);

    return { products, loading, error };
}